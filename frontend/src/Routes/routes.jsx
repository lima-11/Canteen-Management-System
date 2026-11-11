import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import FoodMenu from "../pages/user/FoodMenu";
import FoodDetails from "../pages/user/FoodDetails";
import MyCart from "../pages/user/MyCart";
import Checkout from "../pages/user/Checkout";
import OrderSuccess from "../pages/user/OrderSuccess";
import MyOrders from "../pages/user/MyOrders";
import MyProfile from "../pages/user/MyProfile";
import Login from "../login";
import Register from "../Register";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageOrders from "../pages/admin/ManageOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import OrderDetails from "../pages/admin/OrderDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<FoodMenu />} />
        <Route path="/foods/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/profile" element={<MyProfile />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          
          <Route path="orders" element={<ManageOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
