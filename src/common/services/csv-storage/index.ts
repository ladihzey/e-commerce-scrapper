import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import papa from 'papaparse';
import { config } from '@/config';

class CsvStorage {
    constructor(
        private storagePath: string,
    ) {
        fsSync.mkdirSync(storagePath, { recursive: true });
    }

    saveData(data: Object[], tag: string) {
        const filePath = path.resolve(this.storagePath, `${tag}.csv`);
        return fs.writeFile(
            filePath,
            papa.unparse(data),
            { encoding: 'utf-8' },
        );
    }
}

export const csvStorage = new CsvStorage(config.outputPath);
