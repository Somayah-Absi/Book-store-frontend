import React from "react";
import useUserState from "@/components/hooks/useUserState";
import PageTitle from "@/components/layout/PageTitle";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const { userData } = useUserState();

  return (
    <div className="container">
      <PageTitle title="Admin dashboard" />

      <div className="admin-info">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="user-info">
          <div className="user-icon">
            <i className="fa-solid fa-user-tie fa-lg" style={{ color: "#c24747" }}></i>
          </div>
          <div>
            <h3>First Name: {userData?.firstName}</h3>
            <h3>Last Name: {userData?.lastName}</h3>
          </div>
        </div>
      </div>
      
      <div className="menu-wrapper">
        <h2 className="menu-title">You have access on:</h2>
        <ul className="menu">
          <li>
            <Link to="/dashboard/admin/categories" className="category-link">
              <i className="fa-solid fa-folder-plus fa-lg"></i>
              Category
            </Link>
          </li>
         
          <li>
            <Link to="/dashboard/admin/products" className="products-link">
              <i className="fa-solid fa-box-open fa-lg"></i>
              Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/users" className="users-link">
              <i className="fa-solid fa-users fa-lg"></i>
              Users
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
