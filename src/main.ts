import 'module-alias/register';

import { csvStorage } from '@/common/services/csv-storage';
import { cliPrompt } from '@/common/services/cli-prompt';
import { browser } from '@/common/services/browser';
import * as amazon from '@/modules/amazon';

(async function() {
    const searchTerm = await cliPrompt.askQuestion('What are you looking for?');
    if (!searchTerm) return;

    const products = await amazon.getProducts(searchTerm, 3);
    await csvStorage.saveData(products);

    await browser.close();
})();
