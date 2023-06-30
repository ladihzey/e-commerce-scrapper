import { Product } from '@/common/models/product';
import { HtmlParser } from '@/common/services/html-parser';

const ProductCardSelectors = {
    ROOT: 'div',
    LINK: 'h2 a',
    PRICE: '.a-price .a-offscreen',
};

export function parseProductCard(html: string) {
    const parser = new  HtmlParser(html);

    const id = parser.getElementAttribute(ProductCardSelectors.ROOT, 'data-asin');
    const title = parser.getElementText(ProductCardSelectors.LINK);
    const uri = parser.getElementAttribute(ProductCardSelectors.LINK, 'href');
    const priceText = parser.getElementText(ProductCardSelectors.PRICE);

    return {
        id,
        title,
        uri,
        priceText,
    };
}
