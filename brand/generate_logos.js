const fs = require('fs');

// 1. Refined Primary Horizontal Logo (Dark Background)
const logoPrimarySvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" width="100%" height="100%">
  <defs>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#0077FE" />
    </linearGradient>
    <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>
    <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="240" fill="#080B10" rx="16"/>

  <g transform="translate(60, 45)">
    <!-- 'P' -->
    <path d="M 0 0 L 46 0 C 68 0 82 12 82 32 C 82 52 68 64 46 64 L 24 64 L 24 100 L 0 100 Z M 24 20 L 24 44 L 44 44 C 52 44 58 39 58 32 C 58 25 52 20 44 20 Z" fill="#FFFFFF"/>

    <!-- 'S' with Integrated Modern DNA Double Helix -->
    <g transform="translate(92, 0)">
      <!-- S Base Back Silhouette -->
      <path d="M 68 20 C 62 14 53 10 42 10 C 26 10 16 18 16 29 C 16 41 28 47 48 52 C 72 58 84 69 84 83 C 84 101 68 111 44 111 C 26 111 12 103 4 92 L 18 78 C 24 87 33 92 44 92 C 58 92 64 86 64 77 C 64 67 52 61 33 56 C 12 50 0 40 0 25 C 0 8 18 -1 42 -1 C 58 -1 71 5 79 12 Z" fill="#FFFFFF"/>
      
      <!-- DNA Helix Ribbon Core Accent overlay -->
      <g stroke="url(#cyanGlow)" stroke-width="3.5" fill="none" stroke-linecap="round">
        <!-- Strand 1 -->
        <path d="M 22 15 Q 42 35 62 55 T 22 95" />
        <!-- Strand 2 -->
        <path d="M 62 15 Q 42 35 22 55 T 62 95" />
        <!-- Base Pairs (rungs) -->
        <line x1="28" y1="24" x2="56" y2="24" stroke-width="2.5" opacity="0.85"/>
        <line x1="38" y1="42" x2="46" y2="42" stroke-width="2.5" opacity="0.85"/>
        <line x1="38" y1="68" x2="46" y2="68" stroke-width="2.5" opacity="0.85"/>
        <line x1="28" y1="86" x2="56" y2="86" stroke-width="2.5" opacity="0.85"/>
      </g>
    </g>

    <!-- 'L' -->
    <path d="M 188 0 L 212 0 L 212 80 L 260 80 L 260 100 L 188 100 Z" fill="#FFFFFF"/>

    <!-- Separator Dot / Pulse -->
    <circle cx="282" cy="50" r="4.5" fill="url(#cyanGlow)" filter="url(#neonBlur)" />

    <!-- 'LABS' Modern Geometric Light Weight -->
    <g transform="translate(306, 0)">
      <!-- L -->
      <path d="M 0 0 L 16 0 L 16 84 L 54 84 L 54 100 L 0 100 Z" fill="url(#silverGrad)"/>
      <!-- A -->
      <path d="M 88 0 L 106 0 L 138 100 L 121 100 L 114 77 L 80 77 L 73 100 L 56 100 Z M 85 61 L 109 61 L 97 21 Z" fill="url(#silverGrad)"/>
      <!-- B -->
      <path d="M 152 0 L 186 0 C 199 0 209 7 209 21 C 209 30 203 37 194 40 C 206 43 213 52 213 65 C 213 81 200 100 183 100 L 152 100 Z M 168 16 L 168 42 L 184 42 C 190 42 194 37 194 29 C 194 21 190 16 184 16 Z M 168 57 L 168 84 L 185 84 C 192 84 197 78 197 70 C 197 62 192 57 185 57 Z" fill="url(#silverGrad)"/>
      <!-- S -->
      <path d="M 271 21 C 265 15 257 11 247 11 C 235 11 228 17 228 25 C 228 34 236 38 251 42 C 270 47 280 55 280 69 C 280 85 267 101 246 101 C 231 101 220 95 212 85 L 223 73 C 229 81 237 86 246 86 C 256 86 263 80 263 71 C 263 62 255 57 240 53 C 223 48 213 39 213 26 C 213 11 227 0 247 0 C 260 0 270 5 278 12 Z" fill="url(#silverGrad)"/>
    </g>

    <!-- Subtitle: PREMIUM SYNTHESIS LINE -->
    <text x="3" y="138" font-family="'Inter', 'Montserrat', 'Segoe UI', sans-serif" font-size="22" font-weight="700" letter-spacing="9" fill="#94A3B8">
      PREMIUM SYNTHESIS LINE
    </text>

    <!-- Tech Accent Bar -->
    <rect x="0" y="148" width="588" height="2" fill="url(#cyanGlow)" opacity="0.6"/>
  </g>
</svg>
`;

// 2. Biotech Seal / Cap Icon / Favicon (Circular Holographic Emblem)
const logoEmblemSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="50%" stop-color="#0B0F19" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#1E293B" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00F0FF" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <!-- Outer Ring (Vial Seal / Cap Badge) -->
  <circle cx="150" cy="150" r="142" fill="url(#bgGrad)" stroke="url(#ringGrad)" stroke-width="4"/>
  <circle cx="150" cy="150" r="130" fill="none" stroke="#1E293B" stroke-dasharray="4,4" stroke-width="2"/>

  <!-- Molecular Hex Nodes -->
  <polygon points="150,38 238,89 238,191 150,242 62,191 62,89" fill="none" stroke="#1E293B" stroke-width="1.5"/>

  <!-- Central Helix S Motif -->
  <g transform="translate(110, 80)">
    <!-- Stylized S -->
    <path d="M 58 15 C 53 10 46 7 37 7 C 23 7 15 14 15 23 C 15 33 25 38 42 42 C 63 47 73 56 73 68 C 73 83 59 91 38 91 C 22 91 10 84 3 75 L 15 63 C 20 70 28 75 38 75 C 50 75 56 70 56 62 C 56 54 46 49 29 45 C 10 40 0 32 0 20 C 0 6 15 -1 36 -1 C 50 -1 61 4 68 10 Z" fill="#FFFFFF"/>
    
    <!-- Luminous DNA Strands -->
    <g stroke="url(#cyanGrad)" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M 20 12 Q 38 28 56 46 T 20 80" />
      <path d="M 56 12 Q 38 28 20 46 T 56 80" />
      <line x1="26" y1="20" x2="50" y2="20" stroke-width="2"/>
      <line x1="33" y1="36" x2="43" y2="36" stroke-width="2"/>
      <line x1="33" y1="56" x2="43" y2="56" stroke-width="2"/>
      <line x1="26" y1="72" x2="50" y2="72" stroke-width="2"/>
    </g>
  </g>

  <!-- Curvilinear Text Top & Bottom -->
  <text x="150" y="215" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="800" letter-spacing="4" fill="#00E5FF">
    PSL LABS
  </text>
  <text x="150" y="232" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="600" letter-spacing="3" fill="#94A3B8">
    PURITY VERIFIED &gt;99%
  </text>
</svg>
`;

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_primary.svg", logoPrimarySvg.trim(), "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/brand/logo_emblem.svg", logoEmblemSvg.trim(), "utf8");
console.log("Logos generated successfully.");
