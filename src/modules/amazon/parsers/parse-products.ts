import { Product } from '@/common/models/product';
import { HtmlParser } from '@/common/services/html-parser';

const SearchPageSelectors = {
    PRODUCT_CARD: '[data-component-type="s-search-result"]',
};
const ProductCardSelectors = {
    ROOT: 'div',
    LINK: 'h2 a',
    PRICE: '.a-price .a-offscreen',
};

export function parseProducts(html: string, searchTerm: string): Product[] {
    return new HtmlParser(html)
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
    })
    .filter(product => !!product.price);
}
