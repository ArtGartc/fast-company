import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import GroupList from "./groupList"
import API from "../api/index"
import SearchStatus from "./searchStatus"
import UsersTable from "./usersTable"
import _ from "lodash"
import { useParams } from "react-router-dom"
import User from "./user"

const UsersList = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState("")
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const pageSize = 4
  const handleDeleteUser = (userId) => {
    setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
  }
  const handleSwitchBookmark = (userId) => {
    const index = users.findIndex((user) => user._id === userId)
    users[index].bookmark = !users[index].bookmark
    const newUser = [...users]
    setUsers(newUser)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleProfessionSelect = (profession) => {
    setSelectedProf(profession)
  }
  const handleClearFilter = () => {
    setSelectedProf()
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
  })
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data))
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users
    const count = filteredUsers.length
    const sortUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortUsers, currentPage, pageSize)

    return (
      <div className="d-flex justify-content-evenly">
        {professions && (
          <div className="d-flex flex-column">
            <GroupList
              items={professions}
              onClick={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-primary" onClick={handleClearFilter}>
              Очистить
            </button>
          </div>
        )}
        {count > 0 && (
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <UsersTable
              arrayUsers={usersCrop}
              currentSort={sortBy}
              onSort={handleSort}
              onDelete={handleDeleteUser}
              onSwitch={handleSwitchBookmark}
            />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
  return "loading"
}

export default UsersList
