const fs = require('fs');
const path = require('path');
const execa = require('execa');

async function ensurePackage(pkg) {
  try {
    require.resolve(pkg);
    return true;
  } catch (e) {
    return false;
  }
}

async function run() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');

  const needPkg = !(await ensurePackage('ffmpeg-static')) || !(await ensurePackage('execa'));
  if (needPkg) {
    console.log('Installing conversion helper packages (ffmpeg-static, execa)...');
    await execa('npm', ['install', '--no-audit', '--no-fund', 'ffmpeg-static', 'execa'], { stdio: 'inherit' });
  }

  const ffmpegPath = require('ffmpeg-static');
  console.log('Using ffmpeg at', ffmpegPath);

  async function convertGifToMp4(srcPath, outPath) {
    console.log(`Converting ${srcPath} -> ${outPath}`);
    await execa(ffmpegPath, ['-y', '-i', srcPath, '-movflags', 'faststart', '-pix_fmt', 'yuv420p', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-preset', 'medium', outPath], { stdio: 'inherit' });
  }

  // Find Professional.gif
  const gifPath = path.join(publicDir, 'Professional.gif');
  if (fs.existsSync(gifPath)) {
    const outMp4 = path.join(publicDir, 'professional.mp4');
    await convertGifToMp4(gifPath, outMp4);
    console.log('Conversion done:', outMp4);
  } else {
    console.log('No Professional.gif found, skipping GIF conversion');
  }

  // Normalize WhatsApp video filename if present
  const files = fs.readdirSync(publicDir);
  const whatsapp = files.find(f => f.toLowerCase().includes('whatsapp') && f.toLowerCase().endsWith('.mp4'));
  if (whatsapp) {
    const oldPath = path.join(publicDir, whatsapp);
    const newPath = path.join(publicDir, 'whatsapp-2026-07-19.mp4');
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${whatsapp} -> whatsapp-2026-07-19.mp4`);
    }
  }

  console.log('Media conversion script completed.');
}

run().catch(err => { console.error(err); process.exitCode = 1; });
