const {test, expect} = require('@playwright/test')

test('delete seat from DB', async ({page})=>{
    test.setTimeout(60000)
    
    const seatIdToDelete = 123; 
    const deleted = await page.goto(`http://`)

    expect(deleted.ok()).toBeTruthy()
    const result = await response.json()

    console.log('Deleted seat:', result)

})