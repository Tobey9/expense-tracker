https://roadmap.sh/projects/expense-tracker-api


💸 Expense Tracker API
This is a secure backend API for an Expense Tracker application, built using Node.js and Express.js. It allows users to register and log in, and then add, edit, delete, or view their expenses — all protected by JWT authentication.

🚀 Features
✅ User Registration and Login (/users/register, /users/login)

🔐 JWT-based Authentication with HttpOnly Cookies

➕ Add a new expense

📝 Edit existing expenses

❌ Delete an expense

📅 Filter expenses by:

Past week

Past month

Last 3 months

Custom date range

🧠 Technologies Used
Node.js

Express.js

Sequelize ORM

MySQL (or PostgreSQL)

JWT (JSON Web Tokens)

bcrypt (for password hashing)

dotenv

🔐 Authentication
All routes under /expenses are protected and require the user to be logged in. Authentication is done via JWT tokens stored in HttpOnly cookies.

📂 API Endpoints
👤 Users (/users)
POST /users/register → Register a new user

POST /users/login → Log in and receive JWT token

GET /users/logout → Log out the user

💵 Expenses (/expenses)
POST /expenses/add → Add new expense (requires login)

PUT /expenses/edit/:expenseId → Edit an expense

DELETE /expenses/:expenseId → Delete an expense

GET /expenses/filter?filter=week|month|3months|custom&startDate=yyyy-mm-dd&endDate=yyyy-mm-dd → Get filtered expenses

To run this Expense Tracker backend locally, follow these steps.

Step 1: Clone the repository to your local machine using Git.

Step 2: Navigate into the project directory and run npm install to install all required dependencies.

Step 3: Create a .env file in the root folder and define your environment variables—most importantly, add JWT_SECRET and your database connection settings.

Step 4: Start the development server by running npm start.

Step 5: Use a tool like Postman to test the API. Authentication routes start with /users, and expense-related routes (like add, edit, delete, and filter) start with /expenses.

Step 6: For any protected routes, make sure to include your JWT token in an HTTP-only cookie to stay authenticated.
