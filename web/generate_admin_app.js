const fs = require('fs');

// Reads compound data from generate_web_app logic
const rawProducts = require('../catalog/psl_products.json');

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

function getParentCompound(item) {
  const n = item.name.trim();

  if (n.startsWith("BPC") && n.includes("TB")) return { id: "bpc-tb", name: "Blend BPC-157 + TB-500", desc: "Super combo de regeneração tecidual acelerada para articulações e músculos." };
  if (n.includes("Retatrutide") && n.includes("Tirzepatide")) return { id: "reta-tirz", name: "Blend Retatrutide + Tirzepatide", desc: "Sinergia metabólica máxima de controle glicêmico e lipólise profunda." };
  if (n.includes("Semax") && n.includes("Selank")) return { id: "semax-selank", name: "Blend Semax + Selank", desc: "Sinergia de foco cirúrgico e redução de cortisol sem sedação." };
  if (n.includes("CJC1295+Ipamorelin") || (n.includes("CJC") && n.includes("Ipamorelin"))) return { id: "cjc-ipa", name: "Blend CJC-1295 + Ipamorelin", desc: "Estimulação sinérgica de GH e IGF-1 para ganho de massa magra e recuperação." };
  if (n.includes("Tesamorelin") && n.includes("Ipamorelin")) return { id: "tesa-ipa", name: "Blend Tesamorelin + Ipamorelin", desc: "Foco em redução potente de gordura visceral profunda e estímulo de GH." };

  if (n.includes("Retatrutide")) return { id: "retatrutide", name: "Retatrutide", desc: "Triplo agonista (GLP-1, GIP, Glucagon) para máxima aceleração metabólica e saciedade." };
  if (n.includes("Tirzepatide")) return { id: "tirzepatide", name: "Tirzepatide", desc: "Duplo agonista GLP-1 / GIP de alta eficácia na sensibilidade à insulina e queima de gordura." };
  if (n.includes("Semaglutide")) return { id: "semaglutide", name: "Semaglutide", desc: "Agonista clássico de receptores GLP-1 com controle de apetite comprovado." };
  if (n.includes("BPC 157") || n.includes("BPC-157")) return { id: "bpc157", name: "BPC-157", desc: "Peptídeo de cicatrização celular para ligamentos, tendões, articulações e mucosa gástrica." };
  if (n.includes("TB500") || n.includes("TB-500")) return { id: "tb500", name: "TB-500 (Full Chain)", desc: "Regeneração tecidual sistêmica, angiogênese e redução de processos inflamatórios." };
  if (n.includes("NAD+")) return { id: "nad", name: "NAD+", desc: "Combustível mitocondrial essencial para energia celular (ATP), reparo de DNA e sirtuínas." };
  if (n.includes("GHK-Cu") || n.includes("GHK")) return { id: "ghk-cu", name: "GHK-Cu (Blue Copper)", desc: "Peptídeo de cobre para estímulo de colágeno, firmeza da pele e densidade capilar." };
  if (n.includes("AHK-CU")) return { id: "ahk-cu", name: "AHK-Cu", desc: "Peptídeo formulado especificamente para fortalecimento e crescimento folicular capilar." };
  if (n.includes("Epithalon")) return { id: "epithalon", name: "Epithalon", desc: "Bio-regulador da telomerase e pineal para reprogramação dos ritmos de longevidade." };
  if (n.includes("Semax")) return { id: "semax", name: "Semax", desc: "Nootrópico avançado derivado de ACTH; potencializa BDNF, foco cognitivo e memória." };
  if (n.includes("Selank")) return { id: "selank", name: "Selank", desc: "Ansiolítico peptídico que estabiliza o humor e reduz o estresse sem causar sonolência." };
  if (n.includes("Adamax")) return { id: "adamax", name: "Adamax", desc: "Variante nootrópica avançada com biodisponibilidade aprimorada para alta performance mental." };
  if (n.includes("DSIP")) return { id: "dsip", name: "DSIP", desc: "Peptídeo indutor do sono de ondas lentas delta, recuperação hormonal e neuromuscular." };
  if (n.includes("5-AMINO-1MQ")) return { id: "5amino1mq", name: "5-AMINO-1MQ", desc: "Inibidor da enzima NNMT que reprograma o gasto energético e a queima lipídica celular." };
  if (n.includes("MOTS-c")) return { id: "mots-c", name: "MOTS-c", desc: "Peptídeo codificado mitocondrialmente que imita os efeitos do exercício físico e melhora o endurance." };
  if (n.includes("PT141") || n.includes("PT-141")) return { id: "pt141", name: "PT-141 (Bremelanotide)", desc: "Atuador central no SNC para estímulo direto da libido e vigor sexual masculino e feminino." };
  if (n.includes("KPV")) return { id: "kpv", name: "KPV", desc: "Potente anti-inflamatório peptídico para proteção intestinal, microbioma e inflamação sistêmica." };
  if (n.includes("VIP")) return { id: "vip", name: "VIP", desc: "Peptídeo intestinal vasoativo para imunomodulação, saúde pulmonar e regulação microvascular." };
  if (n.includes("ARA290") || n.includes("ARA-290")) return { id: "ara290", name: "ARA-290", desc: "Alívio de dores neuropáticas e regeneração de pequenas fibras nervosas periféricas." };
  if (n.includes("Cagrilintide")) return { id: "cagrilintide", name: "Cagrilintide", desc: "Análogo de amilina de longa ação para retardo do esvaziamento gástrico e saciedade extrema." };
  if (n.includes("AOD9604") || n.includes("AOD")) return { id: "aod9604", name: "AOD-9604", desc: "Fragmento C-terminal do hGH que induz lipólise seletiva sem impactar a glicemia." };
  if (n.includes("Tesamorelin")) return { id: "tesamorelin", name: "Tesamorelin", desc: "Análogo do GHRH com efeito comprovado na redução de gordura visceral e saúde cardiovascular." };
  if (n.includes("Sermorelin")) return { id: "sermorelin", name: "Sermorelin", desc: "Secretagogo de GH clássico para restauração do bem-estar, tônus e anti-envelhecimento." };
  if (n.includes("Ipamorelin")) return { id: "ipamorelin", name: "Ipamorelin", desc: "Agonista seletivo do receptor de grelina para liberação limpa de GH sem pico de prolactina/cortisol." };
  if (n.includes("CJC1295 with DAC")) return { id: "cjc-dac", name: "CJC-1295 (com DAC)", desc: "Análogo de GHRH com meia-vida prolongada para liberação estável contínua de GH." };
  if (n.includes("CJC1295 no DAC")) return { id: "cjc-nodac", name: "CJC-1295 (sem DAC)", desc: "GHRH pulsátil ideal para protocolos noturnos em conjunto com Ipamorelin." };
  if (n.includes("SS-31")) return { id: "ss31", name: "SS-31 (Elamipretide)", desc: "Peptídeo cardiolipina-alvo para reparação da membrana interna mitocondrial e energia." };
  if (n.includes("FOXO4")) return { id: "foxo4", name: "FOXO4-DRI", desc: "Peptídeo senolítico de última geração que induz apoptose em células senescentes envelhecidas." };
  if (n.includes("Snap")) return { id: "snap8", name: "Snap-8", desc: "Octapeptídeo cosmético anti-rugas com efeito de relaxamento da expressão muscular facial." };
  if (n.includes("Oxytocin")) return { id: "oxytocin", name: "Oxytocin", desc: "Neuropeptídeo do bem-estar, conexão afetiva, relaxamento e redução dos níveis de estresse." };
  if (n.includes("Melanotan")) return { id: "melanotan2", name: "Melanotan II", desc: "Estimulante da melanogênese para bronzeamento uniforme com leve ação na libido." };
  if (n.includes("Kisspeptin")) return { id: "kisspeptin", name: "Kisspeptin-10", desc: "Regulador mestre do eixo hipotálamo-hipófise-gonadal para modulação natural de LH/FSH." };
  if (n.includes("Thymalin")) return { id: "thymalin", name: "Thymalin", desc: "Bio-regulador peptídico do timo para reativação do sistema imunológico celular." };
  if (n.includes("Thymosin")) return { id: "thymosin-a1", name: "Thymosin Alpha 1", desc: "Modulador imunitário padrão-ouro para imunossupressão, defesa antiviral e longevidade celular." };
  if (n.includes("Glutathione")) return { id: "glutathione", name: "Glutathione", desc: "Antioxidante mestre do organismo para desintoxicação hepática e eliminação de radicais livres." };
  if (n.includes("IGF-1")) return { id: "igf1", name: "IGF-1 LR3", desc: "Fator de crescimento tipo insulina potente para retenção de nitrogênio e síntese proteica muscular." };
  if (n.includes("L-carnitine")) return { id: "lcarnitine", name: "L-Carnitina Injetável", desc: "Auxilia no transporte de ácidos graxos para a mitocôndria para oxidação e geração de energia." };
  if (n.includes("Lemon Bottle")) return { id: "lemonbottle", name: "Lemon Bottle", desc: "Solução lipolítica de alta concentração para gordura localizada e contorno corporal." };
  if (n.includes("Lipo-c")) return { id: "lipoc", name: "Lipo-C", desc: "Formula lipotrópica para otimização da queima de gordura e suporte à saúde do fígado." };
  if (n.includes("MIC")) return { id: "mic", name: "MIC (Lipo C com B12)", desc: "Combinação lipotrópica de Metionina, Inositol e Colina enriquecida com Vitamina B12." };
  if (n.includes("vitamin B12")) return { id: "b12", name: "Vitamina B12", desc: "Cofator vital para produção de glóbulos vermelhos, energia metabólica e sistema nervoso." };
  if (n.includes("GLOW") || n.includes("Klow")) return { id: "glow", name: "Kit Glow & Klow", desc: "Blend de rejuvenescimento estético para síntese de colágeno, viço e hidratação cutânea." };

  return { id: n.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: n, desc: item.category };
}

