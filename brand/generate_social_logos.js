const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\biagg\\.gemini\\antigravity\\brain\\e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2';

// Ensure folders
['brand', 'web/brand', artifactDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// OPTION 1: Deep Emerald Luxury (Dark Background)
const svgOption1 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0E382B"/>
      <stop offset="60%" stop-color="#07221A"/>
      <stop offset="100%" stop-color="#03120E"/>
    </radialGradient>
    <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34D399" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#145C46" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.6"/>
    </linearGradient>
    <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bgGrad1)"/>
  <circle cx="540" cy="540" r="490" stroke="url(#ringGrad1)" stroke-width="3" fill="none"/>
  <circle cx="540" cy="540" r="470" stroke="#1F5643" stroke-width="1.5" stroke-dasharray="6,6" fill="none"/>
  <circle cx="540" cy="500" r="280" fill="#145C46" opacity="0.4" filter="url(#glow1)"/>

  <g transform="translate(540, 480) scale(1.4) translate(-230, -110)">
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="#FFFFFF"/>
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#FFFFFF"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#34D399" stroke-width="5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#34D399" stroke-width="5" stroke-linecap="round"/>
      <g stroke="#145C46" stroke-linecap="round">
        <path d="M 50 4 Q 74 46 98 88 T 50 172" fill="none" stroke-width="5.5"/>
        <path d="M 98 4 Q 74 46 50 88 T 98 172" fill="none" stroke-width="5.5"/>
        <line x1="58" y1="20" x2="90" y2="20" stroke-width="4"/>
        <line x1="64" y1="38" x2="84" y2="38" stroke-width="4"/>
        <line x1="71" y1="58" x2="77" y2="58" stroke-width="4"/>
        <line x1="71" y1="118" x2="77" y2="118" stroke-width="4"/>
        <line x1="64" y1="138" x2="84" y2="138" stroke-width="4"/>
        <line x1="58" y1="156" x2="90" y2="156" stroke-width="4"/>
      </g>
    </g>
    <path d="M 325 0 L 367 0 L 367 124 L 452 124 L 452 160 L 325 160 Z" fill="#FFFFFF"/>
  </g>

  <text x="540" y="700" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="74" font-weight="300" fill="#34D399" letter-spacing="18">LABS</text>

  <g transform="translate(540, 770)">
    <rect x="-240" y="0" width="480" height="42" rx="21" fill="#145C46" fill-opacity="0.8" stroke="#34D399" stroke-width="1.2"/>
    <text x="0" y="27" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" letter-spacing="4">PREMIUM SYNTHESIS LINE</text>
  </g>
</svg>`;


// OPTION 2: Clinical Minimalist White
const svgOption2 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#145C46"/>
      <stop offset="100%" stop-color="#0A2E23"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="#FFFFFF"/>
  <circle cx="540" cy="540" r="490" stroke="url(#ringGrad2)" stroke-width="6" fill="none"/>
  <circle cx="540" cy="540" r="472" stroke="#E2E8F0" stroke-width="2" fill="none"/>

  <g transform="translate(540, 480) scale(1.4) translate(-230, -110)">
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="#145C46"/>
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#145C46"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#145C46" stroke-width="5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#145C46" stroke-width="5" stroke-linecap="round"/>
      <g stroke="#FFFFFF" stroke-linecap="round">
        <path d="M 50 4 Q 74 46 98 88 T 50 172" fill="none" stroke-width="5.5"/>
        <path d="M 98 4 Q 74 46 50 88 T 98 172" fill="none" stroke-width="5.5"/>
        <line x1="58" y1="20" x2="90" y2="20" stroke-width="4"/>
        <line x1="64" y1="38" x2="84" y2="38" stroke-width="4"/>
        <line x1="71" y1="58" x2="77" y2="58" stroke-width="4"/>
        <line x1="71" y1="118" x2="77" y2="118" stroke-width="4"/>
        <line x1="64" y1="138" x2="84" y2="138" stroke-width="4"/>
        <line x1="58" y1="156" x2="90" y2="156" stroke-width="4"/>
      </g>
    </g>
    <path d="M 325 0 L 367 0 L 367 124 L 452 124 L 452 160 L 325 160 Z" fill="#145C46"/>
  </g>

  <text x="540" y="700" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="74" font-weight="400" fill="#145C46" letter-spacing="18">LABS</text>

  <g transform="translate(540, 770)">
    <rect x="-240" y="0" width="480" height="42" rx="21" fill="#EBF5F1" stroke="#145C46" stroke-width="1.2"/>
    <text x="0" y="27" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="800" fill="#145C46" letter-spacing="4">PREMIUM SYNTHESIS LINE</text>
  </g>
</svg>`;


