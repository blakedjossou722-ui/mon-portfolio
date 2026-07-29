import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyToTempExecutable(srcPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ffmpeg-'));
  const tempPath = path.join(tempDir, path.basename(srcPath));
  fs.copyFileSync(srcPath, tempPath);
  fs.chmodSync(tempPath, 0o755);
  return tempPath;
}

async function convertGifToMp4(srcPath, outPath) {
  console.log(`Converting ${srcPath} -> ${outPath}`);

  const tryFfmpeg = async (executable) => {
    await execa(executable, ['-y', '-i', srcPath, '-movflags', 'faststart', '-pix_fmt', 'yuv420p', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-preset', 'medium', outPath], { stdio: 'inherit' });
  };

  const removeZoneIdentifier = (file) => {
    try {
      const ads = file + ':Zone.Identifier';
      if (fs.existsSync(ads)) fs.unlinkSync(ads);
    } catch (e) {
      // ignore
    }
  };

  try {
    // attempt to remove Zone.Identifier on the original binary (Windows security mark)
    try { removeZoneIdentifier(ffmpegPath); } catch (e) {}
    await tryFfmpeg(ffmpegPath);
  } catch (primaryError) {
    console.warn('Primary ffmpeg execution failed, attempting from temporary copy...');
    try {
      const tempExe = copyToTempExecutable(ffmpegPath);
      // remove Zone.Identifier on temporary copy as well
      try { removeZoneIdentifier(tempExe); } catch (e) {}
      await tryFfmpeg(tempExe);
    } catch (tempError) {
      console.error(`⚠️  GIF→MP4 conversion skipped: ${tempError.message}`);
      console.log(`   The .gif file will be used as-is: ${srcPath}`);
      console.log('   To enable MP4 conversion, ensure ffmpeg is installed and accessible.');
      return false; // indicate conversion was skipped
    }
  }
  return true; // indicate conversion succeeded
}

function normalizePublicFiles(publicDir) {
  const normalizePaths = [
    { from: 'HTML 5.avif', to: 'html5.avif' },
    { from: 'HTML 5.webp', to: 'html5.webp' },
    { from: 'REST APIs.avif', to: 'rest-apis.avif' },
    { from: 'REST APIs.png', to: 'rest-apis.png' },
    { from: 'REST APIs.webp', to: 'rest-apis.webp' }
  ];

  normalizePaths.forEach(({ from, to }) => {
    const srcPath = path.join(publicDir, from);
    const destPath = path.join(publicDir, to);
    if (!fs.existsSync(srcPath)) return;

    if (fs.existsSync(destPath)) {
      fs.unlinkSync(srcPath);
      console.log(`Removed duplicate public asset: ${from}`);
    } else {
      fs.renameSync(srcPath, destPath);
      console.log(`Renamed ${from} -> ${to}`);
    }
  });
}

function normalizeWhatsAppFilename(publicDir) {
  const files = fs.readdirSync(publicDir);
  const whatsapp = files.find(f => f.toLowerCase().includes('whatsapp') && f.toLowerCase().endsWith('.mp4'));
  if (whatsapp) {
    const oldPath = path.join(publicDir, whatsapp);
    const newPath = path.join(publicDir, 'whatsapp-2026-07-19.mp4');
    if (oldPath !== newPath) {
      if (fs.existsSync(newPath)) {
        fs.unlinkSync(oldPath);
        console.log(`Removed duplicate WhatsApp asset: ${whatsapp}`);
      } else {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${whatsapp} -> whatsapp-2026-07-19.mp4`);
      }
    }
  }
}

async function run() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');

  normalizePublicFiles(publicDir);
  normalizeWhatsAppFilename(publicDir);

  const gifPath = path.join(publicDir, 'Professional.gif');
  if (fs.existsSync(gifPath)) {
    const outMp4 = path.join(publicDir, 'professional.mp4');
    const converted = await convertGifToMp4(gifPath, outMp4);
    if (converted) {
      console.log('✓ Conversion done:', outMp4);
    } else {
      console.log('✓ Script completed (GIF→MP4 conversion skipped)');
    }
  } else {
    console.log('No Professional.gif found, skipping GIF conversion');
  }

  console.log('Media conversion script completed.');
}

run().catch(err => { console.error(err); process.exitCode = 1; });
