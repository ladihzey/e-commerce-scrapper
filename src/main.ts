import 'module-alias/register';

import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';
import { Product } from '@/common/models/product';
import { csvStorage } from '@/common/services/csv-storage';
import { cliPrompt } from '@/common/services/cli-prompt';

chromium.use(stealthPlugin());

(async function() {
    const searchTerm = await cliPrompt.askQuestion('What are you looking for?');
    if (!searchTerm) return;

    const searchTermUri = encodeURIComponent(searchTerm);
    const searchPageUrl = `https://www.amazon.com/s?k=${searchTermUri}&s=price-asc-rank`;

    // Initializing playwright
    const browser = await chromium.launch({
        headless: true,
    });
    const context = await browser.newContext();

    // Navigate to search page
    const searchPage = await context.newPage();
    await searchPage.goto(searchPageUrl);
    await searchPage.waitForLoadState('networkidle');

    // Scrape target products
    const SearchPageSelectors = {
        PRODUCT_CARD: '[data-component-type="s-search-result"]',
    };
    const ProductCardSelectors = {
        ROOT: 'div',
        LINK: 'h2 a',
        PRICE: '.a-price .a-offscreen',
    };
    const searchPageHtml = await searchPage.content();

    const dom = cheerio.load(searchPageHtml);
    const products = dom(SearchPageSelectors.PRODUCT_CARD)
        .toArray()
        .map(el => {
            const cardHtml = dom.html(el);
            const elDom = cheerio.load(cardHtml);
            const rootEl = elDom(ProductCardSelectors.ROOT).first();
            const linkEl = elDom(ProductCardSelectors.LINK).first();
            const priceEl = elDom(ProductCardSelectors.PRICE).first();

            const id = rootEl.attr('data-asin') ?? '';
            const title = linkEl.text();
            const priceMatch = priceEl.text().match(/(\$)(\d+\.\d+)/);
            const currency = priceMatch?.[1] ?? '';
            const price = parseFloat(priceMatch?.[2] ?? '');
            const url = `https://amazon.com${linkEl.attr('href')}`;

            return new Product(
                'amazon',
                id,
                searchTerm,
                title,
                currency,
                price,
                url,
            );
        });

    await csvStorage.saveData(products);

    // Close resources
    await browser.close();
})();
