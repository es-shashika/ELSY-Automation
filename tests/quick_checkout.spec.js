const {test, expect} = require('@playwright/test');

test('quick checkout process', async ({page}) => {
  test.setTimeout(60000)
  await page.goto('http://18.202.241.47/event/automation-event--2026-01-10_11-30-00/quick-checkout')
  await expect(page).toHaveTitle(/Event Booking System/);

  await page.fill('input[type="text"]', 'shashika')
  await page.fill('input[type="email"]', 'shashika@elsysolutions.com')
  await page.fill('input[type="tel"]', '947767890')


  const beforeAvailableSeats = page.locator('#available-seats-count-display')
  await expect(beforeAvailableSeats).toBeVisible()
  const seatsText = await beforeAvailableSeats.textContent()  // Get the text content
  const seatsBefore = parseInt(seatsText.trim(), 10) // Convert to integer

  await page.getByRole('button', { name: 'G2' }).click()
  await page.getByRole('button', { name: 'Adult' }).click()

  const time = page.locator('.timer-content').nth(0) 
  await expect(time).toBeVisible()
  await expect(time).toContainText('10:00')

  // await page.getByRole('button', { name: 'D2' }).click()
  // await page.getByRole('button', { name: 'Child' }).click()

  const afterAvailableSeats = page.locator('#available-seats-count-display')
  await expect(afterAvailableSeats).toBeVisible()
  const afterSeatsText = await afterAvailableSeats.textContent()  // Get the text content
  const availableSeats = parseInt(afterSeatsText.trim(), 10) // Convert to integer
  expect(availableSeats).toBe(seatsBefore - 1) // Verify one less seat available

  const subtotal = page.locator('#orderSubtotal')
  await expect(subtotal).toBeVisible()
  await expect(subtotal).toHaveText('$35.00')  // $55.00

  const platformFee = page.locator('#platformFee')
  await expect(platformFee).toBeVisible()
  await expect(platformFee).toHaveText('$1.75') // $3.50

  const stripeFee = page.locator('#stripeFee')
  await expect(stripeFee).toBeVisible()
  await expect(stripeFee).toHaveText('$1.41') // $2.06

  const total = page.locator('#orderTotal') // Id (#)
  await expect(total).toBeVisible()
  await expect(total).toHaveText('$38.16') // $60.56

  await page.getByRole('button', { name: 'Complete Purchase -' }).click()
  await expect(page).toHaveURL(/https:\/\/checkout\.stripe\.com\/c\/pay/)
  test.setTimeout(60000)

  const currency = page.locator('.CurrencyAmount').nth(1) //class name (.)
  await currency.waitFor({ state: 'visible', timeout: 60000 }); // wait up to 60s
  await expect(currency).toBeVisible()
  await expect(currency).toHaveText('$38.16')


  await page.fill('input[name="email"]', 'shashika@elsysolutions.com') 
  await page.fill('input[name="cardNumber"]', '4242 4242 4242 4242')
  await page.fill('input[name="cardExpiry"]', '12/34')
  await page.fill('input[name="cardCvc"]', '123')
  await page.fill('input[name="billingName"]', 'shashi')

  await page.getByRole('button', { name: 'Pay' }).click()
  test.setTimeout(60000)

  await page.waitForURL(/quick-checkout\/success/, { timeout: 120000 })
  await expect(page).toHaveURL(/quick-checkout\/success/)


  await expect(page.getByText('Payment Successful! Your order has been completed. Thank you!')).toBeVisible({ timeout: 60000 })
  await expect(page.getByText('Event: Automation Test Event Date: Jan 10, 2026 11:30 Venue: Cinema Paradiso Hollywood, Florida')).toBeVisible({ timeout: 60000 })


  const [pdf] = await Promise.all([page.waitForEvent('download'),page.getByRole('link', { name: 'Download PDF' }).nth(1).click(),]) // Click triggers a new tab
  
  //pdf save in the local folder
  const path = await pdf.path();  // Get the path of downloaded file
  const fileName = pdf.suggestedFilename(); // Get the suggested file name
  console.log(`Downloaded file name: ${fileName}`);
  test.setTimeout(60000)

  // Optional - Save PDF to your folder
  await pdf.saveAs(`./downloads/${fileName}`);
  console.log(`File saved to ./downloads/${fileName}`);

})