// OPTION 3: Circular Certification Seal
const svgOption3 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0E3326"/>
      <stop offset="70%" stop-color="#061B14"/>
      <stop offset="100%" stop-color="#020B08"/>
    </radialGradient>
    <linearGradient id="gold3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#CA8A04"/>
      <stop offset="100%" stop-color="#EAB308"/>
    </linearGradient>

    <path id="textCircleTop" d="M 170 540 A 370 370 0 0 1 910 540" fill="none"/>
    <path id="textCircleBottom" d="M 910 540 A 370 370 0 0 1 170 540" fill="none"/>
  </defs>

  <rect width="1080" height="1080" fill="url(#bgGrad3)"/>

  <circle cx="540" cy="540" r="496" stroke="url(#gold3)" stroke-width="4" fill="none"/>
  <circle cx="540" cy="540" r="480" stroke="#1F5643" stroke-width="2" stroke-dasharray="8,8" fill="none"/>
  <circle cx="540" cy="540" r="430" stroke="url(#gold3)" stroke-width="2.5" fill="none"/>
  <circle cx="540" cy="540" r="310" stroke="#34D399" stroke-width="2" fill="#061E16"/>

  <text font-family="'Inter', sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" letter-spacing="9">
    <textPath href="#textCircleTop" startOffset="50%" text-anchor="middle">
      PREMIUM SYNTHESIS LINE
    </textPath>
  </text>

  <text font-family="'Inter', sans-serif" font-size="28" font-weight="800" fill="#FDE047" letter-spacing="7">
    <textPath href="#textCircleBottom" startOffset="50%" text-anchor="middle">
      ★ HPLC CERTIFIED >99% PURITY ★
    </textPath>
  </text>

  <g transform="translate(540, 500) scale(1.05) translate(-230, -100)">
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="#FFFFFF"/>
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#FFFFFF"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#FDE047" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#FDE047" stroke-width="4.5" stroke-linecap="round"/>
      <g stroke="#145C46" stroke-linecap="round">
        <path d="M 50 4 Q 74 46 98 88 T 50 172" fill="none" stroke-width="5"/>
        <path d="M 98 4 Q 74 46 50 88 T 98 172" fill="none" stroke-width="5"/>
        <line x1="58" y1="20" x2="90" y2="20" stroke-width="3.5"/>
        <line x1="64" y1="38" x2="84" y2="38" stroke-width="3.5"/>
        <line x1="71" y1="58" x2="77" y2="58" stroke-width="3.5"/>
        <line x1="71" y1="118" x2="77" y2="118" stroke-width="3.5"/>
        <line x1="64" y1="138" x2="84" y2="138" stroke-width="3.5"/>
        <line x1="58" y1="156" x2="90" y2="156" stroke-width="3.5"/>
      </g>
    </g>
    <path d="M 325 0 L 367 0 L 367 124 L 452 124 L 452 160 L 325 160 Z" fill="#FFFFFF"/>
  </g>

  <text x="540" y="650" text-anchor="middle" font-family="'Inter', sans-serif" font-size="52" font-weight="400" fill="#34D399" letter-spacing="14">LABS</text>
</svg>`;


// OPTION 4: The Pure S-DNA Monogram Icon
const svgOption4 = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad4" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#145C46"/>
      <stop offset="75%" stop-color="#08291F"/>
      <stop offset="100%" stop-color="#03140F"/>
    </radialGradient>
    <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bgGrad4)"/>

  <circle cx="540" cy="540" r="490" stroke="#34D399" stroke-width="3" stroke-opacity="0.6" fill="none"/>
  <circle cx="540" cy="540" r="460" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.15" fill="none"/>

  <polygon points="540,120 880,316 880,708 540,904 200,708 200,316" stroke="#25D366" stroke-opacity="0.12" stroke-width="2" fill="none"/>

  <text x="540" y="240" text-anchor="middle" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="8">PSL</text>

  <g transform="translate(540, 520) scale(2.6) translate(-72, -90)">
    <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#FFFFFF" filter="url(#glow4)"/>
    <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#FFFFFF"/>

    <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#25D366" stroke-width="5" stroke-linecap="round"/>
    <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#25D366" stroke-width="5" stroke-linecap="round"/>

    <g stroke="#145C46" stroke-linecap="round">
      <path d="M 50 4 Q 74 46 98 88 T 50 172" fill="none" stroke-width="5.5"/>
      <path d="M 98 4 Q 74 46 50 88 T 98 172" fill="none" stroke-width="5.5"/>
      <line x1="58" y1="20" x2="90" y2="20" stroke-width="4"/>
      <line x1="64" y1="38" x2="84" y2="38" stroke-width="4"/>
      <line x1="71" y1="58" x2="77" y2="58" stroke-width="4"/>
      <line x1="71" y1="118" x2="77" y2="118" stroke-width="4"/>
      <line x1="64" y1="138" x2="84" y2="138" stroke-width="4"/>
      <line x1="58" y1="156" x2="90" y2="156" stroke-width="4"/>
    </g>
  </g>

  <text x="540" y="860" text-anchor="middle" font-family="'Inter', sans-serif" font-size="44" font-weight="300" fill="#34D399" letter-spacing="16">LABS</text>
</svg>`;

