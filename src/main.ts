import 'module-alias/register';

import { Product } from '@/common/models/product';
import { HtmlParser } from '@/common/services/html-parser';
import { csvStorage } from '@/common/services/csv-storage';
import { cliPrompt } from '@/common/services/cli-prompt';
import { browser } from '@/common/services/browser';

(async function() {
    const searchTerm = await cliPrompt.askQuestion('What are you looking for?');
    if (!searchTerm) return;

    const searchTermUri = encodeURIComponent(searchTerm);
    const searchPageUrl = `https://www.amazon.com/s?k=${searchTermUri}&s=price-asc-rank`;
    const searchPageHtml = await browser.getPageHtml(searchPageUrl);

    const SearchPageSelectors = {
        PRODUCT_CARD: '[data-component-type="s-search-result"]',
    };
    const ProductCardSelectors = {
        ROOT: 'div',
        LINK: 'h2 a',
        PRICE: '.a-price .a-offscreen',
    };

    const products = new HtmlParser(searchPageHtml)
        .parseElements(SearchPageSelectors.PRODUCT_CARD)
        .map(html => {
            const id = html.getElementAttribute(ProductCardSelectors.ROOT, 'data-asin');
            const title = html.getElementText(ProductCardSelectors.LINK);

            const uri = html.getElementAttribute(ProductCardSelectors.LINK, 'href');
            const url = uri ? `https://amazon.com${uri}` : null;

            const priceText = html.getElementText(ProductCardSelectors.PRICE);
            const priceMatch = priceText?.match(/(\$)(\d+\.\d+)/);
            const currency = priceMatch?.[1];
            const price = parseFloat(priceMatch?.[2] ?? '');

            return new Product(
                'amazon',
                id ?? '',
                searchTerm,
                title ?? '',
                currency ?? '',
                price,
                url ?? '',
            );
        });

    await csvStorage.saveData(products);

    // Close resources
    await browser.close();
})();
