import { HtmlParser } from '@/common/parsers/html-parser';

const ProductCardSelectors = {
    ROOT: 'li',
    PRICE: '.s-item__price',
    LINK: '.s-item__link',
    TITLE: '.s-item__title',
};

export function parseProductCard(html: string) {
    const parser = new  HtmlParser(html);

    const id = parser.getElementAttribute(ProductCardSelectors.ROOT, 'id');
    const title = parser.getElementText(ProductCardSelectors.TITLE);
    const url = parser.getElementAttribute(ProductCardSelectors.LINK, 'href');
    const priceText = parser.getElementText(ProductCardSelectors.PRICE);

    return {
        id,
        title,
        url,
        priceText,
    };
}
