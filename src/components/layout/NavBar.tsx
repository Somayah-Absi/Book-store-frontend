import { Link } from "react-router-dom"
import { AppDispatch } from "@/tookit/slices/store"
import { useDispatch } from "react-redux"
import useUserState from "../hooks/useUserState"
import { logOutUser } from "@/tookit/slices/UserSlice"


const NavBar = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn,userData } = useUserState()
  const handleLogout = () => {
    dispatch(logOutUser())
  }
  console.log(userData);
  return (
    <nav>
    <ul>
      
        <Link to="/" className="nav-bar">
          Home
        </Link>
    
      {isLoggedIn ? (
        <>
       
       <Link to={ `/dashboard/${userData && userData.isAdmin ? "admin" : "user"}`} className="nav-bar">
  {userData && userData.isAdmin ? "Admin Dashboard" : "User Dashboard"} 
</Link>

             
         
            <button onClick={handleLogout} className="nav-bar">
              Logout
            </button>
       
        </>
      ) : (
        <>
         
            <Link to="/register" className="nav-bar">
              Register
            </Link>
         
         
            <Link to="/login" className="nav-bar">
              Login
            </Link>
         
        </>
      )}
     
        <Link to="/products" className="nav-bar">
          Products
        </Link>
     
    </ul>
  </nav>
);
};

export default NavBar;
