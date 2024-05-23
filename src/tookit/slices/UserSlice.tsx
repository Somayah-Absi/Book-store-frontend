import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api";
import { User, UserState, editData, loginData, loginFormData } from "@/types";

const data = localStorage.getItem("loginData")
  ? JSON.parse(String(localStorage.getItem("loginData")))
  : { isLoggedIn: false, userData: null, token: null };

const initialState: UserState = {
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  token: data.token,
};

export const RegisterUser = createAsyncThunk(
  "user/registerUser",
  async (newUser: User) => {
    const response = await api.post(`/users/register`, newUser);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (UserData: loginFormData) => {
    const response = await api.post(`/users/login`, UserData);
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ updateUserData, userId }: {updateUserData:editData,userId:string}) => {
    const response = await api.put(`/users/${userId}`,updateUserData);
    return response.data;
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.token = null;
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to register";
      }) 
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload.data.userData)
        if (state.userData) { 
          state.userData.firstName = action.payload.data.firstName
          state.userData.lastName = action.payload.data.lastName 
          state.userData.mobile = action.payload.data.mobile 
          localStorage.setItem(
            "loginData",
            JSON.stringify({
              isLoggedIn: state.isLoggedIn,
              userData: state.userData,
              token: state.token,
            })
            
          );
        }
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.userData = action.payload.data.userDto;
        state.token = action.payload.data.jwt;
        localStorage.setItem(
          "loginData",
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData,
            token: state.token,
          })
          
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to login";
      });
    
  },
});

export const { logOutUser } = UserSlice.actions;

export default UserSlice.reducer;
