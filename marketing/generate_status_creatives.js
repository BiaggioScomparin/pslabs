const fs = require('fs');
const path = require('path');

// Ensure directories
['marketing', 'web/marketing'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Load official logo base64
const logoB64 = fs.readFileSync('brand/logo_transparent.png').toString('base64');
const logoUri = `data:image/png;base64,${logoB64}`;

// Helper to create 1080x1920 SVG
function buildSVG({ badge, title, subtitle, dose, doseSub, bullets, oldPrice, price, priceSub, freebieBadge, cta, footerLogistics }) {
  const bulletItems = bullets.map((b, i) => `
    <g transform="translate(100, ${820 + i * 90})">
      <circle cx="28" cy="28" r="26" fill="#145C46" opacity="0.35"/>
      <circle cx="28" cy="28" r="24" stroke="#25D366" stroke-width="2.5" fill="none"/>
      <path d="M 18 28 L 25 35 L 38 21" fill="none" stroke="#25D366" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="75" y="36" font-family="'Inter', -apple-system, sans-serif" font-size="30" font-weight="600" fill="#E2E8F0">${b}</text>
    </g>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="540" y1="0" x2="540" y2="1920" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#04120E"/>
      <stop offset="35%" stop-color="#08221A"/>
      <stop offset="70%" stop-color="#0C3427"/>
      <stop offset="100%" stop-color="#051711"/>
    </linearGradient>

    <linearGradient id="cardGrad" x1="0" y1="0" x2="920" y2="1200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0F382B" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#09241C" stop-opacity="0.95"/>
    </linearGradient>

    <linearGradient id="glowGrad" x1="0" y1="0" x2="1080" y2="1920" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#145C46" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#25D366" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#145C46" stop-opacity="0.4"/>
    </linearGradient>

    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F6E05E"/>
      <stop offset="50%" stop-color="#ECC94B"/>
      <stop offset="100%" stop-color="#D69E2E"/>
    </linearGradient>

    <linearGradient id="priceGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E6FFFA"/>
    </linearGradient>

    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>

  <!-- Ambient Light Orbs -->
  <circle cx="540" cy="300" r="450" fill="#145C46" opacity="0.35" filter="url(#glow)"/>
  <circle cx="200" cy="1100" r="380" fill="#0D4433" opacity="0.3" filter="url(#glow)"/>
  <circle cx="850" cy="1500" r="400" fill="#145C46" opacity="0.35" filter="url(#glow)"/>

  <!-- Subtle DNA Helix Background Watermark -->
  <g opacity="0.04" stroke="#FFFFFF" stroke-width="8" fill="none">
    <path d="M 100 0 Q 300 300 500 600 T 900 1200 T 500 1800"/>
    <path d="M 900 0 Q 700 300 500 600 T 100 1200 T 500 1800"/>
    <line x1="200" y1="200" x2="800" y2="200"/>
    <line x1="300" y1="400" x2="700" y2="400"/>
    <line x1="400" y1="600" x2="600" y2="600"/>
    <line x1="300" y1="800" x2="700" y2="800"/>
    <line x1="200" y1="1000" x2="800" y2="1000"/>
    <line x1="300" y1="1200" x2="700" y2="1200"/>
    <line x1="400" y1="1400" x2="600" y2="1400"/>
    <line x1="300" y1="1600" x2="700" y2="1600"/>
  </g>

  <!-- Top Brand Area -->
  <g transform="translate(0, 110)">
    <!-- Logo Container -->
    <rect x="290" y="0" width="500" height="150" rx="20" fill="#FFFFFF" opacity="0.06"/>
    <image href="${logoUri}" x="310" y="15" width="460" height="120" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Top Badges Row -->
  <g transform="translate(0, 290)">
    <!-- Purity Badge -->
    <rect x="140" y="0" width="370" height="54" rx="27" fill="#145C46" fill-opacity="0.8" stroke="#25D366" stroke-width="1.5"/>
    <circle cx="170" cy="27" r="8" fill="#25D366"/>
    <text x="192" y="35" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="700" fill="#FFFFFF" letter-spacing="1.5">HPLC CERTIFIED >99%</text>

    <!-- Shipping Pill -->
    <rect x="530" y="0" width="410" height="54" rx="27" fill="#1E293B" fill-opacity="0.9" stroke="#64748B" stroke-width="1.5"/>
    <text x="560" y="34" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="700" fill="#38BDF8">⚡ PRONTA ENTREGA SP/BR</text>
  </g>

  <!-- Main Hero Card Glassmorphic -->
  <g transform="translate(80, 380)" filter="url(#shadow)">
    <!-- Card Backing -->
    <rect width="920" height="1220" rx="44" fill="url(#cardGrad)" stroke="#1F5A47" stroke-width="2.5"/>
    <rect x="0" y="0" width="920" height="1220" rx="44" fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1"/>

    <!-- Category Tag -->
    <rect x="60" y="55" width="360" height="46" rx="23" fill="#145C46" fill-opacity="0.9"/>
    <text x="80" y="85" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="800" fill="#A7F3D0" letter-spacing="2">${badge}</text>

    ${freebieBadge ? `
    <!-- Freebie Banner Tag -->
    <rect x="440" y="55" width="420" height="46" rx="23" fill="url(#goldGrad)"/>
    <text x="465" y="85" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="900" fill="#04120E" letter-spacing="1.5">${freebieBadge}</text>
    ` : ''}

    <!-- Product Title -->
    <text x="60" y="195" font-family="'Inter', -apple-system, sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-1">${title}</text>
    <text x="60" y="248" font-family="'Inter', -apple-system, sans-serif" font-size="26" font-weight="600" fill="#94A3B8" letter-spacing="1">${subtitle}</text>

    <!-- Big Dosage Showcase Box -->
    <g transform="translate(60, 280)">
      <rect width="800" height="140" rx="28" fill="#061A14" stroke="#16503D" stroke-width="2"/>
      
      <!-- Big Dose Typography -->
      <text x="45" y="98" font-family="'Inter', -apple-system, sans-serif" font-size="78" font-weight="900" fill="#34D399" letter-spacing="-1">${dose}</text>
      
      <!-- Dose Details -->
      <text x="420" y="65" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">${doseSub}</text>
      <text x="420" y="102" font-family="'Inter', -apple-system, sans-serif" font-size="20" font-weight="500" fill="#94A3B8">Água Bacteriostática Inclusa</text>
      
      <!-- Small Vial Icon / Syringe Badge -->
      <circle cx="730" cy="70" r="36" fill="#145C46" opacity="0.6"/>
      <text x="715" y="80" font-family="'Inter', -apple-system, sans-serif" font-size="30" fill="#FFFFFF">🧪</text>
    </g>

    <!-- Section Divider Line -->
    <line x1="60" y1="460" x2="860" y2="460" stroke="#1E4E3E" stroke-width="1.5"/>

    <!-- Clinical Highlights Title -->
    <text x="60" y="505" font-family="'Inter', -apple-system, sans-serif" font-size="22" font-weight="800" fill="#6EE7B7" letter-spacing="3">BENEFÍCIOS &amp; PROTOCOLO</text>
  </g>

  <!-- Bullets inside Hero Card -->
  <g transform="translate(80, 130)">
    ${bulletItems}
  </g>

  <!-- Price & Offer Container Inside Card -->
  <g transform="translate(140, 1140)">
    <rect width="800" height="240" rx="32" fill="#051711" stroke="#25D366" stroke-width="2.5"/>
    
    <!-- Old Price Strike -->
    <text x="50" y="65" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="600" fill="#64748B" text-decoration="line-through">${oldPrice}</text>
    
    <!-- Price Label -->
    <text x="50" y="105" font-family="'Inter', -apple-system, sans-serif" font-size="22" font-weight="800" fill="#34D399" letter-spacing="2">OFERTA EXCLUSIVA</text>

    <!-- Huge Final Price -->
    <text x="50" y="185" font-family="'Inter', -apple-system, sans-serif" font-size="82" font-weight="900" fill="url(#priceGrad)" letter-spacing="-2">${price}</text>

    <!-- Conditions Pill -->
    <rect x="520" y="70" width="230" height="100" rx="20" fill="#145C46" fill-opacity="0.5" stroke="#25D366" stroke-width="1"/>
    <text x="550" y="112" font-family="'Inter', -apple-system, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">À VISTA PIX</text>
    <text x="550" y="145" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="600" fill="#A7F3D0">ou Cartão Crédito</text>
    
    <text x="50" y="218" font-family="'Inter', -apple-system, sans-serif" font-size="19" font-weight="600" fill="#94A3B8">${priceSub}</text>
  </g>

  <!-- CTA Box (Bottom) -->
  <g transform="translate(80, 1630)" filter="url(#shadow)">
    <!-- Pulsing WhatsApp Green Button -->
    <rect width="920" height="120" rx="30" fill="#25D366"/>
    
    <!-- WhatsApp Icon Bubble -->
    <circle cx="85" cy="60" r="32" fill="#FFFFFF"/>
    <text x="70" y="72" font-family="'Inter', -apple-system, sans-serif" font-size="36" fill="#128C7E">💬</text>

    <!-- CTA Text -->
    <text x="145" y="72" font-family="'Inter', -apple-system, sans-serif" font-size="34" font-weight="900" fill="#04120E" letter-spacing="0.5">${cta}</text>
  </g>

  <!-- Shipping / Trust Footer Row -->
  <g transform="translate(0, 1795)">
    <!-- Logistics Bullet 1 -->
    <rect x="80" y="0" width="440" height="70" rx="18" fill="#0A2219" stroke="#164A38" stroke-width="1.5"/>
    <text x="110" y="44" font-family="'Inter', -apple-system, sans-serif" font-size="21" font-weight="700" fill="#38BDF8">🛵 Uber Flash SP: até 2h</text>

    <!-- Logistics Bullet 2 -->
    <rect x="560" y="0" width="440" height="70" rx="18" fill="#0A2219" stroke="#164A38" stroke-width="1.5"/>
    <text x="590" y="44" font-family="'Inter', -apple-system, sans-serif" font-size="21" font-weight="700" fill="#A7F3D0">📦 Sedex Térmico Brasil</text>

    <!-- Security Micro-copy -->
    <text x="540" y="102" font-family="'Inter', -apple-system, sans-serif" font-size="18" font-weight="600" fill="#64748B" text-anchor="middle">PSL Labs · Premium Synthesis Line · Pureza Farmacêutica Testada</text>
  </g>
</svg>
`;
}

// 1. Data for Status 1: Retatrutida 60 MG
const status1SVG = buildSVG({
  badge: "METABOLISMO & SHAPE",
  title: "RETATRUTIDA",
  subtitle: "Agonista Triplo GLP-1 / GIP / Glucagon",
  dose: "60 MG",
  doseSub: "Dose de Altíssimo Rendimento",
  bullets: [
    "Máxima Saciedade & Aceleração Metabólica",
    "Queima Intensa de Gordura Visceral",
    "Frasco com 60mg: dura semanas de ciclo",
    "Grau de Pureza Farmacêutica >99% HPLC",
    "Acompanha Água Bacteriostática Inclusa"
  ],
  oldPrice: "De R$ 580,00",
  price: "R$ 450,00",
  priceSub: "Frasco com 60mg + Kit Diluição Completo",
  freebieBadge: null,
  cta: "RESPONDA ESTE STATUS E PEÇA O SEU",
  footerLogistics: "Envio Imediato SP 2h ou Sedex BR"
});

// 2. Data for Status 2: GHK-Cu 50 MG
const status2SVG = buildSVG({
  badge: "ESTÉTICA & LONGEVIDADE",
  title: "GHK - CU",
  subtitle: "Peptídeo de Cobre Puro Padrão-Ouro",
  dose: "50 MG",
  doseSub: "Estimulador Biológico de Colágeno",
  bullets: [
    "Estimula Colágeno Tipos I e III Profundo",
    "Firmeza, Elasticidade e Rejuvenescimento",
    "Ação Antioxidante, Capilar & Cicatricial",
    "Grau de Pureza Farmacêutica >99% HPLC",
    "Acompanha Água Bacteriostática Inclusa"
  ],
  oldPrice: "De R$ 340,00",
  price: "R$ 250,00",
  priceSub: "Frasco com 50mg + Kit Diluição Completo",
  freebieBadge: "COLÁGENO MÁXIMO",
  cta: "RESPONDA ESTE STATUS E PEÇA O SEU",
  footerLogistics: "Envio Imediato SP 2h ou Sedex BR"
});

// 3. Data for Status 3: Combo VIP (2x Retatrutida 60 MG + 1x GHK-Cu 50 MG Grátis)
const status3SVG = buildSVG({
  badge: "COMBO DEFINIÇÃO + PELE",
  title: "COMBO DUPLO VIP",
  subtitle: "2x Retatrutida 60mg + 1x GHK-Cu Grátis",
  dose: "2x 60MG",
  doseSub: "+ 1x GHK-Cu 50mg DE BRINDE",
  bullets: [
    "Emagreça e Queime Gordura sem Flacidez",
    "O GHK-Cu preserva o Colágeno e Firmeza",
    "120mg Totais de Retatrutida (Protocolo VIP)",
    "🎁 ECONOMIA REAL DE R$ 250,00 NO BRINDE",
    "Acompanha 3 Águas Bacteriostáticas"
  ],
  oldPrice: "Valor Total: R$ 1.150,00",
  price: "R$ 900,00",
  priceSub: "2x Retatrutida (R$ 450 cada) + GHK-Cu de Graça",
  freebieBadge: "🎁 BRINDE R$ 250 GRÁTIS",
  cta: "RESPONDA \"COMBO\" E GARANTA O SEU",
  footerLogistics: "Apenas 4 Combos Pronta-Entrega"
});

// Save SVG files
fs.writeFileSync('marketing/status_1_retatrutida_60mg.svg', status1SVG);
fs.writeFileSync('marketing/status_2_ghkcu_50mg.svg', status2SVG);
fs.writeFileSync('marketing/status_3_combo_vip.svg', status3SVG);

fs.writeFileSync('web/marketing/status_1_retatrutida_60mg.svg', status1SVG);
fs.writeFileSync('web/marketing/status_2_ghkcu_50mg.svg', status2SVG);
fs.writeFileSync('web/marketing/status_3_combo_vip.svg', status3SVG);

console.log('✅ SVGs successfully created in marketing/ and web/marketing/!');

// Texts for WhatsApp
const copy1 = `⚡ *RETATRUTIDA 60MG | PSL LABS* ⚡
_O mais potente agonista triplo (GLP-1 / GIP / Glucagon)_

🔥 *Por que a Retatrutida é o padrão-ouro atual?*
• Ação combinada de queima de gordura visceral acelerada
• Saciedade prolongada e controle metabólico de pico
• *Frasco com 60 MG*: altíssimo rendimento para semanas de protocolo
• Pureza farmacêutica testada (>99% HPLC)
• *Água bacteriostática inclusa sem custo adicional*

💰 *OFERTA ESPECIAL STATUS:*
De: ~R$ 580,00~
👉 Por apenas: *R$ 450,00* (à vista no Pix ou Cartão)

🛵 *ENTREGA EXPRESS:*
• São Paulo e Grande SP: *em até 2h via Uber Flash*
• Todo o Brasil: *Sedex térmico com gelo e isopor*

📲 _Responda este status ou chame no privado para reservar o seu frasco pronta-entrega!_`;

const copy2 = `💎 *GHK-CU 50MG (PEPTÍDEO DE COBRE) | PSL LABS* 💎
_O padrão-ouro do rejuvenescimento celular e síntese de colágeno_

✨ *Principais Benefícios Clínicos:*
• Estimula massivamente a produção de colágeno Tipo I e Tipo III
• Restaura a elasticidade, viço e firmeza profunda da pele
• Potente ação antioxidante, cicatrizante e regeneradora tecidual
• Grau farmacêutico >99% HPLC com laudo
• *Água bacteriostática inclusa no kit*

💰 *OFERTA ESPECIAL STATUS:*
De: ~R$ 340,00~
👉 Por apenas: *R$ 250,00* (frasco de 50mg completo)

🛵 *ENTREGAS:*
• SP Capital e Região: *Uber Flash em até 2 horas*
• Envio Nacional: *Sedex com embalagem térmica*

📲 _Poucas unidades no estoque pronta-entrega. Responda este status para garantir!_`;

const copy3 = `🔥 *COMBO VIP DEFINIÇÃO + PELE FIRME | PSL LABS* 🔥
_Compre 2 Retatrutidas 60mg e GANHE 1 GHK-Cu 50mg de BRINDE!_

🎯 *O protocolo sinérgico mais procurado:*
Ao perder peso rápido com a Retatrutida, o GHK-Cu entra como o protetor estético número 1, blindando a pele contra flacidez e estimulando colágeno profundo.

📦 *O que vem no Combo:*
• 2x Frascos de Retatrutida 60mg (120mg totais)
• 🎁 *1x Frasco de GHK-Cu 50mg TOTALMENTE DE GRAÇA (Economia de R$ 250,00)*
• 3x Frascos de Água Bacteriostática inclusos

💰 *VALOR PROMOCIONAL DO COMBO:*
Valor avulso total: ~R$ 1.150,00~
👉 *Leva tudo por: R$ 900,00*
_(Você paga só as 2 Retatrutidas a R$ 450 cada e o GHK-Cu de R$ 250 sai de presente!)_

⚡ *Apenas 4 combos disponíveis para envio imediato hoje.*
🛵 SP: Entrega em até 2h via Uber Moto / Flash
📦 Brasil: Sedex Térmico

📲 _Responda *COMBO* aqui no privado para travar o seu kit!_`;

// Build HTML Hub with Interactive Canvas / Download PNG
const htmlHub = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Divulgações de Status WhatsApp | PSL Labs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #145C46;
      --primary-dark: #0A2E23;
      --primary-light: #EBF5F1;
      --accent: #25D366;
      --gray-900: #0F172A;
      --gray-800: #1E293B;
      --gray-700: #334155;
      --gray-600: #475569;
      --gray-300: #CBD5E1;
      --gray-100: #F1F5F9;
      --white: #FFFFFF;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #0B1914;
      color: #F8FAFC;
      min-height: 100vh;
      padding: 30px 16px 80px;
    }
    .header-hub {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 40px;
    }
    .brand-logo-img {
      height: 48px;
      width: auto;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 28px;
      font-weight: 900;
      color: var(--white);
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 15px;
      color: #94A3B8;
      line-height: 1.5;
    }
    .grid-status {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .status-card {
      background: #11261F;
      border: 1px solid #1A4D3B;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
    .card-header-bar {
      padding: 16px 20px;
      background: #0A1E18;
      border-bottom: 1px solid #1A4D3B;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .status-badge {
      font-size: 12px;
      font-weight: 800;
      color: #34D399;
      background: #145C46;
      padding: 4px 12px;
      border-radius: 100px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .preview-box {
      background: #000;
      position: relative;
      width: 100%;
      aspect-ratio: 9/16;
      max-height: 540px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .preview-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--white);
      margin-bottom: 6px;
    }
    .card-offer-highlight {
      font-size: 14px;
      font-weight: 700;
      color: #34D399;
      margin-bottom: 16px;
    }
    .copy-box {
      background: #0A1E18;
      border: 1px solid #1E4636;
      border-radius: 10px;
      padding: 14px;
      font-size: 12px;
      color: #CBD5E1;
      white-space: pre-wrap;
      font-family: monospace;
      max-height: 140px;
      overflow-y: auto;
      margin-bottom: 16px;
      user-select: all;
    }
    .actions-row {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: auto;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
      border: none;
    }
    .btn-download {
      background: #25D366;
      color: #04120E;
    }
    .btn-download:hover {
      background: #22BF5B;
      transform: translateY(-1px);
    }
    .btn-copy {
      background: #145C46;
      color: #FFFFFF;
      border: 1px solid #25D366;
    }
    .btn-copy:hover {
      background: #1B7A5D;
    }
    .btn-open {
      background: transparent;
      color: #94A3B8;
      border: 1px solid #334155;
    }
    .btn-open:hover {
      background: #1E293B;
      color: #FFFFFF;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #25D366;
      color: #04120E;
      font-weight: 800;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 100px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 999;
    }
    .toast.show {
      opacity: 1;
    }
  </style>
</head>
<body>

  <div class="header-hub">
    <img src="/brand/logo_transparent.png" onerror="this.onerror=null; this.src='/logo.png';" alt="PSL Labs" class="brand-logo-img">
    <h1>Divulgações Prontas para WhatsApp Status</h1>
    <p class="subtitle">3 artes verticais (proporção 9:16 oficial de Status/Stories) em altíssima definição + textos persuasivos de alta conversão para postar e enviar no privado.</p>
  </div>

  <div class="grid-status">
    
    <!-- CARD 1 -->
    <div class="status-card">
      <div class="card-header-bar">
        <span class="status-badge">Status 1 · Queima Extrema</span>
        <span style="font-size: 12px; color: #94A3B8;">9:16 (1080x1920)</span>
      </div>
      <div class="preview-box">
        <img src="status_1_retatrutida_60mg.svg" alt="Status 1 - Retatrutida 60mg" id="img-status-1">
      </div>
      <div class="card-body">
        <div class="card-title">Retatrutida 60 MG</div>
        <div class="card-offer-highlight">R$ 450,00 · Frasco Alto Rendimento</div>
        
        <div class="copy-box" id="copy-1">${copy1.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

        <div class="actions-row">
          <button class="btn btn-download" onclick="downloadImage('status_1_retatrutida_60mg.svg', 'PSL_Status_1_Retatrutida_60mg.png')">
            📥 Baixar Imagem (1080x1920 PNG)
          </button>
          <button class="btn btn-copy" onclick="copyText('copy-1')">
            📋 Copiar Texto Formatado
          </button>
          <a href="status_1_retatrutida_60mg.svg" target="_blank" class="btn btn-open">
            🔍 Abrir Arte em Tela Cheia
          </a>
        </div>
      </div>
    </div>

    <!-- CARD 2 -->
    <div class="status-card">
      <div class="card-header-bar">
        <span class="status-badge">Status 2 · Colágeno & Firmeza</span>
        <span style="font-size: 12px; color: #94A3B8;">9:16 (1080x1920)</span>
      </div>
      <div class="preview-box">
        <img src="status_2_ghkcu_50mg.svg" alt="Status 2 - GHK-Cu 50mg" id="img-status-2">
      </div>
      <div class="card-body">
        <div class="card-title">GHK - Cu 50 MG</div>
        <div class="card-offer-highlight">R$ 250,00 · Rejuvenescimento Celular</div>
        
        <div class="copy-box" id="copy-2">${copy2.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

        <div class="actions-row">
          <button class="btn btn-download" onclick="downloadImage('status_2_ghkcu_50mg.svg', 'PSL_Status_2_GHKCu_50mg.png')">
            📥 Baixar Imagem (1080x1920 PNG)
          </button>
          <button class="btn btn-copy" onclick="copyText('copy-2')">
            📋 Copiar Texto Formatado
          </button>
          <a href="status_2_ghkcu_50mg.svg" target="_blank" class="btn btn-open">
            🔍 Abrir Arte em Tela Cheia
          </a>
        </div>
      </div>
    </div>

    <!-- CARD 3 -->
    <div class="status-card">
      <div class="card-header-bar">
        <span class="status-badge" style="background: #D97706; color: #FFF;">Status 3 · Combo VIP</span>
        <span style="font-size: 12px; color: #94A3B8;">9:16 (1080x1920)</span>
      </div>
      <div class="preview-box">
        <img src="status_3_combo_vip.svg" alt="Status 3 - Combo VIP" id="img-status-3">
      </div>
      <div class="card-body">
        <div class="card-title">2x Retatrutida 60MG + GHK-Cu GRÁTIS</div>
        <div class="card-offer-highlight" style="color: #FCD34D;">R$ 900,00 · Economia Real de R$ 250,00</div>
        
        <div class="copy-box" id="copy-3">${copy3.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

        <div class="actions-row">
          <button class="btn btn-download" onclick="downloadImage('status_3_combo_vip.svg', 'PSL_Status_3_Combo_Duplo_GHK_Gratis.png')">
            📥 Baixar Imagem (1080x1920 PNG)
          </button>
          <button class="btn btn-copy" onclick="copyText('copy-3')">
            📋 Copiar Texto Formatado
          </button>
          <a href="status_3_combo_vip.svg" target="_blank" class="btn btn-open">
            🔍 Abrir Arte em Tela Cheia
          </a>
        </div>
      </div>
    </div>

  </div>

  <div id="toast" class="toast">Texto copiado para a área de transferência!</div>

  <script>
    function copyText(elementId) {
      const text = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        showToast("Texto copiado! Só colar no WhatsApp.");
      }).catch(err => {
        showToast("Selecione e copie manualmente.");
      });
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // Direct SVG to High-Res 1080x1920 PNG canvas exporter
    function downloadImage(svgUrl, filename) {
      showToast("Renderizando imagem em 1080x1920... Aguarde.");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#051711';
        ctx.fillRect(0, 0, 1080, 1920);
        ctx.drawImage(img, 0, 0, 1080, 1920);
        
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Download da imagem iniciado!");
      };
      img.src = svgUrl;
    }
  </script>
</body>
</html>
`;

fs.writeFileSync('marketing/index.html', htmlHub);
fs.writeFileSync('marketing/status_whatsapp.html', htmlHub);
fs.writeFileSync('web/marketing/index.html', htmlHub);
fs.writeFileSync('web/marketing/status_whatsapp.html', htmlHub);

console.log('✅ Marketing Hub HTML successfully created in marketing/ and web/marketing/!');
