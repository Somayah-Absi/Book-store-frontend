import useUserState from "@/components/hooks/useUserState"

const AdminDashboard = () => {
  const { userData } = useUserState()

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h3>
        first Name:{userData?.firstName}

      </h3>
      <h3>
        last Name:{userData?.lastName}
      </h3>
      <ul>
        <li>
          <a href="admin/categories"> Category</a>
        </li>
        <li>
          {" "}
          <a href="admin/orders">orders</a>
        </li>
        <li>
          {" "}
          <a href="admin/products">products</a>
        </li>
        <li>
          {" "}
          <a href="admin/users">users</a>
        </li>
      </ul>
    </div>
  )
}

export default AdminDashboard
