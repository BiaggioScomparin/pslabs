const fs = require('fs');

const primaryColor = "#145C46"; // Official PSL Emerald Forest Green

function getSvg(isDark, isTransparent) {
  const bg = isDark ? primaryColor : (isTransparent ? "none" : "#FFFFFF");
  const mainColor = isDark ? "#FFFFFF" : primaryColor;
  const helixWhite = isDark ? primaryColor : "#FFFFFF";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 450" width="100%" height="100%">
  ${bg !== "none" ? `<rect width="1000" height="450" fill="${bg}"/>` : ""}

  <g transform="translate(60, 100)">
    <!-- PSL Group (Bold Heavy Weight) -->
    
    <!-- Letter P -->
    <path d="M 0 0 L 82 0 C 118 0 140 18 140 50 C 140 82 118 100 82 100 L 42 100 L 42 160 L 0 160 Z M 42 34 L 42 66 L 78 66 C 92 66 98 59 98 50 C 98 41 92 34 78 34 Z" fill="${mainColor}"/>

    <!-- Letter S with Integrated Organic DNA Double Helix -->
    <g transform="translate(155, 0)">
      <!-- Base S Silhouette -->
      <path d="M 126 34 C 114 20 98 12 78 12 C 50 12 34 24 34 42 C 34 62 54 72 84 80 C 124 90 144 108 144 136 C 144 168 116 186 74 186 C 42 186 18 172 4 150 L 32 124 C 42 138 56 148 74 148 C 96 148 106 138 106 124 C 106 108 90 100 60 92 C 24 82 0 66 0 38 C 0 12 28 -4 74 -4 C 98 -4 122 6 136 20 Z" fill="${mainColor}"/>

      <!-- DNA Helix Ribbon Top & Bottom Extended Curves -->
      <!-- Top extended helix tail -->
      <path d="M 50 -18 Q 72 -36 88 -26 Q 96 -20 92 -4" fill="none" stroke="${mainColor}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 88 -18 Q 74 -34 60 -24 Q 54 -18 58 -4" fill="none" stroke="${mainColor}" stroke-width="4.5" stroke-linecap="round"/>

      <!-- Inner DNA Cutout Track and Ladder Steps (Rungs) -->
      <g stroke="${helixWhite}" stroke-linecap="round">
        <!-- Vertical DNA Strands crossing over the green S -->
        <path d="M 50 4 Q 74 46 98 88 T 50 172" fill="none" stroke-width="5"/>
        <path d="M 98 4 Q 74 46 50 88 T 98 172" fill="none" stroke-width="5"/>

        <!-- Base-pair rungs inside S -->
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

    <!-- LABS Group (Clean, Medium/Light Stroke Weight) -->
    <g transform="translate(492, 0)">
      <!-- L -->
      <path d="M 0 0 L 20 0 L 20 138 L 76 138 L 76 160 L 0 160 Z" fill="${mainColor}"/>

      <!-- A -->
      <path d="M 126 0 L 150 0 L 202 160 L 178 160 L 168 126 L 110 126 L 100 160 L 76 160 Z M 116 104 L 162 104 L 138 28 Z" fill="${mainColor}"/>

      <!-- B -->
      <path d="M 224 0 L 274 0 C 298 0 314 12 314 34 C 314 48 304 58 290 64 C 308 70 320 84 320 106 C 320 134 300 160 270 160 L 224 160 Z M 246 22 L 246 68 L 270 68 C 282 68 290 60 290 48 C 290 36 282 22 270 22 Z M 246 90 L 246 138 L 272 138 C 286 138 296 128 296 114 C 296 100 286 90 272 90 Z" fill="${mainColor}"/>

      <!-- S -->
      <path d="M 406 32 C 394 18 380 12 364 12 C 344 12 334 22 334 36 C 334 50 346 58 368 64 C 396 72 414 84 414 110 C 414 138 392 162 360 162 C 336 162 318 150 306 134 L 324 114 C 334 128 346 138 360 138 C 374 138 388 128 388 114 C 388 98 376 90 354 84 C 326 76 308 62 308 38 C 308 14 330 -2 364 -2 C 386 -2 402 6 418 20 Z" fill="${mainColor}"/>
    </g>

    <!-- Subtitle: PREMIUM SYNTHESIS LINE -->
    <text x="3" y="228" font-family="'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="14.8" fill="${mainColor}">
      PREMIUM SYNTHESIS LINE
    </text>
  </g>
</svg>
`;
}

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_approved_white_bg.svg", getSvg(false, false), "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_approved_transparent.svg", getSvg(false, true), "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_approved_dark_bg.svg", getSvg(true, false), "utf8");

// Also copy to artifacts brain folder
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/brain/e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2/logo_approved_white_bg.svg", getSvg(false, false), "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/brain/e0561d2d-a3d7-43f1-bf80-a35a5a6ee8a2/logo_approved_dark_bg.svg", getSvg(true, false), "utf8");

console.log("Approved Emerald Green logos generated successfully.");
