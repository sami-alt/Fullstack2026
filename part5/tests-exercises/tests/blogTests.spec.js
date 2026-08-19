const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Login tests', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testi Tahvo',
        username: 'tester1',
        password: 'test'
      }
    })
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const heading = await page.getByRole('heading', {name:'Login'})
    await expect(heading).toBeVisible()
  })
  
  test('succeeds with correct credentials', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = await page.getByLabel('username')
    const password = await page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester1')
    await password.fill('test')
      
    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()
  })
  
  test('fails with wrong credentials', async ({ page }) => {
    await page.getByRole('textbox').first().fill('väärä')
    await page.getByRole('textbox').last().fill('väärä')
    await page.getByRole('button', {name:'login'}).click()

    const leggedInMessage = page.getByText('invalid username or password')
    await expect(leggedInMessage).toBeVisible()
  })
    
})

describe('logged in user functionalities', ()=> {
  beforeEach(async ( {page, request} ) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Testi Tahvo',
        username: 'tester1',
        password: 'test'
      }
    })
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = await page.getByLabel('username')
    const password = await page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester1')
    await password.fill('test')
      
    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()

// Add blog 1
await page.getByRole('button', { name: 'Add blog post' }).click()

await page.locator('#title').fill('Test of blogs 1')
await page.locator('#author').fill('Testter of blogs')
await page.locator('#url').fill('florist.com')

await page.getByRole('button', { name: 'Add post' }).click()

// Wait until blog 1 has actually appeared in the UI
const blog1 = page
  .locator('.blog')
  .filter({ hasText: 'Test of blogs 1' })

await expect(blog1).toBeVisible()

// Add blog 2
await page.getByRole('button', { name: 'Add blog post' }).click()

await page.locator('#title').fill('Test of blogs 2 - The Bloggening')
await page.locator('#author').fill('Testter of blogs')
await page.locator('#url').fill('florist.com')

await page.getByRole('button', { name: 'Add post' }).click()

// Wait until blog 2 has actually appeared
const blog2 = page
  .locator('.blog')
  .filter({ hasText: 'Test of blogs 2 - The Bloggening' })

await expect(blog2).toBeVisible()

// Only now log out
await page.getByRole('button', { name: 'logout' }).click()

// Wait until logout has actually changed the UI
await expect(
  page.getByRole('heading', { name: 'Login' })
).toBeVisible()
    
    await request.post('/api/users', {
      data: {
        name: 'Testi Pate',
        username: 'tester2',
        password: 'test2'
      }
    })
      
    await page.goto('/')
  })
  
  test('user can add blog and it becomes visible in list of blogs',  async({page})=> {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = page.getByLabel('username')
    const password = page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester1')
    await password.fill('test')
      
    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 3: The bloging bugaloo')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()

    const newPost = page.getByText('Test of blogs 3: The bloging bugaloo')
    await expect(newPost).toBeVisible()
  })

test('blogs post can be liked', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = page.getByLabel('username')
    const password = page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester1')
    await password.fill('test')
      
    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()

  await page.getByRole('button', { name: 'Add blog post' }).click()

  await page.locator('#title').fill(
    'Test of blogs 3: The bloging bugaloo'
  )
  await page.locator('#author').fill('Testter of blogs')
  await page.locator('#url').fill('florist.com')

  await page.getByRole('button', { name: 'Add post' }).click()

  const blog = page
    .locator('.blog')
    .filter({
      hasText: 'Test of blogs 3: The bloging bugaloo'
    })

  await expect(blog).toBeVisible()

  await blog.getByRole('button', { name: 'view' }).click()
  await blog.getByRole('button', { name: 'like' }).click()
  await blog.getByRole('button', { name: 'view' }).click()

  await expect(blog.getByText('1')).toBeVisible()
})
    
    test('blogs can be removed and it requires confirm action', async ({page}) => {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = page.getByLabel('username')
    const password = page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester1')
    await password.fill('test')
      
    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()

      await page.getByRole('button',{name:'view'}).first().click()
      await page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button',{name:'remove'}).click()
      await expect(page.getByText('post removed')).toBeVisible()
      })
      
  
  test('only poster of the blog can see remove button', async ({page}) => {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = page.getByLabel('username')
    const password = page.getByLabel('password')
      
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
      
    await username.fill('tester2')
    await password.fill('test2')
      
    await expect(username).toHaveValue('tester2')
    await expect(password).toHaveValue('test2')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()

    await page.getByRole('button',{name:'view'}).first().click()

    expect(page.getByText('remove')).not.toBeAttached()
  })

  test('blog posts are ordered by number of likes', async ({page}) => {
    await expect(
      page.getByRole('heading', { name: 'Login' })
    ).toBeVisible()

    const username = page.getByLabel('username')
    const password = page.getByLabel('password')

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()

    await username.fill('tester1')
    await password.fill('test')

    await expect(username).toHaveValue('tester1')
    await expect(password).toHaveValue('test')

    await page.getByRole('button', { name: 'login' }).click()

    await expect(
      page.getByText('Logged in')
    ).toBeVisible()


    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 3: The bloging bugaloo')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()

    const blogs = page.locator('.blog')

    const blog1 = page
      .locator('.blog')
      .filter({
        hasText: 'Test of blogs 1'
    })

    const blog2 = page
    .locator('.blog')
    .filter({
      hasText: 'Test of blogs 2 - The Bloggening'
    })

    const blog3 = page
      .locator('.blog')
      .filter({
        hasText: 'Test of blogs 3: The bloging bugaloo'
    })




    await expect(blogs.nth(0)).toContainText('Test of blogs')
    await expect(blogs.nth(1)).toContainText('Test of blogs 2 - The Bloggening')
    await expect(blogs.nth(2)).toContainText('Test of blogs 3: The bloging bugaloo')

    await blog3.getByRole('button', { name: 'view' }).click()
    await expect(
    blog3.getByRole('button', { name: 'like' })
    ).toBeVisible()
    await blog3.getByRole('button', { name: 'like' }).click()

    await blog3.getByRole('button', { name: 'view' }).click()
       await expect(
    blog3.getByRole('button', { name: 'like' })
    ).toBeVisible()
    await blog3.getByRole('button', { name: 'like' }).click()
    
    await blog3.getByRole('button', { name: 'view' }).click()
       await expect(
    blog3.getByRole('button', { name: 'like' })
    ).toBeVisible()
    await blog3.getByRole('button', { name: 'like' }).click()
    
    
    await blog2.getByRole('button', { name: 'view' }).click()
       await expect(
    blog2.getByRole('button', { name: 'like' })
    ).toBeVisible()
    await blog2.getByRole('button', { name: 'like' }).click()
    
    /*
    await blog2.getByRole('button', { name: 'view' }).click()
    await expect(blog2.getByRole('button', { name: 'like' })).toBeVisible()
    await blog2.getByRole('button', { name: 'like' }).click()

    await blog2.getByRole('button', { name: 'view' }).click()
    '/
    
    await blog1.getByRole('button', { name: 'view' }).click()
    await expect(
    blog1.getByRole('button', { name: 'like' })
    ).toBeVisible()
    await blog1.getByRole('button', { name: 'like' }).click()
    */
    await expect(blogs.nth(0)).toContainText('Test of blogs 3: The bloging bugaloo')
    await expect(blogs.nth(1)).toContainText('Test of blogs 2 - The Bloggening')
    await expect(blogs.nth(2)).toContainText('Test of blogs')

  })
})