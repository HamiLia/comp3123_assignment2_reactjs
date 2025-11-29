# COMP 3123 - Assignment 1: RESTful API Server

## 1. Project Description

[cite_start]This project is a RESTful API server built with Node.js, Express, and MongoDB[cite: 11]. It provides functionalities for user management (signup, login) and employee management (full CRUD operations).

## 2. Technologies Used

- [cite_start]**Backend:** Node.js, Express.js [cite: 11]
- [cite_start]**Database:** MongoDB [cite: 11]
- [cite_start]**Validation:** express-validator [cite: 48]
- [cite_start]**Security:** JWT (JSON Web Tokens) [cite: 63] (Optional)

## 3. Features & API Endpoints

### User Management

- [cite_start]`POST http://localhost:5000/api/v1/user/signup`: Create a new user account[cite: 15].
- [cite_start]`POST http://localhost:5000/api/v1/user/logi`: Log in a user[cite: 15].

### Employee Management

- [cite_start]`GET http://localhost:5000/api/v1/emp/employees`: Get a list of all employees[cite: 15].
- [cite_start]`POST http://localhost:5000/api/v1/emp/employees`: Create a new employee[cite: 16].
- [cite_start]`GET http://localhost:5000/api/v1/emp/employees/<employee_id>`: Get details for a single employee by ID[cite: 16].
- [cite_start]`PUT http://localhost:5000/api/v1/emp/employees/<employee_id>`: Update an employee's details[cite: 16].
- [cite_start]`DELETE http://localhost:5000/api/v1/emp/employees?eid=<employee_id>`: Delete an employee by ID[cite: 16].

## 4. Project Setup and Usage

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation & Running the App

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/HamiLia/101503901_COMP3123-assignment1]
    cd [https://github.com/HamiLia/101503901_COMP3123-assignment1]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the project and add your MongoDB connection string. [cite_start]The database name must be `comp3123_assigment1` as per the assignment requirements[cite: 17].

    ```
    MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017/comp3123_assigment1
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`

## 5. Sample User for Testing

[cite_start]As per the submission requirements[cite: 77], the following credentials can be used to test the login functionality:

{
"username": "alice",
"email": "alice@example.com",
"password": "password123"
}
