import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import papa from 'papaparse';
import { config } from '@/config';

class CsvStorage {
    constructor(
        private readonly storagePath: string,
    ) {
        const dir = path.dirname(storagePath);
        fsSync.mkdirSync(dir, { recursive: true });
    }

    private isStorageEmpty(): boolean {
        return !fsSync.existsSync(this.storagePath) ||
            fsSync.statSync(this.storagePath).size === 0;
    }

    async saveData(data: Object[]) {
        const isEmpty = this.isStorageEmpty();
        const csvRows = papa.unparse(data, { header: isEmpty });

        return fs.appendFile(
            this.storagePath,
            isEmpty ? csvRows : '\n' + csvRows,
            { encoding: 'utf-8' },
        );
    }
}

export const csvStorage = new CsvStorage(config.outputPath);
