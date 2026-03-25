import { Routes, Route } from "react-router-dom";
import AdminHome from "./src/AdminHome";
import AdminHome2 from "./src/AdminHome2";
import AdminDashboard from "./src/components/AdminDashboard";
import AdminLogin from "./src/components/AdminLogin";
import AdminProtectedRoute from "./src/AdminProtectedRoute";
import AddUserForm from "./src/components/AddUserForm";
import ViewUser from "./src/components/ViewUser";
import EditUser from "./src/components/EditUser";
import AdminNavigationBar from "./src/components/AdminNavigationBar";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="" element={<AdminHome />} />
      <Route path="home" element={<AdminHome2 />} />
      <Route path="addUserForm" element={
        <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
          <AdminNavigationBar />
          <div style={{ paddingTop: "80px" }}>
            <AddUserForm />
          </div>
        </div>
      } />
      <Route path="user/view/:id" element={<ViewUser />} />
      <Route path="user/edit/:id" element={<EditUser />} />
      <Route path="dashboard" element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      } />

      {/* Protected Routes */}
      {/* <Route
        path=""
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AdminRoutes;
