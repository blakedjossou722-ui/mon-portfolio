import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public', import.meta.url));
const imageFiles = fs.readdirSync(publicDir).filter((file) => /\.(png|jpe?g|gif)$/i.test(file));

const optimize = async () => {
  for (const fileName of imageFiles) {
    const sourcePath = path.join(publicDir, fileName);
    const baseName = fileName.replace(/\.[^.]+$/, '');
    const webpPath = path.join(publicDir, `${baseName}.webp`);
    const avifPath = path.join(publicDir, `${baseName}.avif`);

    try {
      await sharp(sourcePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      console.log('Created', webpPath);
    } catch (error) {
      console.error('Failed to optimize WebP for', sourcePath, error.message);
    }

    try {
      await sharp(sourcePath)
        .avif({ quality: 50, effort: 6 })
        .toFile(avifPath);
      console.log('Created', avifPath);
    } catch (error) {
      console.error('Failed to optimize AVIF for', sourcePath, error.message);
    }
  }
};

optimize();
