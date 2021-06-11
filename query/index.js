const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

/* posts = {
    'j123j42': {
        id: 'j123j42',
        title: "post title",
        comments: [
            {
                id: 'klj3kl',
                content: 'comment content',
                status: 'pending' | 'approved' | 'rejected'
            }
        ]
    }
}*/
const posts = {}

app.get('/posts', (_, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  if (type === 'PostCreated') {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data

    const post = posts[postId]
    const comment = post.comments.find((c) => c.id === id)

    comment.status = status
    comment.content = content
  }

  res.send({})
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
