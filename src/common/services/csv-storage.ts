import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import papa from 'papaparse';
import { config } from '@/config';

class CsvStorage {
    constructor(
        private storagePath: string,
    ) {
        const dir = path.dirname(storagePath);
        fsSync.mkdirSync(dir, { recursive: true });
    }

    saveData(data: Object[]) {
        return fs.writeFile(
            this.storagePath,
            papa.unparse(data),
            { encoding: 'utf-8' },
        );
    }
}

export const csvStorage = new CsvStorage(config.outputPath);
