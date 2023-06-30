import { Product } from '@/common/models/product';
import { crawlSearchResultsPageInteractively } from './crawlers/crawl-search-results';
import { parseProducts } from './parsers/parse-products';

export async function getProducts(searchTerm: string, amount: number): Promise<Product[]> {
    const resultsPageHtml = await crawlSearchResultsPageInteractively(searchTerm);
    const products = parseProducts(resultsPageHtml, searchTerm);
    return products.slice(0, amount);
}
