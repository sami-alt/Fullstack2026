import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import '../index.css'
console.log('css imported')

test('render content', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'www.test.com',
    likes: 67,
    user: {
      name: 'tester'
    }
  }

  const like = () => {}
  const deletePost = () => {}

  render(
    <Blog
      blog={blog}
      like={like}
      deletePost={deletePost}
    />
  )

  const title = screen.getByText('title')
  const author = screen.getByText('author')
  const url = await screen.queryByText('www.test.com')
  const likes = await screen.queryByText('67')
  const poster = await screen.queryByText('tester')

  expect(title).toBeVisible()
  expect(author).toBeVisible()

  expect(url).toBeNull()
  expect(likes).toBeNull()
  expect(poster).toBeNull()
})

