const {test, expect} = require('@playwright/test')

test('view details page', async ({page})=>{
  test.setTimeout(60000)
  await page.goto('http://18.202.241.47/event/automation-event--2026-01-10_11-30-00')
  await expect(page).toHaveTitle(/Automation Test Event - Florida | Elsy Tickets/)

  const eventText = page.getByText('Automation Test Event Cinema Paradiso Hollywood, Florida Jan 10, 2026 11:30 11:30 AM')
  await expect(eventText).toBeVisible()

  await page.getByRole('link',{name:'Quick Checkout'}).nth(0).click()
  await expect(page).toHaveURL('http://18.202.241.47/event/automation-event--2026-01-10_11-30-00/quick-checkout')
  await page.goBack()

  await page.getByRole('link',{name:'Quick Checkout'}).nth(1).click()
  await expect(page).toHaveURL('http://18.202.241.47/event/automation-event--2026-01-10_11-30-00/quick-checkout')
  await page.goBack()


  await page.getByRole('link', { name: 'Login' }).nth(0).click(); // click first match
  await expect (page).toHaveURL('http://18.202.241.47/login')
  await page.goBack()
  
  await page.getByRole('link', { name: 'Login' }).nth(1).click(); // click 2nd match
  await expect (page).toHaveURL('http://18.202.241.47/login')
  await page.goBack()

  await page.getByRole('link', { name: 'Login' }).nth(2).click(); // click 3rd match
  await expect (page).toHaveURL('http://18.202.241.47/login')
  await page.goBack()

  const eventDetails = page.getByText(" Event Details Venue Cinema Paradiso Hollywood 2008 Hollywood Blvd, Hollywood, Florida, Florida, Florida Start Date & Time Saturday, January 10, 2026 11:30 AM End Date & Time Saturday, January 10, 2026 5:30 PM Description Automation Event don't delete this event")
  await expect(eventDetails).toBeVisible()

  await page.getByRole('button', { name: 'Add to Calendar' }).click();
  const [calendar] = await Promise.all([page.waitForEvent('popup'),page.getByRole('button', { name: 'Add to Calendar' }).click(),]); // Click triggers a new tab
  await calendar.waitForLoadState();
  await expect(calendar).toHaveURL(/workspace\.google\.com/, { timeout: 120000 });
  await page.bringToFront(); // Switch back to original page
  

  
  await page.getByRole('link', { name: 'Get Directions' }).click();
  const [newPage] = await Promise.all([page.waitForEvent('popup'),page.getByRole('link', { name: 'Get Directions' }).click(),]); // Click triggers a new tab
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/google\.com\/maps/, { timeout: 120000 });
  await page.bringToFront(); // Switch back to original page

})