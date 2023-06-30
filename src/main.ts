import playwright from 'playwright';
import inquirer from 'inquirer';
import * as cheerio from 'cheerio';

const { searchTerm } = await inquirer.prompt([{
    type: "input",
    name: "searchTerm",
    message: "What are you looking for?",
}]);

const searchTermURI = encodeURIComponent(searchTerm);
const searchPageURL = `https://www.amazon.com/s?k=${searchTermURI}&s=price-asc-rank`;

// Initializing playwright
const browser = await playwright["chromium"].launch({
    headless: false,
});
const context = await browser.newContext();

// Navigate to search page
const searchPage = await context.newPage();
await searchPage.goto(searchPageURL);
await searchPage.waitForLoadState('networkidle');

// Scrape target products
const SearchPageSelectors = {
    PRODUCT_CARD: '[data-component-type="s-search-result"]',
};
const ProductCardSelectors = {
    LINK: 'h2 a',
    PRICE: '.a-price .a-offscreen',
};
const searchPageHTML = await searchPage.content();

const dom = cheerio.load(searchPageHTML);
const products = dom(SearchPageSelectors.PRODUCT_CARD)
    .toArray()
    .map(el => {
        const cardHTML = dom.html(el);
        const elDom = cheerio.load(cardHTML);
        const linkEl = elDom(ProductCardSelectors.LINK).first();
        const priceEl = elDom(ProductCardSelectors.PRICE).first();

        const title = linkEl.text();
        const priceMatch = priceEl.text().match(/(\$)(\d+\.\d+)/);
        const currency = priceMatch?.[1] ?? '';
        const price = parseFloat(priceMatch?.[2] ?? '');
        const url = `https://amazon.com${linkEl.attr('href')}`;

        return {
            platform: 'amazon',
            platformId: '',
            searchTerm,
            title,
            currency,
            price,
            url,
        };
    });
console.dir(products);

// Close resources
await browser.close();
