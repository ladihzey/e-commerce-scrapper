import { priceParser } from '@/common/parsers/price-parser';
import { Product } from '@/app/product';
import { Module } from '@/app/module';
import { crawlSearchResultsPageInteractively } from './crawlers/crawl-search-results';
import { parseProductCardHtmls } from './parsers/parse-results-page';
import { parseProductCard } from './parsers/parse-product-card';

class AmazonModule implements Module {
    readonly name = 'amazon';

    async getProducts(searchTerm: string): Promise<Product[]> {
        const resultsPageHtml = await crawlSearchResultsPageInteractively(searchTerm);
        const productCardHtmls = parseProductCardHtmls(resultsPageHtml);
        const products = productCardHtmls
            .map(parseProductCard)
            .map(({
                id,
                priceText,
                title,
                uri,
            }) => {
                const url = uri ? `https://www.amazon.com${uri}` : null;
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

export const amazon = new AmazonModule();
