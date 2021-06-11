const CommentList = ({ comments }) => {
  const renderdComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>
  })

  return <ul>{renderdComments}</ul>
}

export default CommentList
