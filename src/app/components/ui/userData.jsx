import { useEffect, useState } from "react"
import API from "../../api"
import { useNavigate } from "react-router-dom"
import Qualities from "./qualities/qualities"

const UserData = ({ userId }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])
  const navigate = useNavigate()
  const handleGoToEdit = () => {
    navigate(`/users/${userId}/edit`)
  }
  return (
    user && (
      <div className="col-md-4 mb-3">
        <div className="card mb-3">
          <div className="card-body">
            <button
              className="position-absolute top-0 end-0 btn btn-light btn-sm"
              onClick={handleGoToEdit}
            >
              <i className="bi bi-gear"></i>
            </button>
            <div className="d-flex flex-column align-items-center text-center position-relative">
              <img
                src={"https://api.dicebear.com/7.x/lorelei/svg"}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="mt-3">
                <h4>{user.name}</h4>
                <p className="text-secondary mb-1">{user.profession.name}</p>
                <div className="text-muted">
                  <i
                    className="bi bi-caret-down-fill text-primary"
                    role="button"
                  ></i>
                  <i
                    className="bi bi-caret-up text-secondary"
                    role="button"
                  ></i>
                  <span className="ms-2">{user.rate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>Qualities</span>
            </h5>
            <p className="card-text">
              {user.qualities.map((quality) => {
                return (
                  <Qualities
                    key={quality._id}
                    quality={quality}
                    className="mx-1"
                  />
                )
              })}
            </p>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body d-flex flex-column justify-content-center text-center">
            <h5 className="card-title">
              <span>Completed meetings</span>
            </h5>

            <h1 className="display-1">{user.completedMeetings}</h1>
          </div>
        </div>
      </div>
    )
  )
}

export default UserData
