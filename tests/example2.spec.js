const{test,expect} = require('@playwright/test')

test('Go to the elsy ticket', async ({page}) => {
  test.setTimeout(60000)
  await page.goto('https://elsytickets.com/')
  await expect(page).toHaveTitle(/Elsy Tickets/)
})

test('click login button', async ({page})=>{
  test.setTimeout(60000)
  await page.goto('https://elsytickets.com/')
  await page.getByRole('link',{name:'Login'}).click()
  await expect (page).toHaveURL('https://elsytickets.com/login')
})

test('click register button', async ({page})=>{
  test.setTimeout(60000)
  await page.goto('https://elsytickets.com/')
  await page.getByRole('link',{name:'Register'}).click()
  await expect (page).toHaveURL('https://elsytickets.com/register')
})

test('event name, date and filter button', async ({page})=>{
  test.setTimeout(60000)
  await page.goto('https://elsytickets.com')
  await page.fill('input[placeholder="Search by event name"]','mother lanaka')
  await page.selectOption('select','All Dates')
  await page.click('button:has-text("Filter")')


// Adjust the selector to match your event card elements
    const eventCards = page.locator('.card-body d-flex flex-column') // Replace with actual selector

    const count = await eventCards.count();
    for (let i = 0; i < count; i++) {
        const card = eventCards.nth(i);

        // Test "View Details" button
        const viewDetailsBtn = card.locator('button:has-text("View Details")');
        await viewDetailsBtn.waitFor({ state: 'visible', timeout: 15000 });
        await expect(viewDetailsBtn).toBeVisible();
        await expect(viewDetailsBtn).toBeEnabled();
        await viewDetailsBtn.click();
        await page.waitForTimeout(500); // Adjust as needed
        await page.goBack();

        // Test "Quick Checkout" button
        const quickCheckoutBtn = card.locator('button:has-text("Quick Checkout")');
        await expect(quickCheckoutBtn).toBeVisible();
        await expect(quickCheckoutBtn).toBeEnabled();
        await quickCheckoutBtn.click();
        await page.waitForTimeout(500); // Adjust as needed
        await page.goBack();
  }


})

 

