const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\biagg\\.gemini\\antigravity\\brain\\e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2';

const dirs = [
  path.resolve('brand/hd'),
  path.resolve('web/brand/hd'),
  path.resolve(artifactDir)
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Color definitions
const EMERALD = "#145C46";
const MINT = "#34D399";
const DARK_BG_1 = "#03120E";
const DARK_BG_2 = "#08261D";

// 1. Horizontal Vector Logos (ViewBox 1000 x 450)
function getHorizontalSvg(theme) {
  // theme: 'transparent', 'white', 'dark', 'white_transparent'
  let bg = '';
  let mainColor = EMERALD;
  let helixStrand = EMERALD;
  let helixRungs = "#FFFFFF";
  let subColor = EMERALD;

  if (theme === 'white') {
    bg = `<rect width="1000" height="450" fill="#FFFFFF"/>`;
    mainColor = EMERALD;
    helixStrand = EMERALD;
    helixRungs = "#FFFFFF";
    subColor = EMERALD;
  } else if (theme === 'transparent') {
    bg = '';
    mainColor = EMERALD;
    helixStrand = EMERALD;
    helixRungs = "#FFFFFF";
    subColor = EMERALD;
  } else if (theme === 'dark') {
    bg = `<defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0E382B"/>
        <stop offset="50%" stop-color="#07221A"/>
        <stop offset="100%" stop-color="#03120E"/>
      </linearGradient>
    </defs>
    <rect width="1000" height="450" fill="url(#bgGrad)"/>`;
    mainColor = "#FFFFFF";
    helixStrand = MINT;
    helixRungs = "#145C46";
    subColor = MINT;
  } else if (theme === 'white_transparent') {
    bg = '';
    mainColor = "#FFFFFF";
    helixStrand = "#FFFFFF";
    helixRungs = "#145C46";
    subColor = "#FFFFFF";
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 450" width="100%" height="100%">
  ${bg}
  <g transform="translate(60, 100)">
    <!-- PSL Group (Bold Heavy Weight) -->
    <!-- Letter P -->
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="${mainColor}"/>

    <!-- Letter S with Integrated Organic DNA Double Helix -->
    <g transform="translate(155, 0)">
      <!-- Base S Silhouette -->
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="${mainColor}"/>

      <!-- DNA Helix Ribbon Top & Bottom Extended Curves -->
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="${helixStrand}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="${helixStrand}" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Inner DNA Cutout Track and Ladder Steps (Rungs) -->
      <g stroke="${helixRungs}" stroke-linecap="round">
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

    <!-- Letter L -->
    <path d="M 325 0 L 367 0 L 367 124 L 452 124 L 452 160 L 325 160 Z" fill="${mainColor}"/>

    <!-- LABS Group -->
    <g transform="translate(492, 0)">
      <path d="M 0 0 L 20 0 L 20 138 L 76 138 L 76 160 L 0 160 Z" fill="${mainColor}"/>
      <path d="M 126 0 L 150 0 L 202 160 L 178 160 L 168 126 L 110 126 L 100 160 L 76 160 Z M 116 104 L 162 104 L 138 28 Z" fill="${mainColor}"/>
      <path d="M 224 0 L 274 0 C 298 0 314 12 314 34 C 314 48 304 58 290 64 C 308 70 320 84 320 106 C 320 134 300 160 270 160 L 224 160 Z M 246 22 L 246 68 L 270 68 C 282 68 290 60 290 48 C 290 36 282 22 270 22 Z M 246 90 L 246 138 L 272 138 C 286 138 296 128 296 114 C 296 100 286 90 272 90 Z" fill="${mainColor}"/>
      <path d="M 406 32 C 394 18 380 12 364 12 C 344 12 334 22 334 36 C 334 50 346 58 368 64 C 396 72 414 84 414 110 C 414 138 392 162 360 162 C 336 162 318 150 306 134 L 324 114 C 334 128 346 138 360 138 C 374 138 388 128 388 114 C 388 98 376 90 354 84 C 326 76 308 62 308 38 C 308 14 330 -2 364 -2 C 386 -2 402 6 418 20 Z" fill="${mainColor}"/>
    </g>

    <!-- Subtitle: PREMIUM SYNTHESIS LINE -->
    <text x="3" y="228" font-family="'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="14.8" fill="${subColor}">
      PREMIUM SYNTHESIS LINE
    </text>
  </g>
</svg>`;
}

// 2. Compact / Tight Vector Logo (ViewBox 920 x 300)
function getCompactSvg(theme) {
  let bg = '';
  let mainColor = EMERALD;
  let helixStrand = EMERALD;
  let helixRungs = "#FFFFFF";
  let subColor = EMERALD;

  if (theme === 'white') {
    bg = `<rect width="920" height="300" fill="#FFFFFF"/>`;
  } else if (theme === 'dark') {
    bg = `<rect width="920" height="300" fill="#04120E"/>`;
    mainColor = "#FFFFFF";
    helixStrand = MINT;
    helixRungs = "#145C46";
    subColor = MINT;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 300" width="100%" height="100%">
  ${bg}
  <g transform="translate(10, 35)">
    <!-- Letter P -->
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="${mainColor}"/>

    <!-- Letter S with Integrated Organic DNA Double Helix -->
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="${mainColor}"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="${helixStrand}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="${helixStrand}" stroke-width="4.5" stroke-linecap="round"/>

      <g stroke="${helixRungs}" stroke-linecap="round">
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

    <!-- Letter L -->
    <path d="M 325 0 L 367 0 L 367 124 L 452 124 L 452 160 L 325 160 Z" fill="${mainColor}"/>

    <!-- LABS Group -->
    <g transform="translate(492, 0)">
      <path d="M 0 0 L 20 0 L 20 138 L 76 138 L 76 160 L 0 160 Z" fill="${mainColor}"/>
      <path d="M 126 0 L 150 0 L 202 160 L 178 160 L 168 126 L 110 126 L 100 160 L 76 160 Z M 116 104 L 162 104 L 138 28 Z" fill="${mainColor}"/>
      <path d="M 224 0 L 274 0 C 298 0 314 12 314 34 C 314 48 304 58 290 64 C 308 70 320 84 320 106 C 320 134 300 160 270 160 L 224 160 Z M 246 22 L 246 68 L 270 68 C 282 68 290 60 290 48 C 290 36 282 22 270 22 Z M 246 90 L 246 138 L 272 138 C 286 138 296 128 296 114 C 296 100 286 90 272 90 Z" fill="${mainColor}"/>
      <path d="M 406 32 C 394 18 380 12 364 12 C 344 12 334 22 334 36 C 334 50 346 58 368 64 C 396 72 414 84 414 110 C 414 138 392 162 360 162 C 336 162 318 150 306 134 L 324 114 C 334 128 346 138 360 138 C 374 138 388 128 388 114 C 388 98 376 90 354 84 C 326 76 308 62 308 38 C 308 14 330 -2 364 -2 C 386 -2 402 6 418 20 Z" fill="${mainColor}"/>
    </g>

    <!-- Subtitle: PREMIUM SYNTHESIS LINE -->
    <text x="3" y="228" font-family="'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="14.8" fill="${subColor}">
      PREMIUM SYNTHESIS LINE
    </text>
  </g>
</svg>`;
}

// 3. Social Media Logos 2048 x 2048
function getSocialSvg(type) {
  if (type === 'dark_luxury') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2048" height="2048" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  }

  if (type === 'clinical_white') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2048" height="2048" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ringGrad2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#145C46"/>
      <stop offset="50%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#145C46"/>
    </linearGradient>
  </defs>

  <rect width="1080" height="1080" fill="#FFFFFF"/>
  <circle cx="540" cy="540" r="490" stroke="url(#ringGrad2)" stroke-width="5" fill="none"/>
  <circle cx="540" cy="540" r="472" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

  <g transform="translate(540, 480) scale(1.4) translate(-230, -110)">
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="#145C46"/>
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#145C46"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
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

  <text x="540" y="700" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="74" font-weight="300" fill="#145C46" letter-spacing="18">LABS</text>

  <g transform="translate(540, 770)">
    <rect x="-240" y="0" width="480" height="42" rx="21" fill="#E8F5EE" stroke="#A3D4C1" stroke-width="1.2"/>
    <text x="0" y="27" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="800" fill="#145C46" letter-spacing="4">PREMIUM SYNTHESIS LINE</text>
  </g>
</svg>`;
  }

  if (type === 'seal_hplc') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2048" height="2048" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="goldGrad3" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="70%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#FDE68A"/>
    </linearGradient>
    <radialGradient id="sealBg3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#145C46"/>
      <stop offset="70%" stop-color="#0B382A"/>
      <stop offset="100%" stop-color="#041712"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1080" fill="#04120E"/>
  <circle cx="540" cy="540" r="480" fill="url(#sealBg3)" stroke="url(#goldGrad3)" stroke-width="6"/>
  <circle cx="540" cy="540" r="455" stroke="url(#goldGrad3)" stroke-width="2" stroke-dasharray="5,8" fill="none"/>

  <path id="curveTop3" d="M 180 540 A 360 360 0 0 1 900 540" fill="none"/>
  <text font-family="'Inter', -apple-system, sans-serif" font-size="36" font-weight="800" fill="#FDE68A" letter-spacing="10">
    <textPath href="#curveTop3" startOffset="50%" text-anchor="middle">
      ★ CERTIFIED PHARMACEUTICAL GRADE ★
    </textPath>
  </text>

  <g transform="translate(540, 480) scale(1.3) translate(-230, -110)">
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="#FFFFFF"/>
    <g transform="translate(155, 0)">
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="#FFFFFF"/>
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
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

  <g transform="translate(540, 680)">
    <rect x="-180" y="0" width="360" height="48" rx="24" fill="#04120E" stroke="url(#goldGrad3)" stroke-width="2"/>
    <text x="0" y="32" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="22" font-weight="900" fill="#FDE68A" letter-spacing="4">&gt;99% HPLC PURITY</text>
  </g>

  <path id="curveBottom3" d="M 900 540 A 360 360 0 0 1 180 540" fill="none"/>
  <text font-family="'Inter', -apple-system, sans-serif" font-size="34" font-weight="700" fill="#34D399" letter-spacing="10">
    <textPath href="#curveBottom3" startOffset="50%" text-anchor="middle">
      PSL LABS • SÃO PAULO • BRASIL
    </textPath>
  </text>
</svg>`;
  }

  if (type === 'helix_icon') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="2048" height="2048" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad4" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#145C46"/>
      <stop offset="60%" stop-color="#08281E"/>
      <stop offset="100%" stop-color="#03120E"/>
    </radialGradient>
    <filter id="glow4" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="24" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1080" height="1080" fill="url(#bgGrad4)"/>
  <circle cx="540" cy="540" r="490" stroke="#34D399" stroke-width="4" stroke-opacity="0.4" fill="none"/>
  <circle cx="540" cy="540" r="472" stroke="#145C46" stroke-width="2" fill="none"/>

  <circle cx="540" cy="520" r="320" fill="#145C46" opacity="0.6" filter="url(#glow4)"/>

  <g transform="translate(540, 520) scale(4.4) translate(-72, -92)">
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

  <g transform="translate(540, 960)">
    <text x="0" y="0" text-anchor="middle" font-family="'Inter', -apple-system, sans-serif" font-size="44" font-weight="900" fill="#34D399" letter-spacing="12">PSL LABS</text>
  </g>
</svg>`;
  }
}

// Master list of logos to render
const items = [
  // 1. Horizontal 4K (4000 x 1800)
  {
    name: 'psl_logo_4k_transparente',
    type: 'horizontal',
    theme: 'transparent',
    w: 4000,
    h: 1800,
    transparentBg: true,
    svg: getHorizontalSvg('transparent'),
    label: 'Logo Oficial 4K (Fundo Transparente)'
  },
  {
    name: 'psl_logo_4k_fundo_branco',
    type: 'horizontal',
    theme: 'white',
    w: 4000,
    h: 1800,
    transparentBg: false,
    svg: getHorizontalSvg('white'),
    label: 'Logo Oficial 4K (Fundo Branco)'
  },
  {
    name: 'psl_logo_4k_dark_luxury',
    type: 'horizontal',
    theme: 'dark',
    w: 4000,
    h: 1800,
    transparentBg: false,
    svg: getHorizontalSvg('dark'),
    label: 'Logo Oficial 4K (Dark Luxury)'
  },
  {
    name: 'psl_logo_4k_branco_transparente',
    type: 'horizontal',
    theme: 'white_transparent',
    w: 4000,
    h: 1800,
    transparentBg: true,
    svg: getHorizontalSvg('white_transparent'),
    label: 'Logo Oficial 4K (Todo Branco / Transparente)'
  },

  // 2. Compact 4K (3680 x 1200)
  {
    name: 'psl_logo_compacto_transparente',
    type: 'compact',
    theme: 'transparent',
    w: 3680,
    h: 1200,
    transparentBg: true,
    svg: getCompactSvg('transparent'),
    label: 'Logo Compacto / Rótulo (Fundo Transparente)'
  },
  {
    name: 'psl_logo_compacto_fundo_branco',
    type: 'compact',
    theme: 'white',
    w: 3680,
    h: 1200,
    transparentBg: false,
    svg: getCompactSvg('white'),
    label: 'Logo Compacto / Rótulo (Fundo Branco)'
  },
  {
    name: 'psl_logo_compacto_dark_luxury',
    type: 'compact',
    theme: 'dark',
    w: 3680,
    h: 1200,
    transparentBg: false,
    svg: getCompactSvg('dark'),
    label: 'Logo Compacto / Rótulo (Dark Luxury)'
  },

  // 3. Social 2K (2048 x 2048)
  {
    name: 'psl_social_dark_luxury_2k',
    type: 'social',
    theme: 'dark_luxury',
    w: 2048,
    h: 2048,
    transparentBg: false,
    svg: getSocialSvg('dark_luxury'),
    label: 'Foto de Perfil 2K (Dark Luxury)'
  },
  {
    name: 'psl_social_clinical_white_2k',
    type: 'social',
    theme: 'clinical_white',
    w: 2048,
    h: 2048,
    transparentBg: false,
    svg: getSocialSvg('clinical_white'),
    label: 'Foto de Perfil 2K (Clinical White)'
  },
  {
    name: 'psl_social_selo_hplc_2k',
    type: 'social',
    theme: 'seal_hplc',
    w: 2048,
    h: 2048,
    transparentBg: false,
    svg: getSocialSvg('seal_hplc'),
    label: 'Selo Oficial HPLC >99% Pureza 2K'
  },
  {
    name: 'psl_social_icone_helix_2k',
    type: 'social',
    theme: 'helix_icon',
    w: 2048,
    h: 2048,
    transparentBg: false,
    svg: getSocialSvg('helix_icon'),
    label: 'Ícone Monograma S-Helix 2K'
  }
];

console.log(`Starting High-Definition rendering of ${items.length} logos...`);

items.forEach((item, index) => {
  const svgFilename = `${item.name}.svg`;
  const pngFilename = `${item.name}.png`;

  // 1. Write SVG to brand/hd, web/brand/hd, and artifactDir
  const svgPathBrand = path.resolve('brand/hd', svgFilename);
  const svgPathWeb = path.resolve('web/brand/hd', svgFilename);
  const svgPathArtifact = path.resolve(artifactDir, svgFilename);

  fs.writeFileSync(svgPathBrand, item.svg, 'utf8');
  fs.writeFileSync(svgPathWeb, item.svg, 'utf8');
  fs.writeFileSync(svgPathArtifact, item.svg, 'utf8');

  // 2. Prepare HTML wrapper for Chrome headless
  const tempHtml = path.resolve(`temp_render_${index}.html`);
  const htmlDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${item.w}px; height: ${item.h}px; overflow: hidden; background: ${item.transparentBg ? 'transparent' : '#FFFFFF'}; }
  svg { width: ${item.w}px; height: ${item.h}px; display: block; }
</style>
</head>
<body>
  ${item.svg}
</body>
</html>`;

  fs.writeFileSync(tempHtml, htmlDoc, 'utf8');

  // 3. Render PNG via Chrome
  const pngPathBrand = path.resolve('brand/hd', pngFilename);
  const pngPathWeb = path.resolve('web/brand/hd', pngFilename);
  const pngPathArtifact = path.resolve(artifactDir, pngFilename);

  const bgArg = item.transparentBg ? '--default-background-color=00000000' : '';
  const cmd = `"${chromePath}" --headless --disable-gpu ${bgArg} --screenshot="${pngPathBrand}" --window-size=${item.w},${item.h} --hide-scrollbars "file:///${tempHtml.replace(/\\/g, '/')}"`;

  try {
    execSync(cmd, { stdio: 'pipe' });
    fs.copyFileSync(pngPathBrand, pngPathWeb);
    fs.copyFileSync(pngPathBrand, pngPathArtifact);
    const sizeKb = Math.round(fs.statSync(pngPathBrand).size / 1024);
    console.log(`[${index + 1}/${items.length}] ✅ Rendered ${pngFilename} (${item.w}x${item.h} px - ${sizeKb} KB)`);
  } catch (err) {
    console.error(`Error rendering ${pngFilename}:`, err.message);
  } finally {
    if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
  }
});

console.log('🎉 ALL HIGH DEFINITION LOGO ASSETS SUCCESSFULLY GENERATED!');
