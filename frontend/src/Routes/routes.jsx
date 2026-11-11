import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import MainLayout from "../Layout/MainLayout.jsx";
import AdminLayout from "../Layout/AdminLayout.jsx";

// Components
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// User Pages
import Home from "../pages/user/Home.jsx";
import About from "../pages/user/About.jsx";
import Contact from "../pages/user/Contact.jsx";
import FoodMenu from "../pages/user/FoodMenu.jsx";
import FoodDetails from "../pages/user/FoodDetails.jsx";
import MyCart from "../pages/user/MyCart.jsx";
import Checkout from "../pages/user/Checkout.jsx";
import OrderSuccess from "../pages/user/OrderSuccess.jsx";
import MyOrders from "../pages/user/MyOrders.jsx";
import MyProfile from "../pages/user/MyProfile.jsx";

// Authentication
import Login from "../login.jsx";
import Register from "../Register.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageOrders from "../pages/admin/ManageOrders.jsx";
import ManageUsers from "../pages/admin/ManageUsers.jsx";
import OrderDetails from "../pages/admin/OrderDetails.jsx";


export default function AppRoutes() {

  return (
    <Routes>

      {/* User Layout */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/menu" element={<FoodMenu />} />

        <Route path="/foods/:id" element={<FoodDetails />} />

        <Route path="/cart" element={<MyCart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/order-success/:id"
            element={<OrderSuccess />}
          />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/profile" element={<MyProfile />} />

        </Route>

      </Route>


      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute role="admin" />}>

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<AdminDashboard />} />

          <Route path="orders" element={<ManageOrders />} />

          <Route path="orders/:id" element={<OrderDetails />} />

          <Route path="users" element={<ManageUsers />} />

        </Route>

      </Route>


      {/* Not Found Route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}