const logoOptions = [
  {
    id: 'opcao_1_dark_luxury',
    title: 'Opção 1 · Esmeralda Profundo & Dourado (Dark Luxury)',
    filenamePng: 'logo_social_1_dark_luxury.png',
    filenameSvg: 'logo_social_1_dark_luxury.svg',
    svgData: svgOption1,
    desc: 'Visual premium luxo noturno, perfeito para feed e perfil do Instagram e WhatsApp Business. Máximo contraste e autoridade.'
  },
  {
    id: 'opcao_2_clinical_white',
    title: 'Opção 2 · Branco Clínico (Pure Minimalist)',
    filenamePng: 'logo_social_2_clinical_white.png',
    filenameSvg: 'logo_social_2_clinical_white.svg',
    svgData: svgOption2,
    desc: 'Estilo laboratório farmacêutico limpo com aro verde esmeralda. Transmite pureza médica e transparência cirúrgica.'
  },
  {
    id: 'opcao_3_seal_hplc',
    title: 'Opção 3 · Selo Farmacêutico Oficial (HPLC Certified Seal)',
    filenamePng: 'logo_social_3_seal_hplc.png',
    filenameSvg: 'logo_social_3_seal_hplc.svg',
    svgData: svgOption3,
    desc: 'Estilo brasão circular de certificação e garantia de pureza (>99% HPLC). Passa máxima segurança científica e exclusividade.'
  },
  {
    id: 'opcao_4_s_helix_icon',
    title: 'Opção 4 · Ícone S-Helix Monograma (App Icon / Biohacking)',
    filenamePng: 'logo_social_4_s_helix_icon.png',
    filenameSvg: 'logo_social_4_s_helix_icon.svg',
    svgData: svgOption4,
    desc: 'Foco no símbolo proprietário da marca (o S com a fita dupla de DNA). Altamente legível mesmo em tamanhos minúsculos (32px).'
  }
];

// Save SVGs and Render PNGs via Headless Chrome with ABSOLUTE PATHS
logoOptions.forEach(opt => {
  const svgAbsBrand = path.resolve('brand', opt.filenameSvg);
  const svgAbsWeb = path.resolve('web/brand', opt.filenameSvg);
  const svgAbsArtifact = path.resolve(artifactDir, opt.filenameSvg);

  fs.writeFileSync(svgAbsBrand, opt.svgData, 'utf8');
  fs.writeFileSync(svgAbsWeb, opt.svgData, 'utf8');
  fs.writeFileSync(svgAbsArtifact, opt.svgData, 'utf8');

  // Render HTML wrapper for Chrome
  const htmlTemp = path.resolve('brand', `render_social_${opt.id}.html`);
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1080px; overflow: hidden; background: transparent; }
  svg { width: 1080px; height: 1080px; display: block; }
</style>
</head>
<body>
  ${opt.svgData}
</body>
</html>`;
  fs.writeFileSync(htmlTemp, htmlContent, 'utf8');

  const pngAbsBrand = path.resolve('brand', opt.filenamePng);
  const pngAbsWeb = path.resolve('web/brand', opt.filenamePng);
  const pngAbsArtifact = path.resolve(artifactDir, opt.filenamePng);

  const cmd = `"${chromePath}" --headless --disable-gpu --screenshot="${pngAbsBrand}" --window-size=1080,1080 --hide-scrollbars "file:///${htmlTemp.replace(/\\/g, '/')}"`;
  console.log(`Rendering ${opt.filenamePng}...`);
  execSync(cmd);

  fs.copyFileSync(pngAbsBrand, pngAbsWeb);
  fs.copyFileSync(pngAbsBrand, pngAbsArtifact);

  fs.unlinkSync(htmlTemp);
  console.log(`✅ ${opt.filenamePng} rendered (${fs.statSync(pngAbsBrand).size} bytes)`);
});

console.log('🎉 ALL 4 SOCIAL MEDIA LOGO OPTIONS COMPLETED AND RENDERED!');
