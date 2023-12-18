import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'


test.describe("Search Results", () => {
    test ("Should find search result", async ({page}) => {
        let homePage: HomePage = new HomePage(page)

        //await page.goto ('http://zero.webappsecurity.com/index.html')
        // await page.type('#searchTerm', "bank")
        // await page.keyboard.press("Enter")
        
        await homePage.visit()
        await homePage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
        
        //Negative case with "vdjd" value
        //const noResult = await page.locator('h2')
        //await expect (noResult).toContainText("Search Results:")
    })
})