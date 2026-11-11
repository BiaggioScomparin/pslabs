const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const marketingDir = path.resolve('marketing');
const artifactDir = 'C:\\Users\\biagg\\.gemini\\antigravity\\brain\\e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2';

const items = [
  {
    svg: 'status_1_retatrutida_60mg.svg',
    png: 'status_1_retatrutida_60mg.png',
  },
  {
    svg: 'status_2_ghkcu_50mg.svg',
    png: 'status_2_ghkcu_50mg.png',
  },
  {
    svg: 'status_3_combo_vip.svg',
    png: 'status_3_combo_vip.png',
  }
];

for (const item of items) {
  const svgContent = fs.readFileSync(path.join(marketingDir, item.svg), 'utf8');
  const htmlFile = path.join(marketingDir, `render_inline_${item.png}.html`);
  
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1920px; overflow: hidden; background: #04120E; }
  svg { width: 1080px; height: 1920px; display: block; }
</style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

  fs.writeFileSync(htmlFile, htmlContent, 'utf8');

  const outPngMarketing = path.join(marketingDir, item.png);
  const outPngWeb = path.join('web/marketing', item.png);
  const outPngArtifact = path.join(artifactDir, item.png);

  const cmd = `"${chromePath}" --headless --disable-gpu --screenshot="${outPngMarketing}" --window-size=1080,1920 --hide-scrollbars "file:///${htmlFile.replace(/\\/g, '/')}"`;
  
  console.log(`Rendering inline ${item.png}...`);
  execSync(cmd);

  // Copy to web and artifact dir
  fs.copyFileSync(outPngMarketing, outPngWeb);
  fs.copyFileSync(outPngMarketing, outPngArtifact);

  // Clean up
  fs.unlinkSync(htmlFile);

  console.log(`✅ Generated ${item.png} (${fs.statSync(outPngMarketing).size} bytes)`);
}

// Copy SVGs to artifactDir as well
for (const item of items) {
  fs.copyFileSync(path.join(marketingDir, item.svg), path.join(artifactDir, item.svg));
}

console.log('🎉 ALL 3 STATUS PNGs RENDERED WITH FULL INLINE FIDELITY!');
