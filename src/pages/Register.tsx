import { RegisterUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { FormData } from "@/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import PageTitle from "@/components/layout/PageTitle"

export const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const dispatch: AppDispatch = useDispatch()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await dispatch(RegisterUser(data))
      console.log(response)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="register-header">
        <PageTitle title="Register" />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="create-register">
            <p className="heading">Register</p>
            <form onSubmit={handleSubmit(onSubmit)} className="input">
              <div className="input-div">
                <label htmlFor="firstName">firstName</label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "first Name is required",
                    minLength: {
                      value: 2,
                      message: "first Name must be at least 2 characters"
                    }
                  })}
                />
                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
              </div>

              <div className="input-div">
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "last Name is required",
                    minLength: {
                      value: 2,
                      message: "last Name must be at least 2 characters"
                    }
                  })}
                />
                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
              </div>
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

              <div className="input-div">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  {...register("mobile", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number must be numeric"
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits"
                    }
                  })}
                />
                {errors.mobile && <p className="error">{errors.mobile.message}</p>}
              </div>

              <div className="create-button">
                <button className="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
