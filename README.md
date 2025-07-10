https://roadmap.sh/projects/expense-tracker-api

# 💸 Expense Tracker API

**This is a secure backend API for an Expense Tracker application, built using Node.js and Express.js. It allows users to register and log in, and then add, edit, delete, or view their expenses — all protected by JWT authentication.**

## 🚀 Features

- ✅ User Registration and Login (/users/register, /users/login)

- 🔐 JWT-based Authentication with HttpOnly Cookies

- ➕ Add a new expense

- 📝 Edit existing expenses

- ❌ Delete an expense

- 📅 Filter expenses by:
  - Past week
  - Past month
  - Last 3 months
  - Custom date range

## 🧠 Technologies Used

1. Node.js
2. Express.js
3. Sequelize ORM
4. MySQL (or PostgreSQL)
5. JWT (JSON Web Tokens)
6. bcrypt (for password hashing)
7. dotenv

## 🔐 Authentication

_All routes under /expenses are protected and require the user to be logged in. Authentication is done via JWT tokens stored in HttpOnly cookies._

## 📂 API Endpoints

_👤 Users (/users)_
POST /users/register → _Register a new user_

POST /users/login → _Log in and receive JWT token_

GET /users/logout → _Log out the user_

_💵 Expenses (/expenses)_
POST /expenses/add → _Add new expense (requires login)_

PUT /expenses/edit/:expenseId → _Edit an expense_

DELETE /expenses/:expenseId → _Delete an expense_

GET /expenses/filter?filter=week|month|3months|custom&startDate=yyyy-mm-dd&endDate=yyyy-mm-dd → _Get filtered expenses_

### To run this Expense Tracker backend locally, follow these steps.

Step 1: Clone the repository to your local machine using Git.

Step 2: Navigate into the project directory and run npm install to install all required dependencies.

Step 3: Create a .env file in the root folder and define your environment variables—most importantly, add JWT_SECRET and your database connection settings.

Step 4: Start the development server by running npm start.

Step 5: Use a tool like Postman to test the API. Authentication routes start with /users, and expense-related routes (like add, edit, delete, and filter) start with /expenses.

Step 6: For any protected routes, make sure to include your JWT token in an HTTP-only cookie to stay authenticated.
