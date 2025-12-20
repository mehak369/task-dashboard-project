Collaborative Task Manager – Full Stack Application
Overview

This project is a collaborative task management application built as a full-stack engineering assessment.
It allows users to register, log in, create tasks, assign tasks to other users, and collaborate in real time.

The application focuses on secure authentication, clean backend architecture, real-time communication, and production-ready deployment.


Features
Authentication 

User registration and login

Passwords are securely hashed using bcrypt

Authentication is implemented using JSON Web Tokens (JWT)

JWT is stored in HTTP-only cookies for better security

Protected routes ensure that only authenticated users can access the dashboard


##Task Management (CRUD)

Users can:

Create tasks

View tasks they created

View tasks assigned to them

Update task status and priority

Delete tasks (only the task creator can delete)


##Each task includes:

Title

Description

Due date

Priority (Low, Medium, High, Urgent)

Status (To Do, In Progress, Review, Completed)

Creator

Assignee


##Real-Time Collaboration

Real-time updates are implemented using Socket.io

Task updates are reflected instantly for all connected users

Users receive real-time notifications when a task is assigned to them


##Dashboard

The dashboard displays:

Tasks assigned to the logged-in user

Tasks created by the logged-in user

Overdue tasks

Filters for task status and priority

Sorting by due date



Tech Stack
##Frontend:

React (Vite)

TypeScript

Tailwind CSS

React Query for server state management and caching

Axios for API communication

Socket.io Client

##Backend:

Node.js with Express

TypeScript

MongoDB Atlas

Mongoose

JWT-based authentication

bcrypt for password hashing

Socket.io for real-time communication


Deployment

Frontend deployed on Netlify

Backend deployed on Render

Database hosted on MongoDB Atlas


##Architecture Overview

The backend follows a layered architecture to ensure clarity and maintainability:

Routes define API endpoints

Controllers handle HTTP request and response logic

Services contain core business logic such as authentication and task handling

Models define MongoDB schemas

Middleware handles authentication and authorization

This separation of concerns improves code readability, scalability, and testability.


##Authentication Design

Passwords are hashed using bcrypt before being stored in the database

During login, passwords are validated using bcrypt comparison

JWT is generated upon successful login

JWT is stored in a secure, HTTP-only cookie

Cross-origin authentication between Netlify and Render is handled using proper cookie settings (secure and sameSite options)

This ensures secure authentication in a production environment.


##Real-Time Communication

Socket.io is initialized on the backend using the HTTP server

Each user joins a socket room based on their user ID

Task assignment and updates emit socket events

The frontend listens to these events and refreshes task data automatically


##Testing

Unit tests are written for critical backend logic

Tests focus on authentication and task-related business logic

Testing ensures reliability and correctness of core functionality


Local Setup Instructions
Backend
cd backend
npm install
npm run dev


Create a .env file in the backend directory:

PORT=5050
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Frontend
cd frontend
npm install
npm run dev


Create a .env file in the frontend directory:

VITE_API_URL=http://localhost:5050/api

Live Deployment

Frontend: https://task-manage-dashboard.netlify.app/

Backend API: https://task-dashboard-project.onrender.com

Live deployment is mandatory and fully functional.

Trade-offs and Assumptions

MongoDB was chosen for flexibility and ease of schema evolution

JWT stored in cookies was preferred over localStorage for improved security

The database was reset once during development to align stored credentials with updated authentication logic

The focus was kept on clean architecture and correctness rather than over-engineering

Conclusion

This project demonstrates full-stack development skills including secure authentication, real-time collaboration, clean backend architecture, and production deployment.
It reflects real-world engineering challenges and practical solutions.
