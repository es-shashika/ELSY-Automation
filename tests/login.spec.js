const {test, expect} = require('@playwright/test')

test('login page as attendee', async ({page}) => {
  test.setTimeout(60000)
  await page.goto('http://18.202.241.47/login')
  await expect(page).toHaveTitle(/Event Booking System/)

  await page.fill('input[type="email"]','attendee@event2.com')
  await page.fill('input[type="password"]','password')
  await page.click('button:has-text("Login")')
  await expect (page).toHaveURL('http://18.202.241.47/')
  await page.goto('http://18.202.241.47/')



})