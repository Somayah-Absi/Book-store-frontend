import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "@/components/layout/NavBar"
import { Error, Home, Login, ProductsDetail, Register } from "@/pages/index."
import ProtectedRoute from "./ProtectRoute"
import UserDashboard from "@/pages/user/UserDashboard"
import UserProfile from "@/pages/user/UserProfile"
import UserOrders from "@/pages/user/UserOrders"
import AdminRoute from "./AdminRoute"
import AdminDashboard from "@/pages/admins/AdminDashboard"
import Orders from "@/pages/admins/Orders"
import { Products } from "@/components/ui/Products"
import Users from "@/pages/admins/Users"
import { Categories } from "@/components/Categories"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:ProductId" element={<ProductsDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>} />
          <Route path="admin/categories" element={<Categories />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
        </Route>

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
