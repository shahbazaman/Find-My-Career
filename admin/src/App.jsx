import { BrowserRouter, Routes, Route } from "react-router-dom";

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

      {/* Show navbar only after admin login */}
      {/* {localStorage.getItem("admin-auth") === "true" && <AdminNavigationBar />} */}

      <Routes>

        {/* Public routes */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome2/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/addUserForm" element={<AddUserForm />} />
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
