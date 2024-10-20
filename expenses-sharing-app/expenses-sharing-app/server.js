const express = require('express');
const connectDB = require('./config/db');  
const userRoutes = require('./routes/user');  
const expenseRoutes = require('./routes/expense');  

const app = express();

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads

// Connect to MongoDB
connectDB();

// Define routes
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
