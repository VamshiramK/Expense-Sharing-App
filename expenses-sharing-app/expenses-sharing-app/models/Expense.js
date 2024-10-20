// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: Number,
    splitMethod: String,
    participants: [{ userId: mongoose.Schema.Types.ObjectId, amountOwed: Number }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add this line
    date: { type: Date, default: Date.now }
});

// Create and export the model
const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
