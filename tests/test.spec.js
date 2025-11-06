const {test, expect} = require('@playwright/test')


test('quick checkout process', async ({page}) => {
  test.setTimeout(60000);
  await page.goto('http://18.202.241.47/event/mother-lanka--2025-11-08_14-15-00/quick-checkout')
  await expect(page).toHaveTitle(/Event Booking System/);

  await page.fill('input[type="text"]', 'shashika')
  await page.fill('input[type="email"]', 'shashika@elsysolutions.com')
  await page.fill('input[type="tel"]', '947767890')

  const beforeAvailableSeats = page.locator('#available-seats-count-display')
  await expect(beforeAvailableSeats).toBeVisible()
  const seatsText = await beforeAvailableSeats.textContent()  // Get the text content
  const seatsBefore = parseInt(seatsText.trim(), 10) // Convert to integer


  await page.getByRole('button', { name: 'J1' }).click()
  await page.getByRole('button', { name: 'Adult' }).click()

  await page.getByRole('button', { name: 'J2' }).click()
  await page.getByRole('button', { name: 'Child' }).click()

  const afterAvailableSeats = page.locator('#available-seats-count-display')
  await expect(afterAvailableSeats).toBeVisible()
  const afterSeatsText = await afterAvailableSeats.textContent()  // Get the text content
  const availableSeats = parseInt(afterSeatsText.trim(), 10) // Convert to integer
  expect(availableSeats).toBe(seatsBefore - 2) // Verify one less seat available

  const subtotal = page.locator('#orderSubtotal')
  await expect(subtotal).toBeVisible()
  await expect(subtotal).toHaveText('$55.00')

  const platformFee = page.locator('#platformFee')
  await expect(platformFee).toBeVisible()
  await expect(platformFee).toHaveText('$3.50')

  const stripeFee = page.locator('#stripeFee')
  await expect(stripeFee).toBeVisible()
  await expect(stripeFee).toHaveText('$2.06')

  const total = page.locator('#orderTotal') // Id (#)
  await expect(total).toBeVisible()
  await expect(total).toHaveText('$60.56')


  

  await page.getByRole('button', { name: 'Complete Purchase -' }).click()
  await expect(page).toHaveURL(/https:\/\/checkout\.stripe\.com\/c\/pay/)


})

