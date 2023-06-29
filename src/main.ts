import playwright from "playwright";
import inquirer from "inquirer";

const { searchTerm } = await inquirer.prompt([{
    type: "input",
    name: "searchTerm",
    message: "What are you looking for?",
}]);

const searchTermURI = encodeURIComponent(searchTerm);
const searchPageURL = `https://www.amazon.com/s?k=${searchTermURI}&s=price-asc-rank`;

const browser = await playwright["chromium"].launch({
    headless: false,
});
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(searchPageURL);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);
await browser.close();
