# MERN Stack Application: Employee Management System

This is a full-stack web application built using the MERN stack (Mysql,
Express, React, Node.js) for managing employees. The application
includes authentication using username and password, CRUD operations for
employees, and a dashboard for managing employee data.

## Technologies Used

\- \*\*Frontend\*\*: React.js

\- \*\*Backend\*\*: Node.js, Express.js

\- \*\*Database\*\*: Mysql

## Features

1\. \*\*Login \*\*

\- Users can login with a username and password.

\-

2\. \*\*Employee Management\*\*

\- CRUD operations (Create, Read, Update, Delete) for employee records.

\- Employees can be added, edited, and deleted from the system.

\- Data is stored in a mysql database.

3\. \*\*Dashboard\*\*

\- After login, users are redirected to a dashboard where they can
manage employees.

\- The dashboard displays a list of employees with options to edit or
delete each employee.

## Folder Structure

\`\`\`

mern-stack-app/

│

├── backend/ # Node.js and Express backend

│ ├── controllers/ # Controllers for handling API routes

│ ├── configs/ # Mysql schema models

│ ├── routes/ # Express routes for API endpoints

│ └── config/ # Configuration files (e.g., database connection, JWT)

| └──routes/ #routes

| └──validators/ # validating the the input fileds and database

│

└── frontend/ # React frontend

├── public/

└── src/

├── components/ # React components

├── pages/ # Pages (e.g., login page, dashboard, employeelist)

├── services/ # API service to communicate with backend

└── App.js # Main React component

\`\`\`

## Setup Instructions

### Prerequisites

\- Node.js installed on your machine

\- MongoDB installed locally or a MongoDB Atlas account for cloud
hosting

### Installation

1\. \*\*Backend Setup\*\*

\`\`\`bash

cd backend/

npm install

\`\`\`

\- Configure MongoDB connection in \`backend/config/db.js\`.

\- Set up JWT secret in \`backend/config/auth.config.js\`.

2\. \*\*Frontend Setup\*\*

\`\`\`bash

cd frontend/

npm install

\`\`\`

\- Update API base URL in \`frontend/src/services/api.js\`.

### Running the Application

1\. \*\*Start Backend Server\*\*

\`\`\`bash

cd backend/

npm start

\`\`\`

2\. \*\*Start Frontend Server\*\*

\`\`\`bash

cd frontend/

npm start

\`\`\`

3\. \*\*Access the Application\*\*

\- Open your browser and go to \`http://localhost:3000\` to view the
application.

## API Endpoints

### Employee API Endpoints

\- \*\*GET\*\* \`/api/employees\`: Get all employees.

\- \*\*GET\*\* \`/api/employees/:id\`: Get employee by ID.

\- \*\*POST\*\* \`/api/employees\`: Create a new employee.

\- \*\*PUT\*\* \`/api/employees/:id\`: Update employee by ID.

\- \*\*DELETE\*\* \`/api/employees/:id\`: Delete employee by ID.

### Authentication API Endpoints

\- \*\*POST\*\* \`/api/auth/login\`: Authenticate user and get JWT
token.

## Usage

\- Register/Login with your username and password.

\- Manage employees by adding, editing, or deleting their details.

\- View and update employee records on the dashboard.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the
\[LICENSE\](LICENSE) file for details.

---

This README file provides an overview of the MERN stack application's
structure, setup instructions, features, API endpoints, and usage
guidelines. Customize it further based on your specific implementation
details and additional features you may have implemented.
