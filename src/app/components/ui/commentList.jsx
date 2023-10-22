import Comment from "./comment"

const CommentList = ({ comments, onRemove }) => {
  return comments.map((comment) => {
    console.log(comment)
    return (
      <Comment
        key={comment._id}
        userId={comment.userId}
        created_at={comment.created_at}
        _id={comment._id}
        content={comment.content}
        handleDelete={onRemove}
      />
    )
  })
}

export default CommentList
