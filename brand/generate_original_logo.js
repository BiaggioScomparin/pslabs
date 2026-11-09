const fs = require('fs');

// Generates the faithful high-resolution monochrome vector matching the user's uploaded original logo
const originalLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 350" width="100%" height="100%">
  <!-- Solid Pure Black Background -->
  <rect width="1000" height="350" fill="#000000"/>

  <g transform="translate(60, 60)">
    <!-- Main Typography Lockup: PSL LABS in Pure White -->
    
    <!-- P -->
    <path d="M 0 0 L 76 0 C 112 0 134 18 134 50 C 134 82 112 100 76 100 L 40 100 L 40 160 L 0 160 Z M 40 32 L 40 68 L 72 68 C 88 68 94 61 94 50 C 94 39 88 32 72 32 Z" fill="#FFFFFF"/>

    <!-- S with Vertical DNA Double Helix Integrated -->
    <g transform="translate(150, 0)">
      <!-- S Letter Form Silhouette with precise central cutouts -->
      <path d="M 120 32 C 110 22 96 14 78 14 C 52 14 36 26 36 44 C 36 62 54 72 84 80 C 122 90 142 108 142 134 C 142 165 116 182 76 182 C 46 182 22 170 8 152 L 32 128 C 42 142 58 150 76 150 C 98 150 108 140 108 126 C 108 110 92 102 62 94 C 26 84 4 68 4 42 C 4 14 32 -2 74 -2 C 100 -2 122 8 136 20 Z" fill="#FFFFFF"/>
      
      <!-- DNA Double Helix intertwining through the S spine in Pure White -->
      <g stroke="#000000" stroke-width="7" fill="none" stroke-linecap="round">
        <!-- Strand A cut -->
        <path d="M 46 18 Q 74 54 102 90 T 46 162" />
        <!-- Strand B cut -->
        <path d="M 102 18 Q 74 54 46 90 T 102 162" />
      </g>
      
      <!-- White Helix Strands and Base Pair Rungs -->
      <g stroke="#FFFFFF" stroke-width="4.5" fill="none" stroke-linecap="round">
        <!-- Strand 1 -->
        <path d="M 46 18 Q 74 54 102 90 T 46 162" />
        <!-- Strand 2 -->
        <path d="M 102 18 Q 74 54 46 90 T 102 162" />
        
        <!-- Base pair bridges (rungs) -->
        <line x1="56" y1="36" x2="92" y2="36" stroke-width="3.5"/>
        <line x1="68" y1="62" x2="80" y2="62" stroke-width="3.5"/>
        <line x1="68" y1="118" x2="80" y2="118" stroke-width="3.5"/>
        <line x1="56" y1="144" x2="92" y2="144" stroke-width="3.5"/>
      </g>
    </g>

    <!-- L -->
    <path d="M 314 0 L 354 0 L 354 126 L 434 126 L 434 160 L 314 160 Z" fill="#FFFFFF"/>

    <!-- Spacing Gap between PSL and LABS -->

    <!-- LABS -->
    <g transform="translate(480, 0)">
      <!-- L -->
      <path d="M 0 0 L 26 0 L 26 134 L 88 134 L 88 160 L 0 160 Z" fill="#FFFFFF"/>
      
      <!-- A -->
      <path d="M 142 0 L 170 0 L 222 160 L 194 160 L 183 124 L 129 124 L 118 160 L 90 160 Z M 137 98 L 175 98 L 156 34 Z" fill="#FFFFFF"/>
      
      <!-- B -->
      <path d="M 246 0 L 302 0 C 324 0 340 12 340 34 C 340 48 330 60 316 66 C 334 72 346 86 346 108 C 346 134 326 160 298 160 L 246 160 Z M 272 26 L 272 68 L 298 68 C 308 68 314 60 314 47 C 314 34 308 26 298 26 Z M 272 92 L 272 134 L 300 134 C 312 134 320 124 320 113 C 320 102 312 92 300 92 Z" fill="#FFFFFF"/>
      
      <!-- S -->
      <path d="M 438 34 C 428 22 414 14 398 14 C 378 14 366 24 366 38 C 366 52 378 60 402 66 C 432 74 448 88 448 112 C 448 138 426 162 394 162 C 370 162 350 152 338 136 L 358 116 C 368 128 380 136 394 136 C 410 136 420 126 420 114 C 420 100 408 92 386 86 C 358 78 340 64 340 40 C 340 18 362 -2 396 -2 C 418 -2 436 6 450 18 Z" fill="#FFFFFF"/>
    </g>

    <!-- Subtitle: PREMIUM SYNTHESIS LINE (Pure White, Bold, Wide Spacing) -->
    <text x="2" y="222" font-family="'Arial', 'Montserrat', 'Inter', sans-serif" font-size="34" font-weight="700" letter-spacing="14" fill="#FFFFFF">
      PREMIUM SYNTHESIS LINE
    </text>
  </g>
</svg>
`;

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_original_faithful.svg", originalLogoSvg.trim(), "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/brain/e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2/logo_original_faithful.svg", originalLogoSvg.trim(), "utf8");
console.log("Faithful original logo SVG generated successfully.");
