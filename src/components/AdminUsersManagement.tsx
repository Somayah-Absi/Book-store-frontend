import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useUserState from "./hooks/useUserState"
import { AppDispatch, RootState } from "@/tookit/slices/store"

import { DeleteUser, fetchUsers } from "@/tookit/slices/UserSlice"
import PageTitle from "./layout/PageTitle"

export const AdminUsersManagement = () => {
  const { users, isLoading, error, totalPages } = useSelector((state: RootState) => state.userR)
  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize }))
    }
    fetchData()
  }, [dispatch, pageNumber, pageSize])

  const handleDelete = async (id: string | undefined) => {
    try {
      if (!id) {
        console.log("user not found")
        return
      }
      dispatch(DeleteUser(id))
    } catch (error) {
      console.log(error)
    }
  }
  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }
  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }
  return (
    <div>
      <PageTitle title="Users board" />

      <h1 className="category-title">Users</h1>
      <div className="category-header">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Admin</th>
              <th>Banned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.userId}>
                  <td style={{ backgroundColor: "pink" }}>{user.userId}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.isAdmin ? "yes" : "No"}</td>
                  <td>{user.isBanned ? "yes" : "No"}</td>

                  <td>
                    <button onClick={() => handleDelete(user.userId)}>
                      <i className="fa-regular fa-trash fa-lg" style={{ color: "red" }}></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPageNumber(index + 1)}
            className={pageNumber === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
