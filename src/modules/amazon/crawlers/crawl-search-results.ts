import { browser } from '@/common/services/browser';

export async function crawlSearchResultsPageStatically(searchTerm: string): Promise<string> {
    const searchTermUri = encodeURIComponent(searchTerm);
    const searchPageUrl = `https://www.amazon.com/s?k=${searchTermUri}&s=price-asc-rank`;
    return browser.getPageHtml(searchPageUrl);
}

export async function crawlSearchResultsPageInteractively(searchTerm: string): Promise<string> {
    return browser.usePage(async (page) => {
        await page.getByPlaceholder('Search Amazon').fill(searchTerm);
        await page.getByPlaceholder('Search Amazon').press('Enter');
        await page.waitForLoadState('networkidle');

        await page.locator('[name="s"]').selectOption('Price: Low to High');
        await page.waitForLoadState('networkidle');

        return page.content();
    }, 'https://amazon.com');
}
