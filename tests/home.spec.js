const { test, expect } = require('@playwright/test')

test('home page', async ({ page }) => {
    test.setTimeout(60000)
    await page.goto('http://18.202.241.47/')
    await expect(page).toHaveTitle(/Event Booking System/)

    await page.getByRole('link',{name:'Login'}).click()
    await expect (page).toHaveURL('http://18.202.241.47/login')
    await page.goBack()
    
    await page.getByRole('link',{name:'Register'}).click()
    await expect (page).toHaveURL('http://18.202.241.47/register')
    await page.goBack()

    await page.fill('input[placeholder="Search by event name"]','Mother Lanka')
    await page.selectOption('select','All Dates')
    await page.click('button:has-text("Filter")')
    await page.getByRole('link',{name:'Event Booking System'}).click()
    await expect (page).toHaveURL('http://18.202.241.47/')

    
   await page.click('text=View Details')
   await expect(page).toHaveURL(/http:\/\/18\.202\.241\.47\/event\/.+/)
   await page.goBack()

   await page.click('text=Quick Checkout')
   await expect(page).toHaveURL(/http:\/\/18\.202\.241\.47\/event\/.+\/quick-checkout/)
   await page.goBack()

   await page.click('text=About Us')
   await expect(page).toHaveURL('http://18.202.241.47/about')
   await page.goBack()

   await page.click('text=Features')
   await expect(page).toHaveURL('http://18.202.241.47/features')
   await page.goBack()

   await page.click('text=Contact')
   await expect(page).toHaveURL('http://18.202.241.47/contact')
   await page.goBack()

   await page.click('text=Privacy Policy')
   await expect(page).toHaveURL('http://18.202.241.47/privacy-policy')
   await page.goBack()

   await page.click('text=Terms of Service')
   await expect(page).toHaveURL('http://18.202.241.47/terms-of-service')
   await page.goBack()

   // await page.click('text=Elsy Solutions')
   // await expect(page).toHaveURL('https://elsysolutions.com/')
   // await page.goBack()

   const fbIcon = page.locator('a[href*="facebook.com"]')
   await expect(fbIcon).toBeVisible()
   const [fbPage] = await Promise.all([page.waitForEvent('popup'), fbIcon.click(),]);  // Open link in new tab
   await expect(fbPage).toHaveURL(/facebook\.com/)
   await page.bringToFront()  // Switch back to original page

   const instaIcon = page.locator('a[href*="instagram.com"]')
   await expect(instaIcon).toBeVisible()
   const [instaPage] = await Promise.all([page.waitForEvent('popup'), instaIcon.click(),]);  // Open link in new tab
   await expect(instaPage).toHaveURL(/instagram\.com/)
   await page.bringToFront()  // Switch back to original page

   const xIcon = page.locator('a[href*="x.com"]')
   await expect(xIcon).toBeVisible()
   const [xPage] = await Promise.all([page.waitForEvent('popup'), xIcon.click(),]);  // Open link in new tab
   await expect(xPage).toHaveURL(/x\.com/)
   await page.bringToFront()  // Switch back to original page

   const linkedinIcon = page.locator('a[href*="linkedin.com"]')
   await expect(linkedinIcon).toBeVisible()
   const [linkedinPage] = await Promise.all([page.waitForEvent('popup'), linkedinIcon.click(),]);  // Open link in new tab
   await expect(linkedinPage).toHaveURL(/linkedin\.com/)
   await page.bringToFront()  // Switch back to original page



})