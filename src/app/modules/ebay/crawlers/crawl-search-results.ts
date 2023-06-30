import { logger } from '@/common/services/logger';
import { browser } from '@/common/services/browser';

export async function crawlSearchResultsPage(searchTerm: string): Promise<string> {
    return browser.usePage(async (page) => {
        logger.info(`searching for ${searchTerm}...`);
        const searchInput = page.getByPlaceholder('Search for anything');
        await searchInput.fill(searchTerm);
        await searchInput.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500);

        logger.info(`selecting low-to-high price sorting...`);
        await page.getByLabel('Best Match selected').click();
        await page.getByText('Price + Shipping: lowest first').click();
        await page.waitForLoadState('networkidle');

        logger.info('downloading results page content...');
        const html = await page.content();
        logger.info('page content downloaded successfully');
        return html;
    }, 'https://www.ebay.com');
}
