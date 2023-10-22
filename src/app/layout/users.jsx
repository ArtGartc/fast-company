import { useParams } from "react-router-dom"
import UserPage from "./../components/page/userPage/index"
import UsersListPage from "../components/page/usersListPage/index"
import UserEditPage from "../components/page/userEditPage/userEditPage"

const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  return edit ? (
    <UserEditPage />
  ) : userId ? (
    <UserPage userId={userId} />
  ) : (
    <UsersListPage />
  )
}

export default Users
