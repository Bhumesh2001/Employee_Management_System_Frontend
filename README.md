# 🧑‍💼 Employee Management System – Frontend

This is the **frontend** of the Employee Management System, built with **React.js**. It provides an intuitive and responsive UI for both Admin and Employee roles, enabling features like login, employee CRUD operations, attendance viewing, leave tracking, and payslip generation.

## 🚀 Features

- Admin & Employee Login
- Admin Dashboard with:
  - Create, Update, Delete Employees
  - Generate Payslips
  - View Attendance & Leave Applications
- Employee Dashboard:
  - View personal Attendance, Leave Status, and Payslips
- Responsive UI using Tailwind CSS
- Role-based Conditional Rendering
- API integration with backend for real-time updates

## 📦 Tech Stack

- React.js
- Context API (for Auth)
- Axios
- Tailwind CSS

## 📂 Folder Structure

src/ ├── components/ │ ├── admin/ │ ├── common/ │ └── employee/ ├── pages/ ├── services/ ├── context/ └── App.js

## ⚙️ Setup Instructions

1. Clone the repo:

   ```bash
   git clone <frontend-repo-url>
   cd frontend

   ```

2. Install dependencies:
   npm install

3. Start the development server:
   npm start || npm run dev

4. The app will run on http://localhost:3000
   ⚠️ Make sure the backend server is running on http://localhost:5000 or update the baseURL in services/api.js accordingly.
