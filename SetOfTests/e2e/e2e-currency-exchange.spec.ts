import { test, expect } from '@playwright/test'
import { HomePage} from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'



test.describe("Currence Exchange Form", () => {
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

    //Purchase Foreign Currency
    test ("Should make currency exchange", async ({ page }) => {
        await page.click('#pay_bills_tab')
        await page.click('text = Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'CAD')

        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 dollar (CAD)')
        
        await page.type('#pc_amount', '5000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('5000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const message = await page.locator('#alert_content')
        await expect(message).toBeVisible
        await expect(message).toContainText('Foreign currency cash was successfully purchased.')
    })
})