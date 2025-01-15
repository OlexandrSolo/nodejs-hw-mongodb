import { mkdir } from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
    try {
        await fs.access(url);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await mkdir(url);
        }
    }
};