import { browser } from '@/common/services/browser';

export async function crawlSearchResultsPageStatically(searchTerm: string): Promise<string> {
    const searchTermUri = encodeURIComponent(searchTerm);
    const searchPageUrl = `https://www.amazon.com/s?k=${searchTermUri}&s=price-asc-rank`;
    return browser.getPageHtml(searchPageUrl);
}

export async function crawlSearchResultsPageInteractively(searchTerm: string): Promise<string> {
    return browser.usePage(async (page) => {
        const searchInput = page.getByLabel('Search Amazon');
        await searchInput.fill(searchTerm);
        await searchInput.press('Enter');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500);

        await page.locator('#s-result-sort-select').selectOption('Price: Low to High');
        await page.waitForLoadState('networkidle');

        return page.content();
    }, 'https://amazon.com');
}
