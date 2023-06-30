import { Browser as PlaywrightBrowser, Page } from 'playwright';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Nullable } from '@/common/types/nullable';
import { config } from '@/config';

class Browser {
    private browser: Nullable<PlaywrightBrowser> = null;

    constructor(
        private readonly headless: boolean
    ) {}

    async usePage<C extends (page: Page) => Promise<any>, R = Awaited<ReturnType<C>>>(
        usePageCallback: C,
        url?: string,
    ): Promise<R> {
        const page = await this.getNewPage();
        try {
            if (url) {
                await page.goto(url, { waitUntil: 'networkidle' });
            }
            const result = await usePageCallback(page);
            return result;
        } finally {
            await page.close();
        }
    }

    async getPageHtml(url: string): Promise<string> {
        const html = this.usePage(page => page.content(), url);
        return html;
    }

    private async getNewPage(): Promise<Page> {
        const browser = await this.getBrowserInstance();
        const page = await browser.newPage();

        return page;
    }

    private async getBrowserInstance(): Promise<PlaywrightBrowser> {
        if (!this.browser) {
            chromium.use(stealthPlugin());
            this.browser = await chromium.launch({
                headless: this.headless,
            });
        }

        return this.browser;
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

export const browser = new Browser(config.browser.headless);