const compoundMap = new Map();
rawProducts.forEach(item => {
  const meta = getParentCompound(item);
  if (!compoundMap.has(meta.id)) {
    compoundMap.set(meta.id, {
      id: meta.id,
      name: meta.name,
      desc: meta.desc,
      line: getCategoryLine(item.category),
      doses: []
    });
  }

  const match = item.spec.match(/(\d+(?:\.\d+)?)\s*(mg|mcg|ml)/i);
  let doseLabel = item.spec.split(' ')[0];
  let doseNum = 10;
  let doseUnit = "mg";
  if (match) {
    doseNum = parseFloat(match[1]);
    doseUnit = match[2].toLowerCase();
    doseLabel = `${doseNum}${doseUnit}`;
  }

  compoundMap.get(meta.id).doses.push({
    code: item.code,
    label: doseLabel,
    spec: item.spec,
    doseNum: doseNum,
    doseUnit: doseUnit,
    powderCostPerVial: item.powderCostPerVial,
    totalCostB2C: item.totalCostB2C,
    suggestedPriceB2C: item.suggestedPriceB2C,
    b2bBoxPrice: item.b2bBoxPrice,
    profitUnitB2C: item.profitUnitB2C,
    marginPercent: item.marginPercent,
    stockQty: 5, // initial default mock stock
    status: 'in_stock' // 'in_stock', 'pre_order', 'out_of_stock'
  });
});

