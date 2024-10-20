// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    splitMethod: { type: String, required: true },
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
        amountOwed: { type: Number }
    }],
    createdAt: { type: Date, default: Date.now }  // Automatically set creation date
});

module.exports = mongoose.model('Expense', expenseSchema);
