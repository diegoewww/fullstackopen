const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes  = (blogs) =>{

  const result = blogs.reduce((sum,element)=> sum + element.likes, 0)
  return result
}

const favoriteBlog = (blogs) => {
  return _.reduce(blogs, (prev, current) => (prev.likes > current.likes ? prev : current), {});
};

const maxBlogs = (authors) => {
  return _.reduce(authors, (prev, current) => (prev.blogs > current.blogs ? prev : current), {});
};

const mostLiked = (authors) => {
  return _.reduce(authors, (prev, current, index) => (prev.likes > current.likes ? prev : current), {});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  maxBlogs,
  mostLiked
}