import { Routes, Route } from "react-router-dom";
import AdminHome from "./src/AdminHome";
import AdminHome2 from "./src/AdminHome2";
import AdminDashboard from "./src/components/AdminDashboard";
import AdminLogin from "./src/components/AdminLogin";
import AdminProtectedRoute from "./src/AdminProtectedRoute";
import AddUserForm from "./src/components/AddUserForm";
import ViewUser from "./src/components/ViewUser";
import EditUser from "./src/components/EditUser";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="" element={<AdminHome />} />
      <Route path="home" element={<AdminHome2 />} />
      <Route path="addUserForm" element={<AddUserForm />} />
      <Route path="user/view/:id" element={<ViewUser />} />
      <Route path="user/edit/:id" element={<EditUser />} />

      {/* Protected Routes */}
      <Route
        path=""
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
