import { getAllByPlaceholderText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlog from './AddBlog'
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js'

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

  const mockHandler = vi.fn()


  render(
    <Blog
      blog={blog}
      like={mockHandler}
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

  const deletePost = () => {}

  const mockHandler = vi.fn()


  render(
    <Blog
      blog={blog}
      like={mockHandler}
      deletePost={deletePost}
    />
  )


  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)
  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)

})


test('test adding new blog post', async () => {
    const user = userEvent.setup()
    const createBlogPost = vi.fn()  

    
    const visible = true
    const setVisible = vi.fn()
    const setMessage = vi.fn()
    
    const {container} = render(<AddBlog setMessage={setMessage} visible={visible} setVisible={setVisible} createBlog={createBlogPost} ></AddBlog>)

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const createButton = screen.getByText('Add post')

    await user.type(title, 'test title')
    await user.type(author, 'test author')
    await user.type(url, 'www.test.fi')

    await user.click(createButton)

    expect(createBlogPost.mock.calls).toHaveLength(1)
    console.log(createBlogPost.mock.calls)
})

