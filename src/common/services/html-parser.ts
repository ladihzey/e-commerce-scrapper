import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import { Nullable } from '@/common/types/nullable';

export class HtmlParser {
    private readonly dom: CheerioAPI;

    constructor(html: string) {
        this.dom = cheerio.load(html);
    }

    parseElements(selector: string): HtmlParser[] {
        return this.dom(selector).toArray().map(el => {
            const elementHtml = this.dom.html(el);
            return new HtmlParser(elementHtml);
        });
    }

    getElementText(selector: string): Nullable<string> {
        return this.dom(selector).first().text();
    }

    getElementAttribute(selector: string, attr: string): Nullable<string> {
        return this.dom(selector).attr(attr);
    }
}
