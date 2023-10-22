import React, { useCallback, useEffect, useState } from "react"
import PropTypes, { object } from "prop-types"
import { useNavigate } from "react-router-dom"
import Qualities from "../../ui/qualities/qualities"
import API from "../../../api/index"
import SelectField from "./../../common/form/selectField"
import TextareaField from "../../common/form/textareaField"
import Comment from "../../ui/comment"
import UserData from "../../ui/userData"
import { orderBy } from "lodash"
import CommentList from "../../ui/commentList"

const UserPage = ({ userId }) => {
  const [comments, setComments] = useState([])
  const [allUsers, setAllUsers] = useState()

  const [data, setData] = useState({ userId: " ", content: "" })

  const handleDelete = (id) => {
    API.comments
      .remove(id)
      .then((id) =>
        setComments(comments.filter((comment) => comment._id != id))
      )
  }
  const handleChange = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    API.users.fetchAll().then((data) => setAllUsers(data))
  }, [])
  console.log(comments)
  // nameUsersFromComments && console.log(nameUsersFromComments)
  //
  // allUsers && console.log(allUsers)
  // console.log(nameUsersFromComments)
  const handleSubmit = () => {
    API.comments
      .add({
        ...data,
        pageId: userId
      })
      .then((data) => setComments([...comments, data]))
    setData({ userId: " ", content: "" })
  }

  const getOptions = (data) => {
    return data?.map((current) => ({ name: current.name, _id: current._id }))
  }
  const sortedComments = orderBy(comments, ["created_at"], "desc")
  console.log(sortedComments)
  // allUsers && console.log(getOptions(allUsers))
  return comments ? (
    <div className="container">
      <div className="row gutters-sm">
        <UserData userId={userId} />
        <div className="col-md-8">
          <div className="card mb-2">
            {" "}
            <div className="card-body ">
              <h2>New comments</h2>
              <SelectField
                onChange={handleChange}
                name="userId"
                optionData={getOptions(allUsers)}
                value={data.userId}
              />
              <p>Сообщение</p>
              <TextareaField
                value={data.content}
                onChange={handleChange}
                name="content"
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Опубликовать
              </button>
            </div>
          </div>
          {sortedComments.length > 0 && (
            <div className="card mb-3">
              <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                <CommentList
                  comments={sortedComments}
                  onRemove={handleDelete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>"loading"</h1>
  )
}

export default UserPage
