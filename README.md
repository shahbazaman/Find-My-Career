# Find My Career 🚀

Find My Career is a full-stack MERN web application built to help users explore career options, prepare for jobs, and improve their skills through structured learning and assessments. The platform includes role-based access with separate user and admin dashboards for effective management.

---

## 🌟 Features

- Secure user authentication and authorization
- Role-based access (User & Admin)
- Career guidance and job preparation modules
- MCQ-based skill assessment system
- Admin dashboard for managing users and content
- RESTful APIs with JWT authentication
- Clean and scalable project structure

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Tools & Libraries
- JWT Authentication
- Axios
- Git & GitHub
- ESLint

---

## 📁 Project Structure
FindMyCareer
├── admin          # Admin dashboard (React + Vite)
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── client         # User frontend (React + Vite)
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server         # Backend (Node.js + Express)
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder and add the following:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret

> ⚠️ Note: Never commit `.env` files to GitHub.

---

## ▶️ Run the Project Locally

Follow these steps to run the application on your local machine.

### 1️⃣ Clone the Repository

git clone https://github.com/YOUR_USERNAME/find-my-career.git  
cd find-my-career

---

### 2️⃣ Start the Backend Server

cd server  
npm install  
npm run dev  

The backend server will start on:

http://localhost:5000

---

### 3️⃣ Start the User Frontend

Open a new terminal:

cd client  
npm install  
npm run dev  

The user frontend will be available at:

http://localhost:5173

---

### 4️⃣ Start the Admin Dashboard

Open another terminal:

cd admin  
npm install  
npm run dev  

The admin dashboard will be available at:

http://localhost:5174

---

## 🚀 Deployment

This project can be deployed using the following services:

- Frontend (Client & Admin): Vercel
- Backend: Render
- Database: MongoDB Atlas

Environment variables must be configured in the hosting platform dashboard.

---

## 📌 Future Enhancements

- Resume builder module
- Job application tracking system
- Email notifications
- AI-based career recommendations
- Interview preparation modules

---

## 👨‍💻 Author

Shahbaz  
MERN Stack Developer

---

## ⭐ Support

If you find this project useful, please consider giving it a ⭐ on GitHub.
