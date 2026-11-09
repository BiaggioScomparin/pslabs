const fs = require('fs');

const products = require('../catalog/psl_products.json');

// Map products to clean objective lines
function getCategoryLine(cat) {
  if (cat.includes("Emagrecimento") || cat.includes("Metabolismo") || cat.includes("Queima") || cat.includes("Gordura") || cat.includes("Amilina") || cat.includes("Inibidor")) {
    return "Metabolismo & Shape";
  }
  if (cat.includes("Regeneração") || cat.includes("Articulações") || cat.includes("Muscular") || cat.includes("Nervoso") || cat.includes("Dor")) {
    return "Regeneração & Articulações";
  }
  if (cat.includes("Longevidade") || cat.includes("Mitocôndria") || cat.includes("Telômeros") || cat.includes("Senolítico") || cat.includes("Detox") || cat.includes("Antioxidante")) {
    return "Longevidade & Biohacking";
  }
  if (cat.includes("Ansiedade") || cat.includes("Humor") || cat.includes("Foco") || cat.includes("Nootrópico") || cat.includes("Sono") || cat.includes("BDNF")) {
    return "Cérebro & Foco";
  }
  if (cat.includes("Beleza") || cat.includes("Pele") || cat.includes("Cabelo") || cat.includes("Colágeno") || cat.includes("Rugas") || cat.includes("Bronzeamento")) {
    return "Estética & Pele";
  }
  if (cat.includes("GH") || cat.includes("Hipertrofia") || cat.includes("Massa")) {
    return "Massa Magra & GH";
  }
  return "Imunidade & Vitalidade";
}

