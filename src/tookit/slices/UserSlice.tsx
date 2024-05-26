import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User, UserState, editData, loginFormData } from "@/types"
import api from "@/api"

interface UpdateUserPayload {
  updateUserData: editData
  userId: string // Ensure userId is always a string
  jwt: string // Ensure jwt is always a string
}
const data = localStorage.getItem("loginData")
  ? JSON.parse(String(localStorage.getItem("loginData")))
  : { isLoggedIn: false, userData: null, token: null }

const initialState: UserState = {
  users: [],
  totalPages:1,
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  token: data.token,
  loginStatus: "idle" // Initialize loginStatus
}

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({
    pageNumber,
    pageSize
 
  }: {
    pageNumber: number
    pageSize: number
  }) => {
    const response = await api.get(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    console.log(response.data); // Log the actual data structure received

    return response.data
  }
)
export const RegisterUser = createAsyncThunk("user/registerUser", async (newUser: User) => {
  const response = await api.post(`/users/register`, newUser)
  return response.data
})

export const loginUser = createAsyncThunk("user/loginUser", async (UserData: loginFormData) => {
  const response = await api.post(`/users/login`, UserData)
  return response.data
})

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ updateUserData, userId, jwt }: UpdateUserPayload, thunkAPI) => {
    const token = localStorage.getItem("jwt")
    if (!token) {
      throw new Error("JWT token not found")
    }

    console.log("Update User Payload:", { updateUserData, userId, jwt })

    try {
      const response = await api.put(`/users/${userId}`, updateUserData, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      console.log("Update User Response:", response.data)
      return response.data
    } catch (error) {
      console.error("Update User Error:", error)
      throw error
    }
  }
)

const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      state.loginStatus = "idle"
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.loginStatus = "loading"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action.payload); // Log the actual data structure received
        // Adjust the below lines according to the actual structure
        state.users = action.payload.data.data; // Access the inner data array
        state.totalPages = action.payload.data.totalCount; // Update totalPages accordingly
        state.isLoading = false;
    })
    
      
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.userData = action.payload.user
        state.token = action.payload.token
        state.loginStatus = "succeeded"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload.userDto
        state.token = action.payload.jwt

        localStorage.setItem(
          "loginData",
          JSON.stringify({
            isLoggedIn: true,
            userData: action.payload.userDto,
            token: action.payload.jwt
          })
        )
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to register"
        state.loginStatus = "failed"
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.loginStatus = "loading"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.data)

        if (state.userData) {
          state.userData.firstName = action.payload.data.firstName
          state.userData.lastName = action.payload.data.lastName
          state.userData.mobile = action.payload.data.mobile

          localStorage.setItem(
            "loginData",
            JSON.stringify({
              isLoggedIn: state.isLoggedIn,
              userData: state.userData,
              token: state.token
            })
          )
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update user"
      })
  }
})

export const { logOutUser } = UserSlice.actions

export default UserSlice.reducer
