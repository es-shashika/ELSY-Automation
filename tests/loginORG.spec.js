const {test, expect} = require('@playwright/test')

test('Login as Organizer and create event', async ({page})=>{
    test.setTimeout(60000)
    await page.goto('http://18.202.241.47/login')

    await page.fill('input[type="email"]','organizer@event2.com')
    await page.fill('input[type="password"]','password')
    await page.click('button:has-text("Login")')
    await expect (page).toHaveURL('http://18.202.241.47/')

    await page.getByRole('link',{name:' Create Event'}).click()
    await expect (page).toHaveURL('http://18.202.241.47/organizer/events/create')

    await page.fill('input[name="title"]','Automated Test Event')
    
    await page.locator('p[contenteditable="true"]').click(); // focus first
    await page.keyboard.type('This is an automated event created by Playwright');
    
    await page.fill('input[name="start_date"]','2026-03-01T16:00')
    await page.fill('input[name="end_date"]','2026-03-01T23:00')
    await page.fill('input[name="ticket_selling_start"]','2026-01-11T23:00')
    await page.fill('input[name="ticket_selling_end"]','2026-02-01T23:00')
    await page.fill('input[name="venue_name"]','Automated Venue')
    await page.fill('input[name="venue_address"]','123 Automation St, Test City, TC 12345')
    await page.fill('input[name="venue_city"]','Test City')
    await page.fill('input[name="venue_state"]','Test State')
    await page.fill('input[name="venue_zip_code"]','1000')
    await page.fill('input[name="venue_country"]','Test Country')




})