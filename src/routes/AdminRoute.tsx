import useUserState from "@/components/hooks/useUserState"
import { Login } from "@/pages/Login"

import { Outlet } from "react-router-dom"

export const AdminRoute = () => {
  const {isLoggedIn,userData} = useUserState()

  return isLoggedIn &&userData?.isAdmin ? <Outlet /> : <Login/>
}


