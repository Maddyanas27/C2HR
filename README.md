# C2HR Job Portal

A professional job portal built with MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### Candidate Journey
- User registration and login
- Complete profile setup
- Browse and apply to jobs

### Employer Journey
- Company registration
- Post job openings
- View job applications
- Create requisitions

### Consultant/Admin Features
- Access to job seeker database
- Access to employer database
- Manage users and jobs

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Database**: MongoDB with Mongoose

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Set up environment variables (create .env in backend folder)
4. Start the backend:
   ```bash
   npm run start-backend
   ```
5. Start the frontend:
   ```bash
   npm run start-frontend
   ```

## Project Structure

```
c2hr/
├── backend/          # Express.js server
├── frontend/         # React application
└── README.md
```