// Enhance product data with clean categories and default doses
const enhancedProducts = products.map(p => {
  const line = getCategoryLine(p.category);
  // Extract number and unit
  const match = p.spec.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|ml)/i);
  let doseNum = 10;
  let doseUnit = "mg";
  if (match) {
    doseNum = parseFloat(match[1]);
    doseUnit = match[2].toLowerCase();
  }
  return {
    ...p,
    line: line,
    doseNum: doseNum,
    doseUnit: doseUnit
  };
});

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PSL Labs — Premium Synthesis Line | Catálogo & Calculadora</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #145C46;
      --primary-dark: #0D4131;
      --primary-light: #E8F5EE;
      --primary-border: #A3D4C1;
      --accent: #10B981;
      --dark: #0F172A;
      --gray-600: #475569;
      --gray-400: #94A3B8;
      --gray-200: #E2E8F0;
      --gray-100: #F1F5F9;
      --bg-page: #F8FAFC;
      --white: #FFFFFF;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 12px -2px rgba(20, 92, 70, 0.08), 0 2px 6px -1px rgba(0,0,0,0.04);
      --shadow-lg: 0 10px 25px -3px rgba(20, 92, 70, 0.12), 0 4px 10px -2px rgba(0,0,0,0.04);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    body {
      background-color: var(--bg-page);
      color: var(--dark);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Header */
    header {
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }

    .header-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      cursor: pointer;
    }

    .logo-badge {
      display: flex;
      flex-direction: column;
    }

    .logo-title {
      font-size: 26px;
      font-weight: 900;
      color: var(--primary);
      letter-spacing: 2px;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .logo-title span.labs {
      font-weight: 400;
      letter-spacing: 4px;
    }

    .logo-subtitle {
      font-size: 8px;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 3.8px;
      margin-top: 4px;
    }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Tabs Pill */
    .tab-pills {
      display: flex;
      background: var(--gray-100);
      padding: 4px;
      border-radius: 30px;
    }

    .tab-btn {
      padding: 8px 18px;
      border: none;
      background: transparent;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--gray-600);
      border-radius: 24px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tab-btn.active {
      background: var(--primary);
      color: var(--white);
      box-shadow: 0 2px 8px rgba(20, 92, 70, 0.25);
    }

    /* Tier Switcher B2C vs B2B */
    .tier-box {
      display: flex;
      align-items: center;
      background: var(--primary-light);
      border: 1px solid var(--primary-border);
      border-radius: 30px;
      padding: 3px;
    }

    .tier-btn {
      padding: 6px 14px;
      border: none;
      background: transparent;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-dark);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .tier-btn.active {
      background: var(--primary);
      color: var(--white);
    }

    /* Cart Header Button */
    .cart-btn {
      background: var(--dark);
      color: var(--white);
      border: none;
      padding: 9px 18px;
      border-radius: 30px;
      font-size: 13.5px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    .cart-btn:hover {
      transform: translateY(-1px);
    }

    .cart-badge {
      background: var(--accent);
      color: var(--white);
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 800;
    }

    /* Hero / Announcement Bar */
    .flash-banner {
      background: linear-gradient(90deg, #064E3B 0%, #145C46 50%, #064E3B 100%);
      color: var(--white);
      padding: 10px 20px;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.3px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .flash-pill {
      background: rgba(255, 255, 255, 0.2);
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    /* Main Container */
    .main-wrap {
      max-width: 1280px;
      margin: 24px auto;
      padding: 0 20px 80px 20px;
    }

    /* Controls Bar: Search & Categories */
    .controls-panel {
      background: var(--white);
      padding: 20px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-200);
      margin-bottom: 24px;
    }

    .search-row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .search-input-wrap {
      flex: 1;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 13px 18px 13px 44px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 14.5px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: var(--primary);
    }

    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
      font-size: 16px;
    }

    /* Category Chips */
    .category-chips {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .category-chips::-webkit-scrollbar {
      height: 4px;
    }
    .category-chips::-webkit-scrollbar-thumb {
      background: var(--gray-200);
      border-radius: 4px;
    }

    .chip-btn {
      white-space: nowrap;
      padding: 8px 16px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      color: var(--gray-600);
      font-size: 13px;
      font-weight: 600;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .chip-btn:hover {
      border-color: var(--primary);
      color: var(--primary);
    }

    .chip-btn.active {
      background: var(--primary);
      color: var(--white);
      border-color: var(--primary);
    }

    /* Products Grid */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-lg);
      padding: 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
      position: relative;
    }

    .product-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: var(--primary-border);
    }

    .card-top {
      margin-bottom: 14px;
    }

    .card-badges {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .line-tag {
      font-size: 11px;
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 4px 10px;
      border-radius: 14px;
      letter-spacing: 0.3px;
    }

    .purity-badge {
      font-size: 10.5px;
      font-weight: 700;
      color: #065F46;
      background: #D1FAE5;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .product-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--dark);
      line-height: 1.25;
      margin-bottom: 6px;
    }

    .product-spec {
      font-size: 12.5px;
      color: var(--gray-600);
      font-weight: 500;
      margin-bottom: 12px;
    }

    .product-desc {
      font-size: 12.5px;
      color: var(--gray-600);
      line-height: 1.45;
      margin-bottom: 16px;
      min-height: 38px;
    }

    .card-pricing {
      background: var(--gray-100);
      padding: 12px 14px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
    }

    .price-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .price-value {
      font-size: 24px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.1;
      margin: 2px 0;
    }

    .price-sub {
      font-size: 11.5px;
      color: #059669;
      font-weight: 600;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    .btn-add {
      flex: 1;
      padding: 11px;
      border: none;
      background: var(--primary);
      color: var(--white);
      border-radius: var(--radius-md);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .btn-add:hover {
      background: var(--primary-dark);
    }

    .btn-calc-shortcut {
      padding: 11px 14px;
      border: 1.5px solid var(--primary-border);
      background: var(--white);
      color: var(--primary);
      border-radius: var(--radius-md);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-calc-shortcut:hover {
      background: var(--primary-light);
    }

    /* Calculator View */
    .calc-view {
      display: none;
    }

    .calc-container {
      background: var(--white);
      border-radius: var(--radius-lg);
      border: 1px solid var(--gray-200);
      box-shadow: var(--shadow-md);
      padding: 32px;
      max-width: 900px;
      margin: 0 auto;
    }

    .calc-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .calc-title {
      font-size: 26px;
      font-weight: 900;
      color: var(--primary);
      margin-bottom: 8px;
    }

    .calc-subtitle {
      font-size: 14.5px;
      color: var(--gray-600);
      max-width: 580px;
      margin: 0 auto;
    }

    .calc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-bottom: 32px;
    }

    @media (max-width: 768px) {
      .calc-grid {
        grid-template-columns: 1fr;
      }
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-label {
      font-size: 13px;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }

    .input-label span.hint {
      font-weight: 400;
      color: var(--gray-400);
    }

    .select-box, .text-box {
      width: 100%;
      padding: 12px 14px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 14.5px;
      font-weight: 600;
      outline: none;
      background: var(--white);
    }

    .select-box:focus, .text-box:focus {
      border-color: var(--primary);
    }

    /* Syringe SVG Visualizer */
    .syringe-card {
      background: var(--gray-100);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .result-badge {
      background: var(--primary);
      color: var(--white);
      padding: 12px 24px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
      width: 100%;
    }

    .result-units {
      font-size: 34px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    .result-desc {
      font-size: 13px;
      opacity: 0.95;
    }

    .syringe-svg-wrap {
      width: 100%;
      max-width: 380px;
      margin: 14px 0;
    }

    .yield-stat {
      font-size: 13px;
      font-weight: 600;
      color: var(--gray-600);
      margin-top: 10px;
    }

    /* Step by step didactic guide */
    .guide-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid var(--gray-200);
    }

    @media (max-width: 650px) {
      .guide-steps {
        grid-template-columns: 1fr;
      }
    }

    .step-box {
      background: var(--white);
      padding: 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--gray-200);
    }

    .step-num {
      width: 28px;
      height: 28px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      margin-bottom: 10px;
    }

    .step-title {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 4px;
      color: var(--dark);
    }

    .step-text {
      font-size: 12px;
      color: var(--gray-600);
      line-height: 1.45;
    }

    /* Cart Modal / Drawer */
    .cart-drawer-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 200;
      display: none;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .cart-drawer {
      position: fixed;
      top: 0;
      right: -480px;
      bottom: 0;
      width: 100%;
      max-width: 460px;
      background: var(--white);
      z-index: 210;
      box-shadow: -5px 0 30px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .cart-drawer.open {
      right: 0;
    }

    .cart-drawer-backdrop.open {
      display: block;
      opacity: 1;
    }

    .cart-header {
      padding: 20px;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cart-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--dark);
    }

    .btn-close-cart {
      background: transparent;
      border: none;
      font-size: 22px;
      color: var(--gray-400);
      cursor: pointer;
    }

    .cart-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--gray-100);
      gap: 12px;
    }

    .item-meta {
      flex: 1;
    }

    .item-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--dark);
    }

    .item-sub {
      font-size: 12px;
      color: var(--gray-600);
    }

    .item-price {
      font-size: 14px;
      font-weight: 800;
      color: var(--primary);
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-qty {
      width: 26px;
      height: 26px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
      font-size: 14px;
    }

    .cart-footer {
      padding: 20px;
      border-top: 1px solid var(--gray-200);
      background: var(--bg-page);
    }

    .shipping-select-wrap {
      margin-bottom: 16px;
    }

    .shipping-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: var(--white);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .shipping-option.selected {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .shipping-text {
      flex: 1;
    }

    .shipping-title {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--dark);
    }

    .shipping-desc {
      font-size: 11px;
      color: var(--gray-600);
    }

    .client-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 13px;
      margin-bottom: 8px;
      outline: none;
    }

    .client-input:focus {
      border-color: var(--primary);
    }

    .cart-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-top: 10px;
    }

    .cart-total-label {
      font-size: 15px;
      font-weight: 700;
      color: var(--dark);
    }

    .cart-total-val {
      font-size: 24px;
      font-weight: 900;
      color: var(--primary);
    }

    .btn-checkout-whatsapp {
      width: 100%;
      background: #25D366;
      color: var(--white);
      border: none;
      padding: 15px;
      border-radius: var(--radius-md);
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background 0.15s ease;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
    }

    .btn-checkout-whatsapp:hover {
      background: #1EBE5D;
    }

    /* Floating WhatsApp Icon */
    .whatsapp-support-pill {
      position: fixed;
      bottom: 24px;
      left: 24px;
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: 30px;
      padding: 10px 18px;
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--dark);
      text-decoration: none;
      z-index: 90;
      transition: transform 0.15s ease;
    }

    .whatsapp-support-pill:hover {
      transform: translateY(-2px);
    }

    .status-dot {
      width: 9px;
      height: 9px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }

    /* Config Modal (WhatsApp number) */
    .cfg-modal-btn {
      font-size: 11px;
      color: var(--gray-400);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
      display: block;
      margin-top: 8px;
      text-align: center;
      width: 100%;
    }
  </style>
