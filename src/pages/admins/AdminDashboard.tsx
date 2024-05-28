import React from "react";
import useUserState from "@/components/hooks/useUserState";
import PageTitle from "@/components/layout/PageTitle";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const { userData } = useUserState();

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
          <Link to="admin/categories">Category</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};
