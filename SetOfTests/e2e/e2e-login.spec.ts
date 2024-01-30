import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only("Login / Logout flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage

    //Before Hook
    test.beforeEach(async({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })

    //Negative scenario
    test ("Negative scenario for Login", async({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login("invalid username", "invalid password")
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    //Positive scenario + Logout
    test("Positive scenario for Login + Logout", async ({page}) => {
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")

        //Additional steps due to errors message
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.goto('http://zero.webappsecurity.com/online-banking.html')
        await page.click('#account_summary_link')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect (accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
