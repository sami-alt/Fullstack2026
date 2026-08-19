import { getAllByPlaceholderText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Blog from './Blog'
import AddBlog from './AddBlog'


const blogs = [{
  title: 'title',
  author: 'author',
  url: 'www.test.com',
    likes: 67,
    user: {
      name: 'tero',
      username:'tester1'
    },
    id:'1'
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'www.test2.com',
    likes: 6,
    user: {
      name :'pekka',
      username: 'tester2'
    },
    id:'2'
  }
]

const testUser = {
  username:'tester1',
  name:'tero'
}

const testUser2 = {
  username:'tester2',
  name:'pekka'
}

test('show single blog info for unauthenticated user but no buttons', async ()=> {

  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              like={vi.fn()}
              deletePost={vi.fn()}
              user={null}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  screen.debug()
  const title = await screen.getByText('title')
  const author = await screen.getByText('author')
  const url = await screen.queryByText('www.test.com')
  const likes = await screen.queryByText('67')
  const poster = await screen.queryByText('tero')

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(poster).toBeVisible()

})

test('like and remove buttons are not shown when user is not logged in', () => {
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              like={vi.fn()}
              deletePost={vi.fn()}
              user={null}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.queryByRole('button', { name: "like" })).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: "remove" })).not.toBeInTheDocument()
})

test('authenticated user but not owner of post can see like but not remove button', () => {
  console.log(testUser)
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              like={vi.fn()}
              deletePost={vi.fn()}
              user={testUser2}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  screen.debug()
  expect(screen.queryByRole('button', { name: "like" })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: "remove" })).not.toBeInTheDocument()
})

test('blog owner can see the remove button', () => {
  console.log(testUser)
  render(
    <MemoryRouter initialEntries={['/blogs/1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              like={vi.fn()}
              deletePost={vi.fn()}
              user={testUser}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
  screen.debug()
  expect(screen.queryByRole('button', { name: "remove" })).toBeInTheDocument()
})

/*
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

*/