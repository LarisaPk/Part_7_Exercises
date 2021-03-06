const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments',{ comment: 1, id: 1 })
  
    response.json(blogs) 
  })
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log("token from the router post",request.token) 
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
    })
   
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())

    } catch(exception) {
      next(exception)
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  console.log("token from the router delete",request.token)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString() ){
      return response.status(401).json({ error: 'only user who created blog can delete it' })
      }  
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end() 
      
    } catch (exception) {
      next(exception)
    }
  })
  
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      likes: body.likes
    }
  try {
     updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
      }
    catch (exception) {
        next(exception)
      }    
  })
module.exports = blogsRouter