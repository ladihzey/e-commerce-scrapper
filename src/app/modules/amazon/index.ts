import { Product } from '@/app/product';
import { Module } from '@/app/module';
import { crawlSearchResultsPageInteractively } from './crawlers/crawl-search-results';
import { parseProductCardHtmls } from './parsers/parse-results-page';
import { parseProductCard } from './parsers/parse-product-card';

class AmazonModule implements Module {
    readonly name = 'amazon';

    async getProducts(searchTerm: string, amount: number): Promise<Product[]> {
        const resultsPageHtml = await crawlSearchResultsPageInteractively(searchTerm);
        const productCardHtmls = parseProductCardHtmls(resultsPageHtml);
        const products = productCardHtmls
            .map(html => parseProductCard(html))
            .map(({
                id,
                priceText,
                title,
                uri,
            }) => {
                const url = uri ? `https://amazon.com${uri}` : null;
                const priceMatch = priceText?.match(/(\$)(\d+\.\d+)/);
                const currency = priceMatch?.[1];
                const price = parseFloat(priceMatch?.[2] ?? '');

                return new Product(
                    this.name,
                    id ?? '',
                    searchTerm,
                    title ?? '',
                    currency ?? '',
                    price,
                    url ?? '',
                );
            })
            .filter(product => !!product.price);

        return products.slice(0, amount);
    }
}

export const amazon = new AmazonModule();
