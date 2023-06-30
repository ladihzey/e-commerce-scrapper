import 'module-alias/register';

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
            const products = await module.getProducts(searchTerm);
            logger.info(`retrieved ${products.length} products from ${module.name}`);

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
