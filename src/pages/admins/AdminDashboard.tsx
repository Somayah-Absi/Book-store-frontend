import React from "react"
import useUserState from "@/components/hooks/useUserState"
import PageTitle from "@/components/layout/PageTitle"

export const AdminDashboard = () => {
  const { userData } = useUserState()

  return (
    <div className="container">
      <PageTitle title="Admin dashboard" />

      <h1 className="title">Admin Dashboard</h1>
      <div className="user-info">
        <h3>First Name: {userData?.firstName}</h3>
        <h3>Last Name: {userData?.lastName}</h3>
      </div>
      <ul className="menu">
        <li>
          <a href="admin/categories">Category</a>
        </li>
        <li>
          <a href="admin/orders">Orders</a>
        </li>
        <li>
          <a href="admin/products">Products</a>
        </li>
        <li>
          <a href="admin/users">Users</a>
        </li>
      </ul>
    </div>
  )
}
