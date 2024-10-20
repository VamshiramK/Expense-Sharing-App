1.Introduction
   The Daily Expenses Sharing Application allows users to manage their expenses and split them with friends using three methods: 
   equal, exact amounts, and percentages. 
   
   It offers user management, expense tracking, and downloadable balance sheets.
   

2. Project Features
   User Management:
        Create users with email, name, and mobile number.
        Retrieve user details.
   Expense Management:
        Add expenses and split them by Equal, Exact, or Percentage methods.
        Retrieve individual and overall user expenses.
        Download a balance sheet for expense records.

   
3.Technology Stack
       Backend: Node.js, Express.js
       Database: MongoDB, Mongoose
       API Testing Tool: Postman
       Version Control: Git

4. Setup and Installation Instructions
       Prerequisites
       Node.js (v16 or later)
       MongoDB (locally)
       Git
   
 Installation Step
    
   1. Initial Setup-
              Install Node.js: Ensure you have Node.js installed on your system.

   2.Initialize Project:
             mkdir expenses-sharing-app
             cd expenses-sharing-app
             npm init -y
             
  3.Install Required Dependencies:
            npm install express mongoose body-parser dotenv
            npm install --save-dev nodemon
            Express: Backend framework.
            Mongoose: For MongoDB integration.
            body-parser: To handle incoming request bodies.
            dotenv: To manage environment variables.

  4.DataBase Setup:
           Install MongoDB: If you don't have MongoDB, install.
           Connect to MongoDB: In .env file, set up the MongoDB URI: MONGO_URI=mongodb://localhost:27017/expensesApp
           Create a db.js file to handle database connections:

  5. API Design:
           User Management: Create User and Expense models.

 Run the server - npm start
 And to Test the API End-Points use Postman API.

 5. Code Documentation:
    *First create the files .env , server.js , package.json
    *Then create Folders
         Config which consist of db.js DataBase related files
         Models which consist of user.js and model.js
         Routes which consist of User.js and Model.js\\
    
 6.API Testing
         Use Postman API to test API endpoints
         1. Create the users which include name,email,mobile using - http://localhost:5000/create/users
         2. Add the Expenses - http://localhost:5000/expenseAdd
         3. Retreive expenses - http://localhost:5000/expenses
         4.Balance Sheet - http://localhost:5000/expenses/balance-sheet

         
  The code is mentioned in the respective Files Thank you//..
