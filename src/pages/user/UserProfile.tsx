import useUserState from "@/components/hooks/useUserState"
import PageTitle from "@/components/layout/PageTitle"
import { logOutUser, updateUser } from "@/tookit/slices/UserSlice"
import { AppDispatch } from "@/tookit/slices/store"
import { EditData } from "@/types"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export const UserProfile = () => {
  const { userData } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOutUser())
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditData>()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const onSubmit: SubmitHandler<EditData> = async (data) => {
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
    setIsFormOpen(false)
    reset()
  }

  return (
    <div>
      <PageTitle title="Profile" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-wrap gap-8 items-start justify-center">
          <div className="w-80 rounded-lg border-2 border-indigo-500 bg-transparent p-6 text-center shadow-lg dark:bg-gray-800">
            <figure className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="currentColor"
                className="bi bi-person-fill text-white dark:text-indigo-300"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
              </svg>
              <figcaption className="sr-only">
                {userData?.firstName} {userData?.lastName}
              </figcaption>
            </figure>
            <h2 className="mt-6 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{userData?.email}</p>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{userData?.mobile}</p>
            <div className="flex items-center justify-center">
              <button
                className="rounded-full bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? "Close Edit" : "Edit User"}
              </button>
              <button
                onClick={handleLogout}
                className="ml-4 rounded-full bg-gray-300 px-6 py-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          </div>

          {isFormOpen && (
            <div className="max-w-md p-6 rounded-lg shadow-md bg-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="first-name">
                    First Name
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    type="text"
                    id="first-name"
                    {...register("firstName", {
                      required: "First Name is required",
                      minLength: {
                        value: 2,
                        message: "First Name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="last-name">
                    Last Name
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    type="text"
                    id="last-name"
                    {...register("lastName", {
                      required: "Last Name is required",
                      minLength: {
                        value: 2,
                        message: "Last Name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                    type="text"
                    id="mobile"
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
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                    type="submit"
                  >
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile