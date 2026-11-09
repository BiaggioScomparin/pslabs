const fs = require('fs');
const { unfilterPNG } = require('./defilter_helper.js');
const { createPNG } = require('./png_encoder.js');

const inputBuf = fs.readFileSync('brand/logo_official.png');
const { width, height, data } = unfilterPNG(inputBuf);

// Bounding box: { minX: 117, minY: 218, maxX: 910, maxY: 463, width: 793, height: 245 }
const pad = 12;
const minX = Math.max(0, 117 - pad);
const maxX = Math.min(width - 1, 910 + pad);
const minY = Math.max(0, 218 - pad);
const maxY = Math.min(height - 1, 463 + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log('Cropping to:', cropW, 'x', cropH);

const croppedRGBA = Buffer.alloc(cropW * cropH * 4);
const transparentRGBA = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  const srcY = minY + y;
  for (let x = 0; x < cropW; x++) {
    const srcX = minX + x;
    const srcIdx = (srcY * width + srcX) * 4;
    const dstIdx = (y * cropW + x) * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const a = data[srcIdx + 3];

    // Version 1: Standard cropped (white background preserved)
    croppedRGBA[dstIdx] = r;
    croppedRGBA[dstIdx + 1] = g;
    croppedRGBA[dstIdx + 2] = b;
    croppedRGBA[dstIdx + 3] = a;

    // Version 2: Transparent (remove white background)
    // If pixel is near white (> 245 in all channels), make transparent
    if (r > 240 && g > 240 && b > 240) {
      transparentRGBA[dstIdx] = 255;
      transparentRGBA[dstIdx + 1] = 255;
      transparentRGBA[dstIdx + 2] = 255;
      transparentRGBA[dstIdx + 3] = 0; // transparent
    } else {
      transparentRGBA[dstIdx] = r;
      transparentRGBA[dstIdx + 1] = g;
      transparentRGBA[dstIdx + 2] = b;
      transparentRGBA[dstIdx + 3] = a;
    }
  }
}

const croppedPNG = createPNG(cropW, cropH, croppedRGBA);
const transparentPNG = createPNG(cropW, cropH, transparentRGBA);

fs.writeFileSync('brand/logo_header.png', croppedPNG);
fs.writeFileSync('brand/logo_transparent.png', transparentPNG);
fs.writeFileSync('logo.png', croppedPNG);
fs.writeFileSync('web/logo.png', croppedPNG);
fs.writeFileSync('web/logo_header.png', croppedPNG);
fs.writeFileSync('web/logo_transparent.png', transparentPNG);

// Export Base64
const b64 = transparentPNG.toString('base64');
const dataUri = `data:image/png;base64,${b64}`;
fs.writeFileSync('brand/logo_data_uri.js', `module.exports = "${dataUri}";\n`);

console.log('Successfully created logo_header.png and logo_transparent.png!');
console.log('Cropped PNG size:', croppedPNG.length, 'Transparent PNG size:', transparentPNG.length);
