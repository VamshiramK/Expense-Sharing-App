const express = require('express');
const Expense = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose');
const router = express.Router();
const PDFDocument = require('pdfkit');

// Add Expense
router.post('/add', async (req, res) => {
    const { amount, splitMethod, participants } = req.body;

    try {
        // Validate participants
        const userIds = participants.map(participant => participant.userId);
        const users = await User.find({ _id: { $in: userIds } });

        if (users.length !== participants.length) {
            return res.status(400).json({ message: 'Invalid user IDs provided' });
        }

        let totalOwed = 0;
        const participantsDetails = [];

        // Calculate amounts based on split method
        if (splitMethod === 'equal') {
            const splitAmount = amount / participants.length;
            participants.forEach(participant => {
                participantsDetails.push({ userId: participant.userId, amountOwed: splitAmount });
            });
        } else if (splitMethod === 'exact') {
            participants.forEach(participant => {
                participantsDetails.push({ userId: participant.userId, amountOwed: participant.amountOwed });
                totalOwed += participant.amountOwed;
            });
            if (totalOwed !== amount) {
                return res.status(400).json({ message: 'Total amounts do not match the expense amount' });
            }
        } else if (splitMethod === 'percentage') {
            participants.forEach(participant => {
                const owed = (participant.percentage / 100) * amount;
                participantsDetails.push({ userId: participant.userId, amountOwed: owed });
                totalOwed += owed;
            });
            if (totalOwed !== amount) {
                return res.status(400).json({ message: 'Percentages do not add up to 100' });
            }
        }

        const expense = new Expense({ amount, splitMethod, participants: participantsDetails });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
});

// Retrieve Individual User Expenses
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Ensure userId is valid before proceeding
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const expenses = await Expense.find({ 'participants.userId': userId });
        if (!expenses.length) {
            return res.status(404).json({ message: 'No expenses found for this user.' });
        }
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
});

// Retrieve Overall Expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
});

// Download Balance Sheet
router.get('/balance-sheet', async (req, res) => {
    try {
        console.log('Request received for balance sheet');
        
        // Fetch expenses for all users
        const expenses = await Expense.find();
        console.log('Fetched Expenses:', expenses); // Log fetched expenses

        // Check if any expenses were found
        if (!expenses.length) {
            return res.status(404).json({ message: 'No expenses found.' });
        }

        // Create a PDF document
        const doc = new PDFDocument();
        let filename = `balance-sheet-all-users.pdf`;
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        // Add content to the PDF
        doc.fontSize(25).text('Consolidated Balance Sheet', { align: 'center' });
        doc.moveDown();

        // Add expense details for all users
        expenses.forEach(expense => {
            doc.fontSize(12).text(`User ID: ${expense.user}, Amount: ${expense.amount}, Split Method: ${expense.splitMethod}, Date: ${expense.date}`);
            doc.moveDown();
        });

        // Finalize the PDF and send it to the client
        doc.end();
        doc.pipe(res);
    } catch (error) {
        console.error('Error generating balance sheet:', error); // Log error details
        res.status(500).json({ message: 'Internal server error.' });
    }
});
module.exports = router;
