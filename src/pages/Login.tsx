import { setLocalStorage } from "@/LocalStorage"
import { loginUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/slices/store"
import {  loginFormData } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginFormData>()
  const dispatch: AppDispatch = useDispatch()
  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    try {
      const response = await dispatch(loginUser(data))
      
      console.log('Login Response:', response);

      if (response.payload && response.payload.data) {
  // Update local storage
  setLocalStorage("loginData", {
    isLoggedIn: true,
    userData: response.payload.data.userDto,
    token: response.payload.data.jwt
  });
        // Update Redux state
      }
      const isAdmin = response.payload.data.isAdmin

      navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)} className="form_main">
        <p className="heading">login</p>

        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button id="button">Submit</button>
      </form>
    </div>
  )
}
