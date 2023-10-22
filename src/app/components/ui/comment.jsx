import { useCallback, useEffect, useState } from "react"
import API from "../../api"

const Comment = ({ userId, created_at, _id, content, handleDelete }) => {
  const [user, setUser] = useState()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])
  const getTime = useCallback((time) => {
    const date = new Date(Number(time))
    const dateFromNow = Date.now() - date
    if (Math.floor(dateFromNow / (3600000 * 24 * 365)) > 0)
      return ` ${date.getDay()} ${
        monthNames[date.getMonth()]
      } ${date.getFullYear()}    `
    else if (Math.floor(dateFromNow / (3600000 * 24)) > 0)
      return ` ${date.getDay()} ${monthNames[date.getMonth()]}`
    else if (Math.floor(dateFromNow / 3600000) > 0)
      return ` ${date.getHours()} ${date.getMinutes()}`
    else if (Math.floor(dateFromNow / 1800000) > 0) return ` 30 минут назад`
    else if (Math.floor(dateFromNow / 600000) > 0) return ` 10 минут назад`
    else if (Math.floor(dateFromNow / 300000) > 0) return ` 5 минут назад`
    else return ` 1 минуту назад`
  }, [])
  //   console.log(user)
  return (
    user && (
      <div className="bg-light card-body  mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src="https://api.dicebear.com/7.x/lorelei/svg"
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">
                      {user.name}
                      <span className="small">{getTime(created_at)}</span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => handleDelete(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Comment
