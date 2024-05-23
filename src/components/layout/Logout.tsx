import React from "react"
import { useNavigate } from "react-router-dom"
import useUserActions from "@/tookit/slices/useUserActions"

const Logout = () => {
  const { logout } = useUserActions()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
