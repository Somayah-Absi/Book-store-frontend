import { useDispatch } from "react-redux"
import { logOutUser } from "./UserSlice"
const useUserActions = () => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOutUser())
  }

  return { logout }
}

export default useUserActions
