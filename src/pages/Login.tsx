import { setLocalStorage } from "@/LocalStorage"
import PageTitle from "@/components/layout/PageTitle"
import { loginUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { loginFormData } from "@/types"
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
      const response = await dispatch(loginUser(data)).unwrap()
      console.log("Login Response:", response)

      if (response && response.jwt && response.userDto) {
        setLocalStorage("loginData", {
          isLoggedIn: true,
          userData: response.userDto,
          token: response.jwt
        })

        const isAdmin = response.userDto.isAdmin
        navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user")
      } else {
        console.error("Invalid login response structure", response)
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div>
      <div className="register-header">
        <PageTitle title="login" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="create-register">
            <form onSubmit={handleSubmit(onSubmit)} className="input">
              <p className="heading">Login</p>
              <div className="input-div">
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
              <div className="input-div">
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
              <div className="create-button">
                <button className="submit">Submit</button>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
