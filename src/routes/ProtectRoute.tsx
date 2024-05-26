import useUserState from "@/components/hooks/useUserState"
import { Login } from "@/pages/Login"

import { Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
  const {isLoggedIn} = useUserState()

  return isLoggedIn ? <Outlet /> : <Login/>
}


