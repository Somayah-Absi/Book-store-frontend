import React from "react";
import { Link } from "react-router-dom";
import { AppDispatch } from "@/tookit/slices/store";
import { useDispatch } from "react-redux";
import useUserState from "../hooks/useUserState";
import { logOutUser } from "@/tookit/slices/UserSlice";
import CartIcon from "../ui/CartIcon";
import useCartState from "../hooks/useCartState";

const NavBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, userData } = useUserState();
  const { cartItem } = useCartState();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link
                to={`/dashboard/${userData && userData.isAdmin ? "admin" : "user"}`}
                className="nav-link"
              >
                {userData && userData.isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className="nav-link register">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link login">
                Login
              </Link>
            </li>
          </>
        )}
        <li>
          <Link className="nav-link cart" to="/dashboard/user/cart">
            <CartIcon value={cartItem && cartItem.length > 0 ? cartItem.length : 0} />
          </Link>
        </li>
     
      </ul>
    </nav>
  );
};

export default NavBar;
