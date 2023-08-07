import 'module-alias/register';

import { config } from '@/config';
import { logger } from '@/common/services/logger';
import { csvStorage } from '@/common/services/csv-storage';
import { cliPrompt } from '@/common/services/cli-prompt';
import { browser } from '@/common/services/browser';

import { amazon } from '@/app/modules/amazon';
import { ebay } from '@/app/modules/ebay';

const modules = [
    amazon,
    ebay,
];

(async function() {
    try {
        const searchTerm = await cliPrompt.askQuestion('What are you looking for?');
        if (!searchTerm) return;

        for (const module of modules) {
            logger.info(`retrieving products from ${module.name}...`);
            let products = null;
            for (let i = 0; i < config.retryAttempts; i++) {
                try {
                    products = await module.getProducts(searchTerm);
                    logger.info(`retrieved ${products.length} products from ${module.name}`);
                    break;
                } catch {
                    logger.warn(`failed to scrape products,  ${config.retryAttempts - i} attempts left`);
                }
            }
            if (!products) {
                logger.error(`unable to scrape ${module.name}`);
                continue;
            }

            logger.info('saving data to csv storage...');
            await csvStorage.saveData(products.slice(0, 3));
            logger.info('saved data successfully');
        }
    } catch (e) {
        logger.error(e);
    } finally {
        await browser.close();
    }
})();
