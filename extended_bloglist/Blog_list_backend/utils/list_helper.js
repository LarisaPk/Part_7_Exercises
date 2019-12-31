const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes  = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
      }
      return blogs.reduce(reducer, 0)
  }

const favoriteBlog = (blogs) => {
    const reducer = (firstBlog, nextBlog) => {
        return firstBlog.likes >=nextBlog.likes
        ? firstBlog
        : nextBlog
    }  
      const result = blogs.reduce(reducer, blogs[0])
      console.log(result)
      return {
        title:  result.title,
        author: result.author,
        likes: result.likes
    }
  }

const mostBlogs = (blogs) => {

var output =
    _(blogs)
      .countBy('author')
      .map((key, value) => ({
          'author': value,
          'blogs': key }))
      .value()
  
console.log(output)
const maxBlogs = _.maxBy(output, 'blogs')
console.log(maxBlogs)
    
return {
        author: maxBlogs.author,
        blogs: maxBlogs.blogs
    }
}

const mostLikes  = (blogs) => {
    
var output =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
          'author': key,
          'likes': _.sumBy(objs, 'likes') }))
      .value()
  
console.log(output)
const maxLikes = _.maxBy(output, 'likes')
console.log(maxLikes)

return{
        author: maxLikes.author,
        likes: maxLikes.likes
     }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes 
}  