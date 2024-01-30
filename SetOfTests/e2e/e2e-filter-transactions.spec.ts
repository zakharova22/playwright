import {test, expect} from '@playwright/test'
import { HomePage} from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe ("Filter transactions", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    //Login
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        homePage.visit()
        homePage.clickOnSignIn()
        loginPage.login('username', 'password')
    })

    test ("Verify the result for each account", async ({ page }) => {
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')

        const checkhingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkhingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')
        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')
        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
    })
})