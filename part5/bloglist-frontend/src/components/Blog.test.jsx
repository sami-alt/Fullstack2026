import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('render only title and author', async () => {
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

  const mockHandle = vi.fn()


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

test('render title, author, url, likes on view mode', async () => {
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

  const mockHandle = vi.fn()


  render(
    <Blog
      blog={blog}
      like={like}
      deletePost={deletePost}
    />
  )


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const title = screen.getByText('title')
  const author = screen.getByText('author')
  const url = await screen.queryByText('www.test.com')
  const likes = await screen.queryByText('67')
  const poster = await screen.queryByText('tester')

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(poster).toBeVisible()

})