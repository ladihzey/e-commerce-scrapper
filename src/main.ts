import playwright from "playwright";
import inquirer from "inquirer";

const { searchTerm } = await inquirer.prompt([{
    type: "input",
    name: "searchTerm",
    message: "What are you looking for?",
}]);

console.log(searchTerm);

const browser = await playwright["chromium"].launch({
    headless: false,
});
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://amazon.com");
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);
await browser.close();
