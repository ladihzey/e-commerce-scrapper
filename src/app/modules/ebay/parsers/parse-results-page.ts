import { HtmlParser } from "@/common/parsers/html-parser";

const ResultsPageSelectors = {
    PRODUCT_CARD: '.srp-results .s-item',
};

export function parseProductCardHtmls(html: string): string[] {
    return new HtmlParser(html).getElementHtmls(ResultsPageSelectors.PRODUCT_CARD);
}
