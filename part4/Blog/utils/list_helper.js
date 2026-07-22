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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}