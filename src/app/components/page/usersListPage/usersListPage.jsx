import React, { useState, useEffect } from "react"
import _ from "lodash"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import SearchStatus from "../../ui/searchStatus"
import UsersTable from "../../ui/usersTable"
import GroupList from "../../common/groupList"
import API from "../../../api/index"

const UsersListPage = () => {
  const [users, setUsers] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState("")
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
  const [searchText, setSearchText] = useState()
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
    setSearchText()
  }
  const handleClearFilter = () => {
    setSelectedProf()
  }
  const handleSort = (item) => {
    setSortBy(item)
  }
  const handleChangeSearch = (e) => {
    setSearchText(e.target.value)
    setSelectedProf(undefined)
  }
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
  })
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data))
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchText])

  if (users) {
    const filteredUsers = searchText
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        )
      : selectedProf
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
        <div className="flex flex-column">
          <input
            type="text"
            className="w-100"
            onChange={handleChangeSearch}
            value={searchText}
            placeholder="Search"
          />
          <SearchStatus length={count} />
          {count > 0 && (
            <div className="d-flex flex-column">
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
      </div>
    )
  }
  return "loading"
}

export default UsersListPage
