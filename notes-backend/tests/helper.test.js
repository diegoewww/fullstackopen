const listHelper = require('../utils/list_helper')

describe('dummy',() => {

  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes',() => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that',() => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })
})

describe('Mayor numero de likes', () => {
  test('Encuentra el mayor numero de likes',() => {
    const blogs = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      },{
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 4
      },{
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 3
      },
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('mayor numero de blogs',() => {
  test('Author con mayor blogs', () => {
    const authors = [
      {
        author: 'Robert C. Martin',
        blogs: 3
      },
      {
        author: 'Diego',
        blogs: 1
      },
      {
        author: 'Paty',
        blogs: 2
      }
    ]

    const result = listHelper.maxBlogs(authors)

    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('Most liked',() => {
  test('MOST LIKED AUTHOR', () => {
    const authors = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      },
      {
        author: 'Edsger W. Dijkstra',
        likes: 10
      },
      {
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    ]

    const result = listHelper.mostLiked(authors)

    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})