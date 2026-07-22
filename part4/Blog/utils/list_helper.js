var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((acc, blog) =>  acc + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, curr) =>  prev.likes > curr.likes ? prev : curr)
  return favorite
}

const mostBlogs = (blogs) => {
  const author = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(([author, count]) => count)
    .value()
  
  return {author: author[0], count:author[1]}

}

const mostLikes = (blogs) => {
  const author = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .maxBy('likes')
    .value()
    
    return author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}