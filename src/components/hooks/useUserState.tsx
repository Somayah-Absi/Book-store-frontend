import { RootState } from "@/tookit/slices/store"
import { useSelector } from "react-redux"
import { TypedUseSelectorHook } from "react-redux"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useUserState = () => {
  const { users, totalPages, userData, isLoading, error, token, isLoggedIn, loginStatus } =
    useAppSelector((state: RootState) => state.userR)
  const safeToken = token || ""
  return {
    users,
    totalPages,
    userData,
    isLoading,
    error,
    token: safeToken,
    isLoggedIn,
    loginStatus
  }
}

export default useUserState
