import { chromium } from 'playwright'
import fs from 'node:fs'

fs.mkdirSync('output/playwright', { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })
const consoleErrors = []

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})

await page.goto('http://127.0.0.1:6207', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'output/playwright/desktop-home.png', fullPage: false })

await page.locator('.question-dial').click()
await page.waitForTimeout(350)
const dialQuestion = await page.locator('#dialQuestion').innerText()

await page.locator('#topics').scrollIntoViewIfNeeded()
await page.waitForTimeout(250)
await page.screenshot({ path: 'output/playwright/topics.png', fullPage: false })

await page.locator('#salon').scrollIntoViewIfNeeded()
await page.waitForTimeout(250)
await page.screenshot({ path: 'output/playwright/salon.png', fullPage: false })

await page.locator('a[href="#/essays"]').first().click()
await page.waitForTimeout(350)
const routeTitle = await page.locator('.route-page.is-active h1').innerText()
await page.screenshot({ path: 'output/playwright/route-essays.png', fullPage: false })
await page.locator('.route-page.is-active .route-back').click()

await page.getByRole('button', { name: 'dark' }).click()
await page.waitForTimeout(300)
await page.screenshot({ path: 'output/playwright/dark-home.png', fullPage: false })

await page.locator('#letter').scrollIntoViewIfNeeded()
await page.getByLabel('email for the adda').fill('reader@example.com')
await page.getByRole('button', { name: 'pause with us' }).click()
const formState = await page.locator('.form-state').innerText()
const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

await page.setViewportSize({ width: 390, height: 900 })
await page.goto('http://127.0.0.1:6207', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'output/playwright/mobile-home.png', fullPage: false })
const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

await browser.close()

console.log(
  JSON.stringify(
    {
      dialQuestion,
      routeTitle,
      formState,
      desktopOverflow,
      mobileOverflow,
      consoleErrors,
    },
    null,
    2,
  ),
)
