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
        </Link>
        <Link to="/register" className="nav-bar">
          Register
        </Link>
        <Link to="/login" className="nav-bar">
          Login
        </Link>
      </ul>
    </nav>
  )
}

export default NavBar
