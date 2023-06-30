import { priceParser } from '@/common/parsers/price-parser';
import { Product } from '@/app/product';
import { Module } from '@/app/module';
import { crawlSearchResultsPage } from './crawlers/crawl-search-results';
import { parseProductCardHtmls } from './parsers/parse-results-page';
import { parseProductCard } from './parsers/parse-product-card';

class EbayModule implements Module {
    readonly name = 'ebay';

    async getProducts(searchTerm: string): Promise<Product[]> {
        const resultsPageHtml = await crawlSearchResultsPage(searchTerm);
        const productCardHtmls = parseProductCardHtmls(resultsPageHtml);
        const products = productCardHtmls
            .map(parseProductCard)
            .map(({
                id,
                priceText,
                title,
                url,
            }) => {
                const { currency, price } = priceParser.parse(priceText ?? '');

                return new Product(
                    this.name,
                    id,
                    searchTerm,
                    title,
                    currency,
                    price,
                    url,
                );
            })
            .filter(product => !!product.price);

        return products;
    }
}

export const ebay = new EbayModule();
