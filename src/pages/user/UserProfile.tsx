import useUserState from "@/components/hooks/useUserState"
import { updateUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { editData } from "@/types"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export const UserProfile = () => {
  const { userData } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  const {
    register,
    handleSubmit,reset,
    formState: { errors }
  } = useForm<editData>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const onSubmit: SubmitHandler<editData> = async (data) => {
    if (!userData?.userId) {
      console.log("User id not found")
      return
    }

    try {
      const jwt = localStorage.getItem("jwt")
      if (!jwt) {
        console.error("JWT token not found")
        return
      }

      const response = await dispatch(
        updateUser({ updateUserData: data, userId: userData.userId, jwt })
      )
      console.log(response)
    } catch (error) {
      console.error("Update user error:", error)
    }
  }
  const handleCancel = () => {
    setIsFormOpen(false);
    reset(); 
  };

  return (
    <div>
      <h3>
        Name: {userData?.firstName} {userData?.lastName}
      </h3>
      <h3>Email: {userData?.email}</h3>
      <h3>Phone: {userData?.mobile}</h3>
      <button
        onClick={() => {
          setIsFormOpen(!isFormOpen)
        }}
      >
        {isFormOpen ? "Close Edit User" : "Open Edit User"}
      </button>
      {isFormOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="form-main">
          <p className="heading">Edit Profile</p>

          <div className="input-container">
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

          <div className="input-container">
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

          <div className="input-container">
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

          <button id="button">Submit</button>
          <button id="button" type="button" onClick={handleCancel}>Cancel</button>

        </form>
      )}
    </div>
  )
}