</head>
<body>

  <!-- Top Announcement Bar -->
  <div class="flash-banner">
    <span class="flash-pill">⚡ PSL Flash SP</span>
    <span>Entrega no mesmo dia em até <strong>2 Horas</strong> em São Paulo (Capital e Grande SP) via Uber Moto / Flash!</span>
    <span style="opacity: 0.6;">•</span>
    <span>Envios diários via Sedex para todo o Brasil</span>
  </div>

  <!-- Header -->
  <header>
    <div class="header-container">
      <div class="brand-logo" onclick="switchView('catalog')">
        <div class="logo-badge">
          <div class="logo-title">
            PSL <span class="labs">LABS</span>
          </div>
          <div class="logo-subtitle">PREMIUM SYNTHESIS LINE</div>
        </div>
      </div>

      <div class="header-nav">
        <!-- Main Navigation Pills -->
        <div class="tab-pills">
          <button class="tab-btn active" id="tab-nav-catalog" onclick="switchView('catalog')">
            📦 Catálogo
          </button>
          <button class="tab-btn" id="tab-nav-calc" onclick="switchView('calc')">
            💉 Calculadora de Doses
          </button>
        </div>

        <!-- Tier Switcher B2C vs B2B -->
        <div class="tier-box">
          <button class="tier-btn active" id="tier-b2c" onclick="setTier('b2c')">
            👤 Consumidor (Kit)
          </button>
          <button class="tier-btn" id="tier-b2b" onclick="setTier('b2b')">
            💼 Atacado (10 un)
          </button>
        </div>

        <!-- Cart Button -->
        <button class="cart-btn" onclick="toggleCart(true)">
          🛒 Pedido <span class="cart-badge" id="cart-badge-count">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Wrap -->
  <div class="main-wrap">

    <!-- CATALOG VIEW -->
    <div id="catalog-view">
      <!-- Search & Filters -->
      <div class="controls-panel">
        <div class="search-row">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" id="search-input" class="search-input" placeholder="Buscar por peptídeo ou dose (ex: BPC-157, Retatrutide, 10mg, NAD+)..." oninput="filterProducts()">
          </div>
        </div>
        <div class="category-chips" id="category-chips">
          <button class="chip-btn active" onclick="setCategory('TODOS')">🔥 Todos (117)</button>
          <button class="chip-btn" onclick="setCategory('Metabolismo & Shape')">⚡ Metabolismo & Emagrecimento</button>
          <button class="chip-btn" onclick="setCategory('Regeneração & Articulações')">🩹 Regeneração & Articulações</button>
          <button class="chip-btn" onclick="setCategory('Longevidade & Biohacking')">🧬 Longevidade & Biohacking</button>
          <button class="chip-btn" onclick="setCategory('Cérebro & Foco')">🧠 Cérebro, Foco & Humor</button>
          <button class="chip-btn" onclick="setCategory('Estética & Pele')">✨ Estética, Pele & Colágeno</button>
          <button class="chip-btn" onclick="setCategory('Massa Magra & GH')">💪 Massa Magra & GH</button>
          <button class="chip-btn" onclick="setCategory('Imunidade & Vitalidade')">🛡️ Imunidade & Vitalidade</button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" id="products-grid"></div>
    </div>

    <!-- CALCULATOR VIEW (PEPTIDE COMPANION) -->
    <div id="calc-view" class="calc-view">
      <div class="calc-container">
        <div class="calc-header">
          <h2 class="calc-title">💉 Calculadora de Reconstituição & Doses</h2>
          <p class="calc-subtitle">Elimine qualquer dúvida de diluição e saiba exatamente quantos tracinhos puxar na sua seringa de insulina com segurança.</p>
        </div>

        <div class="calc-grid">
          <!-- Left: Inputs -->
          <div class="calc-inputs">
            <div class="input-group">
              <label class="input-label">1. Selecione o Peptídeo ou Concentração do Frasco</label>
              <select id="calc-peptide-select" class="select-box" onchange="onPeptideSelectChange()">
                <option value="10">Retatrutide / Tirzepatide (10 mg)</option>
                <option value="5">BPC-157 / Semax (5 mg)</option>
                <option value="10" selected>BPC-157 / TB-500 (10 mg)</option>
                <option value="20">BPC-157 / TB-500 Blend (20 mg)</option>
                <option value="500">NAD+ (500 mg)</option>
                <option value="100">GHK-Cu Blue Copper (100 mg)</option>
                <option value="custom">Outro valor manual...</option>
              </select>
            </div>

            <div class="input-group" id="manual-mg-wrap" style="display: none;">
              <label class="input-label">Quantidade de pó no frasco (mg)</label>
              <input type="number" id="calc-vial-mg" class="text-box" value="10" min="0.1" step="0.1" oninput="calculateDose()">
            </div>

            <div class="input-group">
              <label class="input-label">
                2. Volume de Água Bacteriostática adicionada
                <span class="hint">ml</span>
              </label>
              <select id="calc-water-ml" class="select-box" onchange="calculateDose()">
                <option value="1">1.0 ml (Mais concentrado)</option>
                <option value="2" selected>2.0 ml (Padrão recomendado)</option>
                <option value="2.5">2.5 ml</option>
                <option value="3">3.0 ml (Mais suave)</option>
                <option value="5">5.0 ml</option>
              </select>
            </div>

            <div class="input-group">
              <label class="input-label">
                3. Dose Desejada por Aplicação
                <span class="hint" id="calc-dose-unit-hint">mcg ou mg</span>
              </label>
              <div style="display: flex; gap: 8px;">
                <input type="number" id="calc-dose-amount" class="text-box" value="500" min="1" step="1" oninput="calculateDose()">
                <select id="calc-dose-unit" class="select-box" style="width: 100px;" onchange="calculateDose()">
                  <option value="mcg" selected>mcg</option>
                  <option value="mg">mg</option>
                </select>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">4. Tipo de Seringa de Insulina Utilizada</label>
              <select id="calc-syringe-type" class="select-box" onchange="calculateDose()">
                <option value="100" selected>Seringa U-100 (1.0 ml = 100 Unidades)</option>
                <option value="50">Seringa U-50 (0.5 ml = 50 Unidades)</option>
                <option value="30">Seringa U-30 (0.3 ml = 30 Unidades)</option>
              </select>
            </div>
          </div>

          <!-- Right: Syringe Visualizer & Result -->
          <div class="calc-results">
            <div class="syringe-card">
              <div class="result-badge">
                <div class="price-label" style="color: rgba(255,255,255,0.8);">Puxe na sua seringa até:</div>
                <div class="result-units" id="res-units">10 UI</div>
                <div class="result-desc" id="res-units-desc">10 Unidades de Insulina</div>
              </div>

              <!-- Interactive Syringe SVG -->
              <div class="syringe-svg-wrap">
                <svg id="syringe-svg" viewBox="0 0 320 80" width="100%" height="80">
                  <!-- Syringe Barrel -->
                  <rect x="30" y="20" width="230" height="40" rx="4" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
                  <!-- Fluid Level Fill -->
                  <rect id="syringe-fluid" x="30" y="22" width="46" height="36" fill="#10B981" opacity="0.75"/>
                  <!-- Plunger Stem & Stopper -->
                  <rect id="syringe-plunger" x="76" y="16" width="6" height="48" fill="#145C46" rx="2"/>
                  <rect id="syringe-rod" x="78" y="36" width="140" height="8" fill="#94A3B8"/>
                  <rect id="syringe-thumb" x="218" y="22" width="12" height="36" rx="3" fill="#64748B"/>
                  <!-- Needle Hub & Needle -->
                  <polygon points="30,28 16,36 16,44 30,52" fill="#94A3B8"/>
                  <line x1="16" y1="40" x2="0" y2="40" stroke="#64748B" stroke-width="2"/>
                  <!-- Measurement Lines -->
                  <g stroke="#475569" stroke-width="1.5">
                    <line x1="30" y1="20" x2="30" y2="32"/>
                    <line x1="76" y1="20" x2="76" y2="30"/>
                    <line x1="122" y1="20" x2="122" y2="30"/>
                    <line x1="168" y1="20" x2="168" y2="30"/>
                    <line x1="214" y1="20" x2="214" y2="30"/>
                    <line x1="260" y1="20" x2="260" y2="32"/>
                  </g>
                  <!-- Labels -->
                  <text x="30" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">0</text>
                  <text x="76" y="14" font-size="9" font-weight="700" fill="#145C46" text-anchor="middle">20</text>
                  <text x="145" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">50</text>
                  <text x="260" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">100 UI</text>
                </svg>
              </div>

              <div class="yield-stat" id="res-yield">
                Rendimento do Frasco: <strong>20 aplicações</strong>
              </div>
              <div style="font-size: 11.5px; color: #059669; font-weight: 600; margin-top: 4px;" id="res-concentration">
                Concentração: 5.0 mg por ml (ou 500 mcg a cada 10 UI)
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Step Didactic Protocol -->
        <div class="guide-steps">
          <div class="step-box">
            <div class="step-num">1</div>
            <div class="step-title">Injeção Suave da Água</div>
            <div class="step-text">Introduza a água bacteriostática escorrendo lentamente pelas paredes do vidro do frasco. Nunca jogue o jato direto sobre o pó.</div>
          </div>
          <div class="step-box">
            <div class="step-num">2</div>
            <div class="step-title">Dissolução sem Chacoalhar</div>
            <div class="step-text">Faça movimentos circulares suaves e lentos com o frasco. Peptídeos são frágeis e quebram se forem agitados com força.</div>
          </div>
          <div class="step-box">
            <div class="step-num">3</div>
            <div class="step-title">Refrigeração Imediata</div>
            <div class="step-text">Após reconstituído, guarde obrigatoriamente na geladeira entre 2°C e 8°C. Não congele a solução já diluída.</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Cart Drawer -->
  <div class="cart-drawer-backdrop" id="cart-backdrop" onclick="toggleCart(false)"></div>
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-header">
      <div class="cart-title">🛍️ Seu Pedido PSL Labs</div>
      <button class="btn-close-cart" onclick="toggleCart(false)">✕</button>
    </div>

    <div class="cart-body" id="cart-items-wrap">
      <div style="text-align: center; color: var(--gray-400); margin-top: 60px;">
        Seu carrinho está vazio.<br>Escolha os peptídeos no catálogo.
      </div>
    </div>

    <div class="cart-footer">
      <!-- Shipping Selector -->
      <div class="shipping-select-wrap">
        <label class="input-label" style="margin-bottom: 6px;">Forma de Entrega Desejada:</label>
        
        <div class="shipping-option selected" id="ship-uber" onclick="setShipping('uber')">
          <input type="radio" name="shipping" checked>
          <div class="shipping-text">
            <div class="shipping-title">⚡ Uber Moto / Flash — São Paulo (Até 2h)</div>
            <div class="shipping-desc">Capital e Grande SP (Taxa calculada no fechamento)</div>
          </div>
        </div>

        <div class="shipping-option" id="ship-sedex" onclick="setShipping('sedex')">
          <input type="radio" name="shipping">
          <div class="shipping-text">
            <div class="shipping-title">📦 Correios Sedex — Todo o Brasil (2 a 5 dias)</div>
            <div class="shipping-desc">Embalagem protetora e código de rastreio</div>
          </div>
        </div>
      </div>

      <!-- Client Info Form -->
      <input type="text" id="client-name" class="client-input" placeholder="Seu Nome Completo">
      <input type="text" id="client-address" class="client-input" placeholder="Endereço / Bairro ou CEP de Entrega">

      <!-- Total & Action -->
      <div class="cart-total-row">
        <span class="cart-total-label">Total do Pedido:</span>
        <span class="cart-total-val" id="cart-total-display">R$ 0,00</span>
      </div>

      <button class="btn-checkout-whatsapp" onclick="checkoutWhatsApp()">
        <span>💬 Enviar Pedido via WhatsApp</span>
      </button>

      <button class="cfg-modal-btn" onclick="promptWhatsappNumber()">
        ⚙️ Configurar número de WhatsApp de recebimento
      </button>
    </div>
  </div>

  <!-- WhatsApp Floating Pill -->
  <a href="javascript:void(0)" class="whatsapp-support-pill" onclick="directSupportWhatsApp()">
    <span class="status-dot"></span>
    <span>Dúvidas? Fale com a PSL Labs</span>
  </a>

  <!-- Embedded Product Database -->
  <script>
    const PSL_PRODUCTS = ${JSON.stringify(enhancedProducts)};
    
    // Application State
    let currentTier = 'b2c'; // 'b2c' or 'b2b'
    let currentCategory = 'TODOS';
    let currentShipping = 'uber';
    let cart = {}; // { productCode: qty }
    let sellerWhatsapp = localStorage.getItem('psl_seller_wa') || '5511999999999';

    function promptWhatsappNumber() {
      const num = prompt("Digite o número do WhatsApp com DDD (apenas números, ex: 5511999999999):", sellerWhatsapp);
      if (num && num.trim()) {
        sellerWhatsapp = num.replace(/\\D/g, '');
        localStorage.setItem('psl_seller_wa', sellerWhatsapp);
        alert("Número de WhatsApp salvo com sucesso!");
      }
    }

    function switchView(view) {
      const catView = document.getElementById('catalog-view');
      const calcView = document.getElementById('calc-view');
      const tabCat = document.getElementById('tab-nav-catalog');
      const tabCalc = document.getElementById('tab-nav-calc');

      if (view === 'catalog') {
        catView.style.display = 'block';
        calcView.style.display = 'none';
        tabCat.classList.add('active');
        tabCalc.classList.remove('active');
      } else {
        catView.style.display = 'none';
        calcView.style.display = 'block';
        tabCat.classList.remove('active');
        tabCalc.classList.add('active');
        calculateDose();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setTier(tier) {
      currentTier = tier;
      document.getElementById('tier-b2c').classList.toggle('active', tier === 'b2c');
      document.getElementById('tier-b2b').classList.toggle('active', tier === 'b2b');
      renderProducts();
      renderCart();
    }

    function setCategory(cat) {
      currentCategory = cat;
      const buttons = document.querySelectorAll('.chip-btn');
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(cat) || (cat === 'TODOS' && btn.textContent.includes('Todos')));
      });
      filterProducts();
    }

    function filterProducts() {
      const q = document.getElementById('search-input').value.toLowerCase().trim();
      const filtered = PSL_PRODUCTS.filter(p => {
        const matchesCategory = currentCategory === 'TODOS' || p.line === currentCategory;
        const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      });
      renderProducts(filtered);
    }

    function renderProducts(list = PSL_PRODUCTS) {
      const grid = document.getElementById('products-grid');
      grid.innerHTML = '';

      if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--gray-400);">Nenhum produto encontrado para sua busca.</div>';
        return;
      }

      list.forEach(item => {
        const isB2B = currentTier === 'b2b';
        const price = isB2B ? item.b2bBoxPrice : item.suggestedPriceB2C;
        const priceLabel = isB2B ? "Preço Atacado (Caixa c/ 10):" : "Valor do Kit Pronto (1 Frasco):";
        const priceSub = isB2B ? "R$ " + (price / 10).toFixed(2) + " por frasco" : "✓ Água Bacteriostática Inclusa";

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = \`
          <div class="card-top">
            <div class="card-badges">
              <span class="line-tag">\${item.line}</span>
              <span class="purity-badge">Pureza &gt;99% HPLC</span>
            </div>
            <h3 class="product-title">\${item.name}</h3>
            <div class="product-spec">\${item.spec}</div>
            <p class="product-desc">\${item.category}</p>
          </div>

          <div>
            <div class="card-pricing">
              <div class="price-label">\${priceLabel}</div>
              <div class="price-value">R$ \${price.toFixed(2).replace('.', ',')}</div>
              <div class="price-sub">\${priceSub}</div>
            </div>

            <div class="card-actions">
              <button class="btn-add" onclick="addToCart('\${item.code}')">
                <span>Adicionar</span> +
              </button>
              <button class="btn-calc-shortcut" title="Calcular Diluição na Seringa" onclick="openCalcForProduct('\${item.name}', \${item.doseNum}, '\${item.doseUnit}')">
                💉 Dose
              </button>
            </div>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    // Cart Management
    function addToCart(code) {
      cart[code] = (cart[code] || 0) + 1;
      updateCartCount();
      renderCart();
      toggleCart(true);
    }

    function changeQty(code, delta) {
      if (!cart[code]) return;
      cart[code] += delta;
      if (cart[code] <= 0) {
        delete cart[code];
      }
      updateCartCount();
      renderCart();
    }

    function updateCartCount() {
      const count = Object.values(cart).reduce((a, b) => a + b, 0);
      document.getElementById('cart-badge-count').textContent = count;
    }

    function toggleCart(open) {
      const drawer = document.getElementById('cart-drawer');
      const backdrop = document.getElementById('cart-backdrop');
      if (open) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
      } else {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
      }
    }

    function setShipping(type) {
      currentShipping = type;
      document.getElementById('ship-uber').classList.toggle('selected', type === 'uber');
      document.getElementById('ship-sedex').classList.toggle('selected', type === 'sedex');
      const radioUber = document.querySelector('#ship-uber input');
      const radioSedex = document.querySelector('#ship-sedex input');
      if (radioUber) radioUber.checked = type === 'uber';
      if (radioSedex) radioSedex.checked = type === 'sedex';
    }

    function renderCart() {
      const wrap = document.getElementById('cart-items-wrap');
      const totalDisplay = document.getElementById('cart-total-display');
      const codes = Object.keys(cart);

      if (codes.length === 0) {
        wrap.innerHTML = '<div style="text-align: center; color: var(--gray-400); margin-top: 60px;">Seu carrinho está vazio.<br>Escolha os produtos no catálogo.</div>';
        totalDisplay.textContent = 'R$ 0,00';
        return;
      }

      let total = 0;
      let html = '';

      codes.forEach(code => {
        const item = PSL_PRODUCTS.find(p => p.code === code);
        if (!item) return;
        const qty = cart[code];
        const isB2B = currentTier === 'b2b';
        const unitPrice = isB2B ? item.b2bBoxPrice : item.suggestedPriceB2C;
        const sub = unitPrice * qty;
        total += sub;

        html += \`
          <div class="cart-item">
            <div class="item-meta">
              <div class="item-name">\${item.name} (\${item.doseNum}\${item.doseUnit})</div>
              <div class="item-sub">\${isB2B ? 'Caixa com 10 frascos' : 'Kit Frasco c/ Água Bacteriostática'}</div>
              <div class="item-price">R$ \${unitPrice.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="qty-controls">
              <button class="btn-qty" onclick="changeQty('\${code}', -1)">-</button>
              <span style="font-weight: 700; font-size: 13.5px; width: 18px; text-align: center;">\${qty}</span>
              <button class="btn-qty" onclick="changeQty('\${code}', 1)">+</button>
            </div>
          </div>
        \`;
      });

      wrap.innerHTML = html;
      totalDisplay.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

    function checkoutWhatsApp() {
      const codes = Object.keys(cart);
      if (codes.length === 0) {
        alert("Adicione pelo menos um produto antes de finalizar!");
        return;
      }

      const clientName = document.getElementById('client-name').value.trim() || 'Cliente';
      const clientAddress = document.getElementById('client-address').value.trim() || 'A combinar';
      const isB2B = currentTier === 'b2b';
      let total = 0;

      let msg = "*NOVO PEDIDO — PSL LABS (Premium Synthesis Line)*\\n";
      msg += "*Modalidade:* " + (isB2B ? "Revendedor / Atacado (Caixa c/ 10)" : "Consumidor Final (Kit Pronto)") + "\\n";
      msg += "-----------------------------------------\\n";
      msg += "*ITENS SELECIONADOS:*\\n";

      codes.forEach(code => {
        const item = PSL_PRODUCTS.find(p => p.code === code);
        const qty = cart[code];
        const unitPrice = isB2B ? item.b2bBoxPrice : item.suggestedPriceB2C;
        const sub = unitPrice * qty;
        total += sub;
        msg += "• " + qty + "x " + item.name + " " + item.doseNum + item.doseUnit + " = R$ " + sub.toFixed(2).replace('.', ',') + "\\n";
      });

      msg += "-----------------------------------------\\n";
      msg += "*TOTAL DO PEDIDO:* R$ " + total.toFixed(2).replace('.', ',') + "\\n\\n";
      msg += "*FORMA DE ENTREGA:* " + (currentShipping === 'uber' ? "⚡ Uber Moto / Flash (São Paulo - até 2h)" : "📦 Correios Sedex (Todo Brasil)") + "\\n";
      msg += "*NOME:* " + clientName + "\\n";
      msg += "*ENDEREÇO / CIDADE:* " + clientAddress + "\\n\\n";
      msg += "Gostaria de confirmar a disponibilidade e a chave Pix para pagamento!";

      const encoded = encodeURI(msg);
      window.open("https://wa.me/" + sellerWhatsapp + "?text=" + encoded, "_blank");
    }

    function directSupportWhatsApp() {
      const msg = encodeURI("Olá, PSL Labs! Gostaria de tirar dúvidas sobre os peptídeos e entregas.");
      window.open("https://wa.me/" + sellerWhatsapp + "?text=" + msg, "_blank");
    }

    // CALCULATOR LOGIC
    function openCalcForProduct(name, doseNum, doseUnit) {
      switchView('calc');
      const select = document.getElementById('calc-peptide-select');
      const manualWrap = document.getElementById('manual-mg-wrap');
      const manualInput = document.getElementById('calc-vial-mg');

      let found = false;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value == doseNum && doseUnit === 'mg') {
          select.selectedIndex = i;
          found = true;
          break;
        }
      }

      if (!found) {
        select.value = 'custom';
        manualWrap.style.display = 'block';
        manualInput.value = doseUnit === 'mcg' ? (doseNum / 1000) : doseNum;
      } else {
        manualWrap.style.display = 'none';
      }

      calculateDose();
    }

    function onPeptideSelectChange() {
      const val = document.getElementById('calc-peptide-select').value;
      const manualWrap = document.getElementById('manual-mg-wrap');
      if (val === 'custom') {
        manualWrap.style.display = 'block';
      } else {
        manualWrap.style.display = 'none';
      }
      calculateDose();
    }

    function calculateDose() {
      const selectVal = document.getElementById('calc-peptide-select').value;
      let vialMg = selectVal === 'custom' ? parseFloat(document.getElementById('calc-vial-mg').value) || 10 : parseFloat(selectVal);

      const waterMl = parseFloat(document.getElementById('calc-water-ml').value) || 2.0;
      let targetDose = parseFloat(document.getElementById('calc-dose-amount').value) || 500;
      const doseUnit = document.getElementById('calc-dose-unit').value;
      const syringeMaxUi = parseFloat(document.getElementById('calc-syringe-type').value) || 100;

      // Convert target dose to mg
      const targetDoseMg = doseUnit === 'mcg' ? targetDose / 1000 : targetDose;

      // Concentration in mg/ml
      const concentrationMgPerMl = vialMg / waterMl;

      // Required volume in ml
      const neededMl = targetDoseMg / concentrationMgPerMl;

      // Units in U-100 syringe (100 units = 1.0 ml)
      // For U-50, 50 units = 0.5 ml (still 100 units/ml)
      const units = neededMl * 100;

      // Yield
      const totalDoses = Math.floor(vialMg / targetDoseMg);

      // Display
      const roundedUnits = Math.round(units * 10) / 10;
      document.getElementById('res-units').textContent = roundedUnits + " UI";
      document.getElementById('res-units-desc').textContent = roundedUnits + " Unidades na seringa de insulina";
      document.getElementById('res-yield').innerHTML = "Rendimento do Frasco: <strong>" + totalDoses + " aplicações</strong>";
      document.getElementById('res-concentration').textContent = "Concentração: " + concentrationMgPerMl.toFixed(2) + " mg/ml (" + (concentrationMgPerMl * 10).toFixed(0) + " mcg a cada 10 UI)";

      // Update Syringe SVG visualization
      updateSyringeSvg(roundedUnits, syringeMaxUi);
    }

    function updateSyringeSvg(units, maxUnits) {
      const fluid = document.getElementById('syringe-fluid');
      const plunger = document.getElementById('syringe-plunger');
      const rod = document.getElementById('syringe-rod');
      const thumb = document.getElementById('syringe-thumb');

      // Clamped ratio between 0 and 1
      const ratio = Math.min(Math.max(units / maxUnits, 0), 1);
      const barrelWidth = 230;
      const filledWidth = Math.max(ratio * barrelWidth, 4);

      if (fluid) fluid.setAttribute('width', filledWidth);
      if (plunger) plunger.setAttribute('x', 30 + filledWidth);
      if (rod) rod.setAttribute('x', 30 + filledWidth + 2);
      if (thumb) thumb.setAttribute('x', 30 + filledWidth + 140);
    }

    // Initialize
    renderProducts();
    calculateDose();
  </script>
</body>
</html>
`;

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/web/index.html", htmlContent, "utf8");
console.log("Web Application generated successfully with 117 products and interactive calculator.");
