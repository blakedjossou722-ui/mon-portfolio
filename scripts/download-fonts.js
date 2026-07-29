// Downloads selected font woff2 files into public/fonts/
// Usage: node scripts/download-fonts.js

import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public', 'fonts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const families = [
  {
    name: 'inter',
    cssName: 'Inter',
    variants: [ '400', '600' ],
    out: {
      '400': 'Inter-400.woff2',
      '600': 'Inter-600.woff2'
    }
  },
  {
    name: 'playfair-display',
    cssName: 'Playfair Display',
    variants: [ '700' ],
    out: { '700': 'PlayfairDisplay-700.woff2' }
  },
  {
    name: 'jetbrains-mono',
    cssName: 'JetBrains Mono',
    variants: [ '400' ],
    out: { '400': 'JetBrainsMono-400.woff2' }
  }
];

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  console.log('Saved', dest);
}

function cssUrlForFamilies(families) {
  // build Google Fonts CSS query
  // families: array like [{name:'inter', variants:['400','600']}, ...]
  const parts = families.map(fam => {
    const famName = fam.cssName || fam.name;
    const weights = fam.variants.join(';');
    return `family=${encodeURIComponent(famName)}:wght@${weights}`;
  });
  return `https://fonts.googleapis.com/css2?${parts.join('&')}&display=swap`;
}

function extractWoff2UrlsFromCss(cssText) {
  const urls = [];
  const regex = /url\(['"]?(https:\/\/[^'"\)]+\.woff2[^'"\)]*)['"]?\)/g;
  let m;
  while ((m = regex.exec(cssText)) !== null) {
    urls.push(m[1]);
  }
  return urls;
}

(async function(){
  try {
    for (const fam of families) {
      const api = `https://google-webfonts-helper.herokuapp.com/api/fonts/${fam.name}?subsets=latin`;
      console.log('Querying', api);
      let data = null;
      try {
        data = await fetchJson(api);
      } catch (err) {
        console.warn('Helper API failed for', fam.name, '-', err.message);
      }

      if (data && data.variants) {
        for (const v of fam.variants) {
          const variant = data.variants.find(variant => String(variant.fontWeight) === String(v) && variant.fontStyle === 'normal');
          if (!variant) {
            console.warn(`Variant ${v} not found for ${fam.name} in helper API`);
            continue;
          }
          const woff2 = variant.formats['woff2'];
          if (!woff2) {
            console.warn('No woff2 for', fam.name, v);
            continue;
          }
          const outName = fam.out[v];
          const outPath = path.join(outDir, outName);
          console.log(`Downloading ${fam.name} ${v} -> ${outName}`);
          await download(woff2, outPath);
        }
        continue; // next family
      }

      // Fallback: fetch Google Fonts CSS and extract woff2 URLs
      const cssUrl = cssUrlForFamilies([fam]);
      console.log('Fetching fallback CSS from', cssUrl);
      const cssRes = await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36', 'Accept': 'text/css', 'Sec-Fetch-Dest': 'style' } });
      if (!cssRes.ok) {
        console.warn('Failed to fetch CSS fallback for', fam.name, cssRes.status);
        continue;
      }
      const cssText = await cssRes.text();
      const woff2urls = extractWoff2UrlsFromCss(cssText);
      if (woff2urls.length === 0) {
        console.warn('No woff2 URLs found in CSS for', fam.name);
        continue;
      }
      // Download first matching variant per requested weight order
      let idx = 0;
      for (const v of fam.variants) {
        const url = woff2urls[idx] || woff2urls[0];
        const outName = fam.out[v];
        const outPath = path.join(outDir, outName);
        console.log(`Downloading fallback ${fam.name} ${v} -> ${outName} from ${url}`);
        await download(url, outPath);
        idx++;
      }
    }
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
