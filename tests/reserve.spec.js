const {test, expect} = require('@playwright/test')

test('Reserve seats process', async ({page}) => {
  test.setTimeout(60000)
  await page.goto('http://18.202.241.47/login')
  await page.fill('input[type="email"]','organizer@event2.com')
  await page.fill('input[type="password"]','password')
  await page.click('button:has-text("Login")')
  await expect (page).toHaveURL('http://18.202.241.47/')

  await page.getByRole('link',{name:'My Events'}).click()
  await expect (page).toHaveURL('http://18.202.241.47/organizer/events')

  const eventCard = page.locator('.card', { hasText: 'Automation Test Event' }) 
  await eventCard.getByRole('link', { name: 'Reserve' }).click();
  await expect (page).toHaveURL('http://18.202.241.47/organizer/events/35/tickets/reserve')
  
  await page.waitForSelector('select[name="ticket_type_id"]')
  await page.selectOption('select[name="ticket_type_id"]', '40')
  
  await page.fill('input[name="attendee_name"]','shashika')
  await page.fill('input[type="email"]','shashika@elsysolutions.com')
  await page.fill('input[name="attendee_phone"]','947767890')

  await page.getByRole('button', { name: 'View Available Seats' }).click()

  await page.waitForSelector('button[data-table-name="A"][data-seat-number="1"]', { timeout: 20000 })
  await page.click('button[data-table-name="A"][data-seat-number="1"]')
  
  await page.getByRole('button', { name: 'Adult' }).click()

  await page.fill('input[name="reserved_until"]','2025-11-30T16:00')

  const subTotal = page.locator('#reserveSubtotal')
  await expect(subTotal).toBeVisible()
  await expect(subTotal).toHaveText('$35.00')  // $55.00

  const platFee = page.locator('#reservePlatformFee')
  await expect(platFee).toBeVisible()
  await expect(platFee).toHaveText('$1.75') // $3.50

  const total = page.locator('#reserveTotal')
  await expect(total).toBeVisible()
  await expect(total).toHaveText('$36.75') // $

  await page.getByRole('button', { name: 'Reserve Tickets' }).click()

  await expect(page.getByText('Successfully reserved 1 ticket(s) for shashika. Emails have been sent to the attendee.')).toBeVisible({ timeout: 30000 })
  await expect(page.getByText('shashika Blocked shashika@elsysolutions.com')).toBeVisible({ timeout: 30000 })




})