import { HtmlParser } from "@/common/services/html-parser";

const ResultsPageSelectors = {
    PRODUCT_CARD: '[data-component-type="s-search-result"]',
};

export function parseProductCardHtmls(html: string): string[] {
    return new HtmlParser(html).getElementHtmls(ResultsPageSelectors.PRODUCT_CARD);
}
