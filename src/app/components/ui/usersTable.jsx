import React from "react"
import Bookmark from "./bookmark"
import Table, { TableBody, TableHeader } from "./../common/table/index"
import Qualities from "./qualities/index"

const UsersTable = ({
  arrayUsers,
  onSort,
  currentSort,
  onSwitch,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    profession: { path: "profession.name", name: "Профессия" },
    qualities: {
      name: "Качество",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => {
        return (
          <Bookmark fill={user.bookmark} onSwitch={() => onSwitch(user._id)} />
        )
      }
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      )
    }
  }
  return (
    <Table>
      <TableHeader
        selectedSort={currentSort}
        onSort={onSort}
        columns={columns}
      />
      <TableBody data={arrayUsers} columns={columns} {...rest} />
    </Table>
  )
}
export default UsersTable
