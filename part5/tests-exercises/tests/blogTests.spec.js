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
  })
  test('user can add blog and it becomes visible in list of blogs',  async({page})=> {
    await page.getByRole('textbox').first().fill('tester1')
    await page.getByRole('textbox').last().fill('test')
    await page.getByRole('button', {name:'login'}).click()
    await page.getByRole('button', {name:'Add blog post'}).click()
    await page.locator('#title').fill('Test of blogs')
    await page.locator('#author').fill('Testter of blogs')
    await page.locator('#url').fill('florist.com')
    await page.getByRole('button', {name:'Add post'}).click()

    const newPost = page.getByText('Test of blogs')
    await expect(newPost).toBeVisible()
  })


})