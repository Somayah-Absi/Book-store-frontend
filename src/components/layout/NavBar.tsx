import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav>
      <ul>
        <Link to="/" className="nav-bar">
          Home
        </Link>
        <Link to="/products" className="nav-bar">
          Products
        </Link>{" "}
      </ul>
    </nav>
  )
}

export default NavBar
