A secure backend application built with Node.js and Express, implementing robust user authentication and authorization workflows. This project demonstrates how to securely handle user credentials, manage sessions using JSON Web Tokens (JWT), and structure a scalable backend architecture.

---

##  Features

* **User Authentication:** Secure registration and login workflows.
* **Password Hashing:** Implements strong, industry-standard password hashing before database storage.
* **Token-Based Authorization:** Generates and validates stateless JSON Web Tokens (JWT) for route protection.
* **Custom Middleware:** Centralized request validation and authentication checks.
* **Modular Architecture:** Clean division of concerns across APIs, database models, and server routing.

---

## Project Structure


├── APIS/            # Express route handlers and controller logic
├── middleware/      # Authentication and request validation middleware
├── models/          # Database schemas and data models
├── .gitignore       # Specific files and folders ignored by Git
├── package-lock.json# Locked versions of npm packages
├── package.json     # Project dependencies and scripts
├── req.http         # HTTP client file for testing API endpoints
└── server.js        # Main application entry point
 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher recommended)

npm (comes packaged with Node.js)

 Installation & Setup
Clone the Repository:



Bash
npm install
Environment Configuration:
Create a .env file in the root directory and define your environment variables (e.g., database connection string, JWT secret key, and port number):

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
Start the Server:

Bash
npm start
The server should now be running on http://localhost:5000
