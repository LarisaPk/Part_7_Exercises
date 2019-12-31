const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response, next) => {
    const body = request.body

    try {
      const blog = await Blog.findById(request.params.id)

      const comment = new Comment ({
      comment: body.comment,
      blog: blog._id
      })
     
      const savedComment = await comment.save()
      blog.comments = blog.comments.concat(savedComment._id)
      await blog.save()
      response.status(201).json(savedComment.toJSON())
  
      } catch(exception) {
        next(exception)
      }
    })

commentsRouter.get('/:id/comments', async (request, response) => {
    const comments = await Comment.find({blog: request.params.id})
    response.json(comments.map(c => c.toJSON()))
  })

module.exports = commentsRouter