const compoundList = Array.from(compoundMap.values());

const adminHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel Administrativo — PSL Labs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #145C46;
      --primary-dark: #0D4131;
      --primary-light: #E8F5EE;
      --primary-border: #A3D4C1;
      --accent: #10B981;
      --dark: #0F172A;
      --gray-700: #334155;
      --gray-600: #475569;
      --gray-400: #94A3B8;
      --gray-200: #E2E8F0;
      --gray-100: #F1F5F9;
      --bg-page: #F8FAFC;
      --white: #FFFFFF;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 14px -2px rgba(20, 92, 70, 0.08);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    body {
      background-color: var(--bg-page);
      color: var(--dark);
      line-height: 1.5;
    }

    /* Auth Overlay */
    #auth-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, #064E3B 0%, #145C46 50%, #064E3B 100%);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 36px 30px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0,0,0,0.25);
      text-align: center;
    }

    .auth-logo {
      font-size: 26px;
      font-weight: 900;
      color: var(--primary);
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .auth-sub {
      font-size: 8px;
      font-weight: 700;
      color: var(--primary);
      letter-spacing: 3.5px;
      margin-bottom: 24px;
    }

    .auth-input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 16px;
      font-weight: 600;
      outline: none;
      text-align: center;
      letter-spacing: 4px;
      margin-bottom: 16px;
    }

    .auth-input:focus {
      border-color: var(--primary);
    }

    .btn-auth {
      width: 100%;
      height: 48px;
      background: var(--primary);
      color: var(--white);
      border: none;
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }

    .btn-auth:hover {
      background: var(--primary-dark);
    }

    /* Admin Layout */
    .admin-wrapper {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar */
    .admin-sidebar {
      width: 250px;
      background: var(--white);
      border-right: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .admin-sidebar {
        display: none;
      }
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid var(--gray-200);
    }

    .sidebar-nav {
      padding: 16px 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 14px;
      color: var(--gray-600);
      font-size: 13.5px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s ease;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
    }

    .nav-link:hover {
      background: var(--gray-100);
      color: var(--dark);
    }

    .nav-link.active {
      background: var(--primary-light);
      color: var(--primary);
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid var(--gray-200);
    }

    .btn-logout {
      width: 100%;
      padding: 9px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      color: #EF4444;
      font-size: 12.5px;
      font-weight: 700;
      border-radius: var(--radius-sm);
      cursor: pointer;
    }

    /* Main Content Area */
    .admin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    .admin-topbar {
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      padding: 14px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .topbar-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--dark);
    }

    .admin-content {
      padding: 24px;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }

    /* Mobile Nav Bar for Admin */
    .admin-mobile-tabs {
      display: flex;
      overflow-x: auto;
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      padding: 8px 12px;
      gap: 8px;
      scrollbar-width: none;
    }

    @media (min-width: 769px) {
      .admin-mobile-tabs {
        display: none;
      }
    }

    .m-tab-btn {
      white-space: nowrap;
      padding: 6px 14px;
      border-radius: 20px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      font-size: 12px;
      font-weight: 700;
      color: var(--gray-600);
      cursor: pointer;
    }

    .m-tab-btn.active {
      background: var(--primary);
      color: var(--white);
      border-color: var(--primary);
    }

    /* Dashboard Metric Cards */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      box-shadow: var(--shadow-sm);
    }

    .metric-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .metric-val {
      font-size: 26px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.1;
    }

    .metric-sub {
      font-size: 11.5px;
      color: #059669;
      font-weight: 600;
      margin-top: 4px;
    }

    /* Card Panels */
    .panel {
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      padding: 20px;
      margin-bottom: 24px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--gray-100);
      flex-wrap: wrap;
      gap: 10px;
    }

    .panel-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--dark);
    }

    /* Tables */
    .table-wrap {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13.5px;
    }

    th {
      background: #F8FAFC;
      color: var(--gray-600);
      font-weight: 700;
      padding: 10px 14px;
      border-bottom: 1.5px solid var(--gray-200);
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--gray-100);
    }

    tr:hover td {
      background: #FAFCFB;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
    }

    .badge-in-stock { background: #DCFCE7; color: #166534; }
    .badge-pre-order { background: #FEF3C7; color: #92400E; }
    .badge-out-of-stock { background: #FEE2E2; color: #991B1B; }

    /* Action Buttons */
    .btn-sm {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--white);
    }
    .btn-primary:hover { background: var(--primary-dark); }

    .btn-outline {
      background: var(--white);
      border: 1px solid var(--gray-200);
      color: var(--dark);
    }
    .btn-outline:hover { background: var(--gray-100); }

    .btn-success {
      background: #25D366;
      color: var(--white);
    }

    /* Forms */
    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 12.5px;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 6px;
    }

    .form-input {
      width: 100%;
      height: 42px;
      padding: 0 12px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 14px;
      outline: none;
    }

    .form-input:focus {
      border-color: var(--primary);
    }

    /* Tabs View Containers */
    .view-tab {
      display: none;
    }
    .view-tab.active {
      display: block;
    }
  </style>
</head>
<body>

  <!-- Auth Screen -->
  <div id="auth-overlay">
    <div class="auth-card">
      <div style="margin-bottom: 16px; text-align: center;">
        <img src="/brand/logo_transparent.png" onerror="this.onerror=null; this.src='/logo.png';" alt="PSL Labs" style="height: 48px; width: auto; max-width: 200px;">
      </div>
      <div class="auth-sub" style="font-size: 10px; font-weight: 800; color: var(--primary); letter-spacing: 2.5px; margin-bottom: 14px;">PAINEL ADMINISTRATIVO</div>
      <p style="font-size: 13.5px; color: var(--gray-600); margin-bottom: 16px;">
        Digite o PIN de segurança para gerenciar estoque, pedidos e preços:
      </p>
      <input type="password" id="admin-pin-input" class="auth-input" placeholder="••••" maxlength="10">
      <button class="btn-auth" onclick="verifyPin()">Entrar no Painel</button>
      <div style="font-size: 11px; color: var(--gray-400); margin-top: 14px;">PIN Padrão Inicial: <strong>psl2026</strong></div>
    </div>
  </div>

  <!-- Admin Interface -->
  <div class="admin-wrapper" id="admin-app" style="display: none;">
    
    <!-- Sidebar Desktop -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <a href="/" target="_blank" style="display: block; text-decoration: none;">
          <img src="/brand/logo_transparent.png" onerror="this.onerror=null; this.src='/logo.png';" alt="PSL Labs" style="height: 38px; width: auto; max-width: 160px; display: block; margin-bottom: 6px;">
        </a>
        <div style="font-size: 8px; font-weight: 800; color: var(--primary); letter-spacing: 2px; text-transform: uppercase;">Painel Operacional</div>
      </div>

      <nav class="sidebar-nav">
        <button class="nav-link active" onclick="showTab('dashboard')">
          <span>📊</span> Dashboard Geral
        </button>
        <button class="nav-link" onclick="showTab('pedidos')">
          <span>📋</span> Pedidos & Envio
        </button>
        <button class="nav-link" onclick="showTab('estoque')">
          <span>📦</span> Estoque & Disponibilidade
        </button>
        <button class="nav-link" onclick="showTab('precos')">
          <span>💰</span> Gerenciar Preços
        </button>
        <button class="nav-link" onclick="showTab('crm')">
          <span>👥</span> CRM & Recompra
        </button>
        <button class="nav-link" onclick="showTab('laudos')">
          <span>🧪</span> Laudos HPLC (COA)
        </button>
        <button class="nav-link" onclick="showTab('config')">
          <span>⚙️</span> Configurações
        </button>
      </nav>

      <div class="sidebar-footer">
        <a href="/" target="_blank" style="display: block; font-size: 12px; font-weight: 700; color: var(--primary); text-decoration: none; margin-bottom: 10px; text-align: center;">
          ↗ Ver Loja / Catálogo
        </a>
        <button class="btn-logout" onclick="logout()">Encerrar Sessão</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      
      <!-- Topbar -->
      <div class="admin-topbar">
        <div class="topbar-title" id="page-title">📊 Dashboard Geral</div>
        <div style="display: flex; gap: 8px;">
          <a href="/" target="_blank" class="btn-sm btn-outline">Abrir Loja ↗</a>
          <button class="btn-sm btn-outline" onclick="logout()">Sair</button>
        </div>
      </div>

      <!-- Mobile Tabs Bar -->
      <div class="admin-mobile-tabs">
        <button class="m-tab-btn active" onclick="showTab('dashboard')">📊 Métricas</button>
        <button class="m-tab-btn" onclick="showTab('pedidos')">📋 Pedidos</button>
        <button class="m-tab-btn" onclick="showTab('estoque')">📦 Estoque</button>
        <button class="m-tab-btn" onclick="showTab('precos')">💰 Preços</button>
        <button class="m-tab-btn" onclick="showTab('crm')">👥 Recompra</button>
        <button class="m-tab-btn" onclick="showTab('config')">⚙️ Config</button>
      </div>

      <div class="admin-content">

        <!-- TAB 1: DASHBOARD GERAL -->
        <div id="tab-dashboard" class="view-tab active">
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">Faturamento Estimado</div>
              <div class="metric-val" id="stat-revenue">R$ 14.850,00</div>
              <div class="metric-sub">▲ 18% este mês</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Lucro Líquido Real</div>
              <div class="metric-val" style="color: #059669;" id="stat-profit">R$ 8.320,00</div>
              <div class="metric-sub">Margem média real: 56%</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Pedidos Concluídos</div>
              <div class="metric-val" id="stat-orders-count">42</div>
              <div class="metric-sub">Ticket médio: R$ 353,50</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Itens Pronta-Entrega SP</div>
              <div class="metric-val" id="stat-stock-total">68 frascos</div>
              <div class="metric-sub">Disponível p/ Uber Moto Flash</div>
            </div>
          </div>

          <!-- Top Sellers Panel -->
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">🔥 Peptídeos Mais Vendidos (Giro Rápido)</div>
              <span class="badge badge-in-stock">Estoque Saudável</span>
            </div>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Peptídeo</th>
                    <th>Dose Mais Procurada</th>
                    <th>Frascos Vendidos</th>
                    <th>Faturamento</th>
                    <th>Lucro Gerado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Retatrutide</strong></td>
                    <td>10mg</td>
                    <td>16 frascos</td>
                    <td>R$ 3.184,00</td>
                    <td style="color: #059669; font-weight: 800;">R$ 1.776,00</td>
                  </tr>
                  <tr>
                    <td><strong>Tirzepatide</strong></td>
                    <td>10mg</td>
                    <td>14 frascos</td>
                    <td>R$ 2.646,00</td>
                    <td style="color: #059669; font-weight: 800;">R$ 1.500,80</td>
                  </tr>
                  <tr>
                    <td><strong>Blend BPC-157 + TB-500</strong></td>
                    <td>10mg</td>
                    <td>8 frascos</td>
                    <td>R$ 1.992,00</td>
                    <td style="color: #059669; font-weight: 800;">R$ 1.066,40</td>
                  </tr>
                  <tr>
                    <td><strong>BPC-157</strong></td>
                    <td>10mg</td>
                    <td>7 frascos</td>
                    <td>R$ 1.393,00</td>
                    <td style="color: #059669; font-weight: 800;">R$ 777,00</td>
                  </tr>
                  <tr>
                    <td><strong>NAD+ Longevidade</strong></td>
                    <td>500mg</td>
                    <td>5 frascos</td>
                    <td>R$ 895,00</td>
                    <td style="color: #059669; font-weight: 800;">R$ 517,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 2: GESTÃO DE PEDIDOS (PIPELINE) -->
        <div id="tab-pedidos" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">📋 Funil de Pedidos Recebidos</div>
              <button class="btn-sm btn-primary" onclick="showNewOrderModal()">+ Registrar Pedido Manual</button>
            </div>
            
            <div class="table-wrap">
              <table id="orders-table">
                <thead>
                  <tr>
                    <th>Data / ID</th>
                    <th>Cliente</th>
                    <th>Itens / Dose</th>
                    <th>Entrega</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody id="orders-tbody">
                  <!-- Generated by JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 3: ESTOQUE & DISPONIBILIDADE (47 PEPTÍDEOS) -->
        <div id="tab-estoque" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">📦 Controle de Estoque Pronta-Entrega (SP)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Altere o status para atualizar instantaneamente o catálogo do cliente.</div>
              </div>
              <input type="text" id="stock-search" placeholder="Filtrar composto..." oninput="filterStockTable()" style="padding: 6px 12px; border: 1px solid var(--gray-200); border-radius: 6px; font-size: 13px;">
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Composto</th>
                    <th>Dosagens Cadastradas</th>
                    <th>Qtd em SP</th>
                    <th>Status na Loja</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="stock-tbody">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 4: GERENCIAR PREÇOS -->
        <div id="tab-precos" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">💰 Editor de Preços (B2C & B2B)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Qualquer valor alterado aqui substitui os preços padrão no catálogo em tempo real.</div>
              </div>
              <button class="btn-sm btn-outline" onclick="resetDefaultPrices()">Restaurar Preços Originais</button>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Peptídeo</th>
                    <th>Dosagem</th>
                    <th>Custo Total Unitário</th>
                    <th>Preço Consumidor (R$)</th>
                    <th>Preço Atacado 10un (R$)</th>
                    <th>Margem B2C</th>
                    <th>Salvar</th>
                  </tr>
                </thead>
                <tbody id="prices-tbody">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 5: CRM & ALERTA DE RECOMPRA -->
        <div id="tab-crm" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">👥 Previsão de Recompra (LTV de Clientes)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Dispare mensagens preventivas antes que o frasco do cliente termine.</div>
              </div>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Produto em Uso</th>
                    <th>Data da Compra</th>
                    <th>Previsão Término</th>
                    <th>Status do Ciclo</th>
                    <th>Ação no WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dr. Marcelo Mendes</strong><br><span style="font-size: 11px; color: var(--gray-400);">11 98877-6655</span></td>
                    <td>Retatrutide 10mg (1 Frasco)</td>
                    <td>19/10/2026</td>
                    <td><strong>Hoje (21 dias)</strong></td>
                    <td><span class="badge" style="background: #FEE2E2; color: #991B1B;">Frasco Terminando</span></td>
                    <td>
                      <button class="btn-sm btn-success" onclick="sendReorderReminder('Marcelo', 'Retatrutide 10mg', '5511988776655')">💬 Lembrete Recompra</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Camila Albuquerque</strong><br><span style="font-size: 11px; color: var(--gray-400);">11 97766-5544</span></td>
                    <td>GHK-Cu 100mg + BPC-157</td>
                    <td>26/10/2026</td>
                    <td>Em 7 dias</td>
                    <td><span class="badge" style="background: #FEF3C7; color: #92400E;">Meio do Ciclo</span></td>
                    <td>
                      <button class="btn-sm btn-outline" onclick="sendSupportCheckin('Camila', 'GHK-Cu', '5511977665544')">💬 Checar Resultados</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Lucas Silveira</strong><br><span style="font-size: 11px; color: var(--gray-400);">11 96655-4433</span></td>
                    <td>Tirzepatide 10mg (1 Frasco)</td>
                    <td>01/11/2026</td>
                    <td>Em 14 dias</td>
                    <td><span class="badge badge-in-stock">Início do Ciclo</span></td>
                    <td>
                      <button class="btn-sm btn-outline" disabled style="opacity: 0.5;">Em andamento</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 6: LAUDOS HPLC -->
        <div id="tab-laudos" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">🧪 Certificados de Análise HPLC (Pureza &gt;99%)</div>
            </div>
            <p style="font-size: 13.5px; color: var(--gray-600); margin-bottom: 16px;">
              Vincule os laudos laboratoriais de cada lote para exibição automática quando o cliente ou revendedor escanear o QR Code do frasco.
            </p>
            <div style="background: #F8FAFC; border: 2px dashed var(--gray-200); border-radius: var(--radius-md); padding: 30px; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">📄</div>
              <div style="font-weight: 700; margin-bottom: 4px;">Upload de Laudo HPLC / COA</div>
              <div style="font-size: 12px; color: var(--gray-400); margin-bottom: 12px;">Formatos aceitos: PDF ou PNG (até 15MB)</div>
              <button class="btn-sm btn-primary" onclick="alert('Selecione o arquivo de laudo do fornecedor no seu computador.')">Selecionar Laudo no Computador</button>
            </div>
          </div>
        </div>

        <!-- TAB 7: CONFIGURAÇÕES -->
        <div id="tab-config" class="view-tab">
          <div class="panel" style="max-width: 600px;">
            <div class="panel-header">
              <div class="panel-title">⚙️ Configurações Operacionais</div>
            </div>

            <div class="form-group">
              <label class="form-label">Número de WhatsApp Oficial para Receber Pedidos</label>
              <input type="text" id="cfg-wa" class="form-input" placeholder="Ex: 5511999999999">
              <div style="font-size: 11px; color: var(--gray-400); margin-top: 4px;">Coloque código do país (55) + DDD + Telefone sem traços.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Chave Pix Padrão da PSL Labs (CNPJ ou E-mail)</label>
              <input type="text" id="cfg-pix" class="form-input" placeholder="Ex: financeiro@psllabs.com.br">
            </div>

            <div class="form-group">
              <label class="form-label">Alterar Senha / PIN de Acesso ao Painel</label>
              <input type="password" id="cfg-new-pin" class="form-input" placeholder="Novo PIN">
            </div>

            <button class="btn-sm btn-primary" onclick="saveAdminSettings()" style="height: 42px; font-size: 14px; width: 100%;">
              Salvar Configurações
            </button>
          </div>
        </div>

      </div>
    </main>
  </div>

  <script>
    const INITIAL_COMPOUNDS = ${JSON.stringify(compoundList)};
    const DEFAULT_PIN = "psl2026";

    // State
    let activeTab = 'dashboard';
    let stockData = JSON.parse(localStorage.getItem('psl_stock_data') || 'null');
    let customPrices = JSON.parse(localStorage.getItem('psl_custom_prices') || '{}');
    let orders = JSON.parse(localStorage.getItem('psl_orders') || 'null');

    // Default orders demo if empty
    if (!orders) {
      orders = [
        {
          id: "PED-1082",
          date: "Hoje, 11:40",
          client: "Rodrigo Carvalho",
          phone: "5511988887777",
          items: "1x Retatrutide 10mg",
          shipping: "⚡ Uber Moto Flash (SP)",
          total: 199.00,
          status: "separando", // 'aguardando_pix', 'separando', 'despachado_uber', 'sedex', 'concluido'
          uberLink: "https://trip.uber.com/share/abc123xyz",
          trackingCode: ""
        },
        {
          id: "PED-1081",
          date: "Hoje, 10:15",
          client: "Dra. Patricia Lima",
          phone: "5511977776666",
          items: "1x BPC-157 10mg + 1x TB-500",
          shipping: "⚡ Uber Moto Flash (SP)",
          total: 498.00,
          status: "despachado_uber",
          uberLink: "https://trip.uber.com/share/def456uvw",
          trackingCode: ""
        },
        {
          id: "PED-1080",
          date: "Ontem, 16:30",
          client: "Clinica BioIntegrativa",
          phone: "5521999998888",
          items: "2x Caixa Tirzepatide 10mg (Atacado)",
          shipping: "📦 Correios Sedex",
          total: 1620.00,
          status: "sedex",
          uberLink: "",
          trackingCode: "BR987654321SP"
        }
      ];
      localStorage.setItem('psl_orders', JSON.stringify(orders));
    }

    // Default stock map
    if (!stockData) {
      stockData = {};
      INITIAL_COMPOUNDS.forEach(c => {
        stockData[c.id] = {
          status: 'in_stock',
          qty: 6
        };
      });
      localStorage.setItem('psl_stock_data', JSON.stringify(stockData));
    }

    // Verify PIN Auth
    function verifyPin() {
      const pin = document.getElementById('admin-pin-input').value.trim();
      const savedPin = localStorage.getItem('psl_admin_pin') || DEFAULT_PIN;
      if (pin === savedPin) {
        sessionStorage.setItem('psl_admin_auth', 'true');
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-app').style.display = 'flex';
        initAdmin();
      } else {
        alert("PIN Incorreto! Tente novamente.");
        document.getElementById('admin-pin-input').value = '';
      }
    }

    function checkAuth() {
      if (sessionStorage.getItem('psl_admin_auth') === 'true') {
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-app').style.display = 'flex';
        initAdmin();
      }
    }

    function logout() {
      sessionStorage.removeItem('psl_admin_auth');
      window.location.reload();
    }

    function showTab(tabId) {
      activeTab = tabId;
      document.querySelectorAll('.view-tab').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.m-tab-btn').forEach(el => el.classList.remove('active'));

      const targetView = document.getElementById('tab-' + tabId);
      if (targetView) targetView.classList.add('active');

      // Update sidebar nav
      const sideLinks = document.querySelectorAll('.nav-link');
      sideLinks.forEach(l => {
        if (l.getAttribute('onclick').includes(tabId)) l.classList.add('active');
      });

      // Update mobile tabs
      const mTabs = document.querySelectorAll('.m-tab-btn');
      mTabs.forEach(t => {
        if (t.getAttribute('onclick').includes(tabId)) t.classList.add('active');
      });

      const titles = {
        dashboard: "📊 Dashboard Geral",
        pedidos: "📋 Gestão de Pedidos & Rastreamento",
        estoque: "📦 Estoque & Disponibilidade em SP",
        precos: "💰 Editor de Preços Dinâmicos",
        crm: "👥 CRM & Previsão de Recompra",
        laudos: "🧪 Certificados de Análise HPLC",
        config: "⚙️ Configurações da PSL Labs"
      };
      document.getElementById('page-title').textContent = titles[tabId] || "Painel ADM";
    }

    function initAdmin() {
      renderOrders();
      renderStock();
      renderPrices();
      loadSettings();
    }

    // Orders Logic
    function renderOrders() {
      const tbody = document.getElementById('orders-tbody');
      tbody.innerHTML = '';

      orders.forEach((o, idx) => {
        const tr = document.createElement('tr');
        
        const statusBadges = {
          aguardando_pix: '<span class="badge" style="background:#FEF3C7;color:#92400E;">Aguardando Pix</span>',
          separando: '<span class="badge badge-in-stock">Separando Frasco</span>',
          despachado_uber: '<span class="badge" style="background:#E0E7FF;color:#3730A3;">🛵 Uber Moto Flash</span>',
          sedex: '<span class="badge" style="background:#E0F2FE;color:#0369A1;">📦 Postado Sedex</span>',
          concluido: '<span class="badge" style="background:#DCFCE7;color:#166534;">✓ Concluído</span>'
        };

        tr.innerHTML = \`
          <td><strong>\${o.id}</strong><br><span style="font-size:11px;color:var(--gray-400);">\${o.date}</span></td>
          <td><strong>\${o.client}</strong><br><span style="font-size:11px;color:var(--gray-600);">\${o.phone}</span></td>
          <td>\${o.items}</td>
          <td>\${o.shipping}</td>
          <td><strong>R$ \${o.total.toFixed(2).replace('.', ',')}</strong></td>
          <td>
            <select onchange="updateOrderStatus(\${idx}, this.value)" style="padding:4px 6px;border-radius:6px;border:1px solid var(--gray-200);font-size:12px;font-weight:700;">
              <option value="aguardando_pix" \${o.status==='aguardando_pix'?'selected':''}>Aguardando Pix</option>
              <option value="separando" \${o.status==='separando'?'selected':''}>Pix OK / Separando</option>
              <option value="despachado_uber" \${o.status==='despachado_uber'?'selected':''}>Despachado Uber Flash</option>
              <option value="sedex" \${o.status==='sedex'?'selected':''}>Postado Sedex</option>
              <option value="concluido" \${o.status==='concluido'?'selected':''}>Concluído</option>
            </select>
          </td>
          <td>
            <button class="btn-sm btn-success" title="Mandar Atualização no WhatsApp" onclick="notifyClientWhatsapp(\${idx})">💬 Avisar Cliente</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function updateOrderStatus(idx, newStatus) {
      orders[idx].status = newStatus;
      if (newStatus === 'despachado_uber' && !orders[idx].uberLink) {
        const link = prompt("Cole aqui o Link de Rastreio da Corrida do Uber Flash (opcional):");
        if (link) orders[idx].uberLink = link.trim();
      }
      if (newStatus === 'sedex' && !orders[idx].trackingCode) {
        const code = prompt("Digite o Código de Rastreio dos Correios (ex: BR123456789SP):");
        if (code) orders[idx].trackingCode = code.trim();
      }
      localStorage.setItem('psl_orders', JSON.stringify(orders));
      renderOrders();
    }

    function notifyClientWhatsapp(idx) {
      const o = orders[idx];
      let msg = "Olá " + o.client + "! Aqui é da equipe PSL Labs.\\n\\n";
      if (o.status === 'separando') {
        msg += "✓ Seu pagamento Pix foi confirmado com sucesso! Seu pedido (" + o.items + ") já está sendo embalado.";
      } else if (o.status === 'despachado_uber') {
        msg += "🛵 Seu motoboy do Uber Flash já retirou seu frasco e está a caminho!\\n";
        if (o.uberLink) msg += "Acompanhe o trajeto em tempo real: " + o.uberLink;
      } else if (o.status === 'sedex') {
        msg += "📦 Seu pedido foi postado nos Correios Sedex com proteção isotérmica!\\n";
        if (o.trackingCode) msg += "Código de rastreio: " + o.trackingCode;
      } else {
        msg += "Seu pedido de " + o.items + " foi entregue! Conte conosco para dúvidas na reconstituição.";
      }
      const cleanPhone = o.phone.replace(/\\D/g, '');
      window.open("https://wa.me/" + cleanPhone + "?text=" + encodeURI(msg), "_blank");
    }

    // Stock Management Logic
    function renderStock() {
      const tbody = document.getElementById('stock-tbody');
      tbody.innerHTML = '';

      INITIAL_COMPOUNDS.forEach(c => {
        const current = stockData[c.id] || { status: 'in_stock', qty: 5 };
        const tr = document.createElement('tr');
        tr.id = 'stock-row-' + c.id;

        const badgeClass = current.status === 'in_stock' ? 'badge-in-stock' : (current.status === 'pre_order' ? 'badge-pre-order' : 'badge-out-of-stock');
        const badgeLabel = current.status === 'in_stock' ? '🟢 Em Estoque' : (current.status === 'pre_order' ? '🟡 Sob Encomenda' : '🔴 Esgotado');

        tr.innerHTML = \`
          <td><strong>\${c.name}</strong><br><span style="font-size:11px;color:var(--gray-400);">\${c.line}</span></td>
          <td>\${c.doses.map(d => d.label).join(', ')}</td>
          <td>
            <input type="number" min="0" value="\${current.qty}" onchange="updateStockQty('\${c.id}', this.value)" style="width:60px;padding:4px;border:1px solid var(--gray-200);border-radius:6px;font-weight:700;text-align:center;"> frascos
          </td>
          <td><span class="badge \${badgeClass}">\${badgeLabel}</span></td>
          <td>
            <select onchange="updateStockStatus('\${c.id}', this.value)" style="padding:5px 8px;border-radius:6px;border:1.5px solid var(--gray-200);font-weight:700;font-size:12px;">
              <option value="in_stock" \${current.status==='in_stock'?'selected':''}>Disponível (Uber Flash)</option>
              <option value="pre_order" \${current.status==='pre_order'?'selected':''}>Sob Encomenda (3-5d)</option>
              <option value="out_of_stock" \${current.status==='out_of_stock'?'selected':''}>Esgotado</option>
            </select>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function updateStockStatus(compoundId, newStatus) {
      if (!stockData[compoundId]) stockData[compoundId] = { qty: 0 };
      stockData[compoundId].status = newStatus;
      localStorage.setItem('psl_stock_data', JSON.stringify(stockData));
      renderStock();
    }

    function updateStockQty(compoundId, newQty) {
      if (!stockData[compoundId]) stockData[compoundId] = { status: 'in_stock' };
      stockData[compoundId].qty = parseInt(newQty) || 0;
      if (stockData[compoundId].qty === 0) {
        stockData[compoundId].status = 'out_of_stock';
      }
      localStorage.setItem('psl_stock_data', JSON.stringify(stockData));
      renderStock();
    }

    function filterStockTable() {
      const q = document.getElementById('stock-search').value.toLowerCase().trim();
      INITIAL_COMPOUNDS.forEach(c => {
        const row = document.getElementById('stock-row-' + c.id);
        if (!row) return;
        const matches = c.name.toLowerCase().includes(q) || c.line.toLowerCase().includes(q);
        row.style.display = matches ? '' : 'none';
      });
    }

    // Prices Management Logic
    function renderPrices() {
      const tbody = document.getElementById('prices-tbody');
      tbody.innerHTML = '';

      INITIAL_COMPOUNDS.forEach(c => {
        c.doses.forEach(d => {
          const customB2C = customPrices[d.code + '_b2c'] || d.suggestedPriceB2C;
          const customB2B = customPrices[d.code + '_b2b'] || d.b2bBoxPrice;

          const tr = document.createElement('tr');
          tr.innerHTML = \`
            <td><strong>\${c.name}</strong></td>
            <td><span class="badge" style="background:var(--primary-light);color:var(--primary);">\${d.label}</span></td>
            <td>R$ \${d.totalCostB2C.toFixed(2).replace('.', ',')}</td>
            <td>
              R$ <input type="number" id="p-b2c-\${d.code}" value="\${customB2C}" style="width:80px;padding:4px 6px;border:1px solid var(--gray-200);border-radius:6px;font-weight:800;color:var(--primary);">
            </td>
            <td>
              R$ <input type="number" id="p-b2b-\${d.code}" value="\${customB2B}" style="width:90px;padding:4px 6px;border:1px solid var(--gray-200);border-radius:6px;font-weight:800;">
            </td>
            <td><span style="color:#059669;font-weight:700;">\${d.marginPercent}%</span></td>
            <td>
              <button class="btn-sm btn-primary" onclick="saveCustomPrice('\${d.code}')">Salvar</button>
            </td>
          \`;
          tbody.appendChild(tr);
        });
      });
    }

    function saveCustomPrice(code) {
      const b2cInput = document.getElementById('p-b2c-' + code);
      const b2bInput = document.getElementById('p-b2b-' + code);
      if (!b2cInput || !b2bInput) return;

      customPrices[code + '_b2c'] = parseFloat(b2cInput.value) || 199;
      customPrices[code + '_b2b'] = parseFloat(b2bInput.value) || 890;
      localStorage.setItem('psl_custom_prices', JSON.stringify(customPrices));
      alert("Preço do produto [" + code + "] atualizado com sucesso na loja!");
    }

    function resetDefaultPrices() {
      if (confirm("Deseja restaurar todos os preços para os valores sugeridos originais?")) {
        customPrices = {};
        localStorage.removeItem('psl_custom_prices');
        renderPrices();
        alert("Preços originais restaurados!");
      }
    }

    // CRM Actions
    function sendReorderReminder(clientName, product, phone) {
      const msg = "Olá " + clientName + "! Tudo bem?\\n\\nAqui é da PSL Labs. Pelo cronograma do seu " + product + ", seu frasco deve estar nos últimos dias de aplicação.\\n\\nComo nosso envio em SP via Uber Moto é no mesmo dia (sujeito ao estoque), quer que eu já separe seu próximo frasco para você não pausar o protocolo?";
      window.open("https://wa.me/" + phone + "?text=" + encodeURI(msg), "_blank");
    }

    function sendSupportCheckin(clientName, product, phone) {
      const msg = "Olá " + clientName + "! Passando para acompanhar seus resultados com o " + product + ". Como está sendo a experiência? Ficou alguma dúvida sobre a reconstituição ou conservação?";
      window.open("https://wa.me/" + phone + "?text=" + encodeURI(msg), "_blank");
    }

    // Settings
    function loadSettings() {
      const wa = localStorage.getItem('psl_seller_wa') || '5511999999999';
      const pix = localStorage.getItem('psl_pix_key') || 'financeiro@psllabs.com.br';
      document.getElementById('cfg-wa').value = wa;
      document.getElementById('cfg-pix').value = pix;
    }

    function saveAdminSettings() {
      const wa = document.getElementById('cfg-wa').value.trim();
      const pix = document.getElementById('cfg-pix').value.trim();
      const newPin = document.getElementById('cfg-new-pin').value.trim();

      if (wa) localStorage.setItem('psl_seller_wa', wa.replace(/\\D/g, ''));
      if (pix) localStorage.setItem('psl_pix_key', pix);
      if (newPin && newPin.length >= 4) {
        localStorage.setItem('psl_admin_pin', newPin);
        alert("Configurações salvas e Novo PIN atualizado!");
      } else {
        alert("Configurações salvas com sucesso!");
      }
    }

    // Run on load
    checkAuth();
  </script>
</body>
</html>
`;

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/admin.html", adminHtml, "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/web/admin.html", adminHtml, "utf8");
console.log("Admin Panel admin.html successfully generated.");
