import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useNavigate, useParams } from "react-router-dom"
import Qualities from "../../ui/qualities/qualities"
import API from "../../../api/index"

const UserPage = ({ userId }) => {
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const handleGoToAllUsers = () => {
    navigate("/users")
  }
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>{user.profession.name}</h2>
        <h3>
          {user.qualities.map((quality) => (
            <Qualities key={quality._id} quality={quality} />
          ))}
        </h3>
        <h3>{user.completedMeetings}</h3>
        <h3>{user.rate}</h3>

        <button
          className="btn btn-primary"
          onClick={() => handleGoToAllUsers()}
        >
          All Users
        </button>
      </>
    )
  } else return <h1>"loading"</h1>
}

export default UserPage
