import { Browser as PlaywrightBrowser, Page } from 'playwright';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { logger } from '@/common/services/logger';
import { Nullable } from '@/common/types/nullable';
import { config } from '@/config';

class Browser {
    private browser: Nullable<PlaywrightBrowser> = null;

    constructor(
        private readonly headless: boolean,
        private readonly timeout: number,
    ) {}

    async usePage<C extends (page: Page) => Promise<any>, R = Awaited<ReturnType<C>>>(
        callback: C,
        url?: string,
    ): Promise<R> {
        const page = await this.getNewPage();
        try {
            if (url) {
                logger.info(`loading page ${url}...`);
                await page.goto(url, { waitUntil: 'domcontentloaded' });
                await page.waitForTimeout(2000);
                logger.info('loaded successfully');
            }
            const result = await callback(page);
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

        await page.setDefaultTimeout(this.timeout);
        await page.setDefaultNavigationTimeout(this.timeout);

        return page;
    }

    private async getBrowserInstance(): Promise<PlaywrightBrowser> {
        if (!this.browser) {
            logger.info('launching browser...')
            chromium.use(stealthPlugin());
            this.browser = await chromium.launch({
                headless: this.headless,
                timeout: this.timeout,
            });
            logger.info('browser launched successfully')
        }

        return this.browser;
    }

    async close() {
        if (this.browser) {
            logger.info('closing browser...')
            await this.browser.close();
            logger.info('browser closed successfully')
        }
    }
}

export const browser = new Browser(
    config.browser.headless,
    config.browser.timeout,
);
