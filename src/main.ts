import playwright from "playwright";

const browser = await playwright["chromium"].launch({
    headless: false,
});
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://amazon.com");
await page.waitForTimeout(1000);
await browser.close();
