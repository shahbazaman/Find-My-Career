import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminNavigationBar from "./components/AdminNavigationBar";
import AdminHome from "./AdminHome";
import AdminHome2 from "./AdminHome2";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AddUserForm from "./components/AddUserForm";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome2/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/addUserForm" element={
  <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
    <AdminNavigationBar />
    <div style={{ paddingTop: "80px" }}>
      <AddUserForm />
    </div>
  </div>
} />
<Route path="/admin/addUserForm" element={
  <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
    <AdminNavigationBar />
    <div style={{ paddingTop: "80px" }}>
      <AddUserForm />
    </div>
  </div>
} />
        <Route path="/admin/user/view/:id" element={<ViewUser />} />
        <Route path="/admin/user/edit/:id" element={<EditUser />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;