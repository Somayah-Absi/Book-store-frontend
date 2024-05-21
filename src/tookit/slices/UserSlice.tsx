import api from "@/api"
import { User, UserState, loginData } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: UserState = {
  error: null,
  isLoading: false
}
export const RegisterUser = createAsyncThunk("user/registerUser", async (newUser: User) => {
  const response = await api.post(`/users/register`, newUser)
  console.log(response)
  return response.data
})
export const loginUser = createAsyncThunk("user/loginUser", async (UserData: loginData) => {
  const response = await api.post(`/users/login`, UserData)
  console.log(response)
  return response.data
})

const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {}
})

export default UserSlice.reducer
