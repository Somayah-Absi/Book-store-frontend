import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "@/components/layout/NavBar"
import { AdminDashboard, AdminRoute, AdminUsersManagement, Categories, Error, Home, Login, Orders, Products, ProductsDetail, ProtectedRoute, Register, UserDashboard, UserOrders, UserProfile } from "@/pages/index."


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
          <Route path="admin/users" element={<AdminUsersManagement />} />
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
