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

⚙️ Setup Instructions
To run this project locally:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/expense-tracker-api.git
cd expense-tracker-api
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add your environment variables:

ini
Copy
Edit
JWT_SECRET=your_jwt_secret_key
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
NODE_ENV=development
Create your database using a SQL client:

sql
Copy
Edit
CREATE DATABASE your_database_name;
Run the development server:

bash
Copy
Edit
npm run dev
The API will be live at http://localhost:3000.

📬 Testing in Postman
Register or login via /users/register or /users/login.

The JWT token will be set in an HttpOnly cookie.

Use protected routes like POST /expenses/add after login.

For filtering, use query params like:

sql
Copy
Edit
/expenses/filter?filter=week
/expenses/filter?filter=custom&startDate=2024-01-01&endDate=2024-03-31
📝 License
This project is open-source and free to use.
