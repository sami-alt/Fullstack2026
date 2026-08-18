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
    const heading = page.getByRole('heading', {name:'Login'})
    await expect(heading).toBeVisible()
  })
  
  test('succeeds with correct credentials', async ({ page }) => {
    await page.getByRole('textbox').first().fill('tester1')
    await page.getByRole('textbox').last().fill('test')
    await page.getByRole('button', {name:'login'}).click()

    const leggedInMessage = page.getByText('Logged in')
    await expect(leggedInMessage).toBeVisible()
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
    await page.getByRole('textbox').first().fill('tester1')
    await page.getByRole('textbox').last().fill('test')
    await page.getByRole('button', {name:'login'}).click()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 2 - The Bloggening')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()
    await page.getByRole('button', {name:'logout'}).click()
    
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
    await page.getByRole('textbox').first().fill('tester1')
    await page.getByRole('textbox').last().fill('test')
    await page.getByRole('button', {name:'login'}).click()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 3: The bloging bugaloo')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()

    const newPost = page.getByText('Test of blogs 2')
    await expect(newPost).toBeVisible()
  })

  test('blogs post can be liked', async({page}) => {
    await page.getByRole('textbox').first().fill('tester1')
    await page.getByRole('textbox').last().fill('test')
    await page.getByRole('button', {name:'login'}).click()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 3: The bloging bugaloo')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()
    await page.getByRole('button',{name:'view'}).first().click()
    await page.getByRole('button',{name:'like'}).click()
    await page.getByRole('button',{name:'view'}).first().click()
    
    const likes = await page.getByText('1')
    await expect(likes).toHaveText('1')
    })
    
    test('blogs can be removed and it requires confirm action', async ({page}) => {
      await page.getByRole('textbox').first().fill('tester1')
      await page.getByRole('textbox').last().fill('test')
      await page.getByRole('button', {name:'login'}).click()
      await page.getByRole('button',{name:'view'}).first().click()
      await page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button',{name:'remove'}).click()
      await expect(page.getByText('post removed')).toBeVisible()
      })
      
  
  test('only poster of the blog cn see remove button', async ({page}) => {
    await page.getByRole('textbox').first().fill('tester2')
    await page.getByRole('textbox').last().fill('test2')
    await page.getByRole('button', {name:'login'}).click()

    await page.getByRole('button',{name:'view'}).first().click()

    expect(page.getByText('remove')).not.toBeAttached()
  })

  test('blog posts are ordered by number of likes', async ({page}) => {
    await page.getByRole('textbox').first().fill('tester2')
    await page.getByRole('textbox').last().fill('test2')
    await page.getByRole('button', {name:'login'}).click()


    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs 3: The bloging bugaloo')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()

    const blogs = page.locator('.blog')

    expect(blogs.nth(0)).toContainText('Test of blogs')
    expect(blogs.nth(1)).toContainText('Test of blogs 2 - The Bloggening')
    expect(blogs.nth(2)).toContainText('Test of blogs 3: The bloging bugaloo')

    await page.getByRole('button',{name:'view'}).nth(2).click()
    await page.getByRole('button',{name:'like'}).click()

    await page.getByRole('button',{name:'view'}).nth(0).click()
    await page.getByRole('button',{name:'like'}).click()

    await page.getByRole('button',{name:'view'}).nth(0).click()
    await page.getByRole('button',{name:'like'}).click()

    
    await page.getByRole('button',{name:'view'}).nth(2).click()
    await page.getByRole('button',{name:'like'}).click()

    await page.getByRole('button',{name:'view'}).nth(1).click()
    await page.getByRole('button',{name:'like'}).click()

    await page.getByRole('button',{name:'view'}).nth(1).click()
    await page.getByRole('button',{name:'like'}).click()
    
    expect(blogs.nth(0)).toContainText('Test of blogs 3: The bloging bugaloo')
    expect(blogs.nth(1)).toContainText('Test of blogs 2 - The Bloggening')
    expect(blogs.nth(2)).toContainText('Test of blogs')

  })
})