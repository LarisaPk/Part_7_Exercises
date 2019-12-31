const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe('viewing blogs', () => {
  test('blogs returned as json, same length as initial', async () => {
  const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })  

  test('unique identifier property of the blog posts named id exist', async () => {
  const response = await helper.blogsInDb()
  response.forEach(blog => {
    expect(blog.id).toBeDefined()
   })
  })
})

describe('adding blog', () => {
  test('valid blog can be added ', async () => {
  const newBlog = {
    title: 'Added one new blog',
    author: 'New Author',
    url: 'url/test/url123',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
    'Added one new blog'
    )
  })
  test('likes property missing from the request defaults to 0', async () => {
  const newBlog = {
    title: 'Added one new blogBLog with missing likes property',
    author: 'Test Author',
    url: 'url/test/url123',
  }

 const addedBlog =  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  expect(addedBlog.body.likes).toBe(0)
  })

  test('title and url are missing from the request, the backend responds 400 ', async () => {
  const newBlog = {
    author: 'Missing Author',
  }

 await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const idis = blogsAtEnd.map(i => i.id)

    expect(idis).not.toContain(blogToDelete.id)
  })
})

describe('updating a blog', () => {
  test('response with updated blog if valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes= 111
    console.log(blogToUpdate)

   response =  await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
    
    expect(response.body.id).toBe(blogToUpdate.id)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'initial user', password: 'sekret' })
    await user.save()
  })

  test('creation of a new user with unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'new user',
      name: 'newUser',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'initial user',
      name: 'another user',
      password: 'password',
    }

    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }) 
  
  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'another user',
      password: 'password',
    }

    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3)`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }) 
  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'another user',
      password: 'password',
    }

    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`\`username\` is required`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }) 

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'another user',
      password: 'pa',
    }

    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing or too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }) 
  test('creation fails with proper statuscode and message if password missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'another user',
      password:''
    }

    const result = await api 
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing or too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  }) 
}) 

afterAll(() => {
    mongoose.connection.close()
  })
  