const fs = require('fs');

const rawProducts = require('../catalog/psl_products.json');

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

// Function to normalize parent compound name
function getParentCompound(item) {
  const n = item.name.trim();

  // Combos
  if (n.startsWith("BPC") && n.includes("TB")) return { id: "bpc-tb", name: "Blend BPC-157 + TB-500", desc: "Super combo de regeneração tecidual acelerada para articulações e músculos." };
  if (n.includes("Retatrutide") && n.includes("Tirzepatide")) return { id: "reta-tirz", name: "Blend Retatrutide + Tirzepatide", desc: "Sinergia metabólica máxima de controle glicêmico e lipólise profunda." };
  if (n.includes("Semax") && n.includes("Selank")) return { id: "semax-selank", name: "Blend Semax + Selank", desc: "Sinergia de foco cirúrgico e redução de cortisol sem sedação." };
  if (n.includes("CJC1295+Ipamorelin") || (n.includes("CJC") && n.includes("Ipamorelin"))) return { id: "cjc-ipa", name: "Blend CJC-1295 + Ipamorelin", desc: "Estimulação sinérgica de GH e IGF-1 para ganho de massa magra e recuperação." };
  if (n.includes("Tesamorelin") && n.includes("Ipamorelin")) return { id: "tesa-ipa", name: "Blend Tesamorelin + Ipamorelin", desc: "Foco em redução potente de gordura visceral profunda e estímulo de GH." };

  // Single Peptides
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

// Popularity rankings for compounds
function getCompoundRank(id) {
  const ranking = {
    "retatrutide": 1,
    "tirzepatide": 2,
    "semaglutide": 3,
    "bpc-tb": 4,
    "bpc157": 5,
    "tb500": 6,
    "nad": 7,
    "ghk-cu": 8,
    "cjc-ipa": 9,
    "epithalon": 10,
    "semax-selank": 11,
    "semax": 12,
    "selank": 13,
    "5amino1mq": 14,
    "pt141": 15,
    "mots-c": 16,
    "tesa-ipa": 17,
    "tesamorelin": 18,
    "ipamorelin": 19,
    "cjc-dac": 20,
    "cjc-nodac": 21,
    "cagrilintide": 22,
    "aod9604": 23,
    "ahk-cu": 24,
    "thymosin-a1": 25,
    "glutathione": 26,
    "adamax": 27,
    "dsip": 28,
    "kpv": 29,
    "ss31": 30,
    "foxo4": 31,
    "melanotan2": 32,
    "kisspeptin": 33,
    "sermorelin": 34,
    "vip": 35,
    "ara290": 36,
    "snap8": 37,
    "oxytocin": 38,
    "thymalin": 39,
    "igf1": 40,
    "reta-tirz": 41,
    "lcarnitine": 42,
    "lemonbottle": 43,
    "lipoc": 44,
    "mic": 45,
    "b12": 46,
    "glow": 47
  };
  return ranking[id] || 99;
}

// Group products
const compoundMap = new Map();

rawProducts.forEach(item => {
  const meta = getParentCompound(item);
  if (!compoundMap.has(meta.id)) {
    compoundMap.set(meta.id, {
      id: meta.id,
      name: meta.name,
      desc: meta.desc,
      line: getCategoryLine(item.category),
      rank: getCompoundRank(meta.id),
      isTopSeller: getCompoundRank(meta.id) <= 10,
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
    marginPercent: item.marginPercent
  });
});

const compoundList = Array.from(compoundMap.values());

compoundList.forEach(c => {
  c.doses.sort((a, b) => a.doseNum - b.doseNum);
  let defaultIdx = c.doses.findIndex(d => d.doseNum === 10);
  if (defaultIdx === -1 && c.id === 'nad') defaultIdx = c.doses.findIndex(d => d.doseNum === 500);
  if (defaultIdx === -1 && c.id === 'ghk-cu') defaultIdx = c.doses.findIndex(d => d.doseNum === 100);
  if (defaultIdx === -1) defaultIdx = 0;
  c.defaultDoseIndex = defaultIdx;
});

compoundList.sort((a, b) => a.rank - b.rank);

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#145C46">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>PSL Labs — Premium Synthesis Line | Peptídeos de Alta Pureza</title>
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
      --gray-600: #475569;
      --gray-400: #94A3B8;
      --gray-200: #E2E8F0;
      --gray-100: #F1F5F9;
      --bg-page: #F8FAFC;
      --white: #FFFFFF;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 14px -2px rgba(20, 92, 70, 0.08), 0 2px 6px -1px rgba(0,0,0,0.04);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --bottom-bar-height: 64px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg-page);
      color: var(--dark);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      padding-bottom: calc(var(--bottom-bar-height) + env(safe-area-inset-bottom) + 20px);
    }

    /* Top Announcement Bar */
    .flash-banner {
      background: linear-gradient(90deg, #064E3B 0%, #145C46 50%, #064E3B 100%);
      color: var(--white);
      padding: 8px 14px;
      text-align: center;
      font-size: 11.5px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      line-height: 1.3;
    }

    .flash-pill {
      background: rgba(255, 255, 255, 0.22);
      padding: 2px 7px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
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
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
    }

    .header-logo-img {
      height: 44px;
      width: auto;
      max-width: 175px;
      object-fit: contain;
      display: block;
      transition: transform 0.2s ease;
    }

    .header-logo-img:hover {
      transform: scale(1.02);
    }

    @media (max-width: 600px) {
      .header-logo-img {
        height: 38px;
        max-width: 140px;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Tier Switcher B2C vs B2B */
    .tier-box {
      display: flex;
      align-items: center;
      background: var(--primary-light);
      border: 1px solid var(--primary-border);
      border-radius: 24px;
      padding: 2px;
    }

    .tier-btn {
      padding: 6px 11px;
      border: none;
      background: transparent;
      border-radius: 18px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--primary-dark);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .tier-btn.active {
      background: var(--primary);
      color: var(--white);
      box-shadow: 0 1px 4px rgba(20, 92, 70, 0.2);
    }

    /* Desktop Navigation Tabs (Hidden on Mobile) */
    .desktop-nav {
      display: none;
    }

    @media (min-width: 768px) {
      body {
        padding-bottom: 40px;
      }
      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 8px;
      }
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
      }
      .tab-btn.active {
        background: var(--primary);
        color: var(--white);
      }
      .cart-btn-desktop {
        background: var(--dark);
        color: var(--white);
        border: none;
        padding: 9px 16px;
        border-radius: 24px;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      }
    }

    /* Bottom Mobile Navigation Bar (Estilo App Nativo) */
    .mobile-bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: calc(var(--bottom-bar-height) + env(safe-area-inset-bottom));
      padding-bottom: env(safe-area-inset-bottom);
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-top: 1px solid var(--gray-200);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 150;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
    }

    @media (min-width: 768px) {
      .mobile-bottom-bar {
        display: none;
      }
    }

    .bottom-bar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      border: none;
      background: transparent;
      color: var(--gray-600);
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      position: relative;
      transition: color 0.15s ease;
      padding: 4px 0;
    }

    .bottom-bar-item.active {
      color: var(--primary);
    }

    .bottom-bar-icon {
      font-size: 20px;
      line-height: 1.2;
      margin-bottom: 2px;
    }

    .bottom-cart-badge {
      position: absolute;
      top: 6px;
      right: calc(50% - 18px);
      background: #EF4444;
      color: var(--white);
      font-size: 10px;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    /* Main Container */
    .main-wrap {
      max-width: 1280px;
      margin: 12px auto;
      padding: 0 12px;
    }

    @media (min-width: 768px) {
      .main-wrap {
        margin: 24px auto;
        padding: 0 20px;
      }
    }

    /* Controls: Search & Category Filter */
    .controls-panel {
      background: var(--white);
      padding: 12px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--gray-200);
      margin-bottom: 16px;
    }

    @media (min-width: 768px) {
      .controls-panel {
        padding: 18px;
        border-radius: var(--radius-lg);
        margin-bottom: 24px;
      }
    }

    .search-row {
      margin-bottom: 10px;
    }

    .search-input-wrap {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      padding: 12px 14px 12px 40px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 16px; /* Evita auto-zoom no Safari iOS */
      outline: none;
      background: #FAFCFB;
    }

    .search-input:focus {
      border-color: var(--primary);
      background: var(--white);
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
      font-size: 16px;
      pointer-events: none;
    }

    /* Category Chips Mobile Scroll */
    .category-chips-wrap {
      position: relative;
    }

    .category-chips {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 4px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .category-chips::-webkit-scrollbar {
      display: none;
    }

    .chip-btn {
      white-space: nowrap;
      padding: 8px 14px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      color: var(--gray-600);
      font-size: 12.5px;
      font-weight: 600;
      border-radius: 20px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }

    .chip-btn:active {
      transform: scale(0.96);
    }

    .chip-btn.active {
      background: var(--primary);
      color: var(--white);
      border-color: var(--primary);
    }

    /* Section Meta Title */
    .section-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding: 0 4px;
      font-size: 11.5px;
      font-weight: 700;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .sort-indicator {
      color: var(--primary);
      background: var(--primary-light);
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 11px;
    }

    /* Products Grid */
    .products-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    @media (min-width: 640px) {
      .products-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }
    }

    @media (min-width: 1024px) {
      .products-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
    }

    /* Card Mobile Optimized */
    .product-card {
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      padding: 16px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .product-card.top-featured {
      border-color: #A7F3D0;
      background: linear-gradient(180deg, #FFFFFF 0%, #FAFCFB 100%);
    }

    .card-badges {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      gap: 4px;
      flex-wrap: wrap;
    }

    .line-tag {
      font-size: 10.5px;
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 3px 8px;
      border-radius: 12px;
    }

    .badge-top {
      font-size: 10px;
      font-weight: 800;
      color: #9A3412;
      background: #FFEDD5;
      padding: 2px 7px;
      border-radius: 6px;
    }

    .purity-badge {
      font-size: 9.5px;
      font-weight: 700;
      color: #065F46;
      background: #D1FAE5;
      padding: 2px 6px;
      border-radius: 6px;
    }

    .product-title {
      font-size: 18px;
      font-weight: 900;
      color: var(--dark);
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .product-desc {
      font-size: 12px;
      color: var(--gray-600);
      line-height: 1.4;
      margin-bottom: 12px;
    }

    /* Dose Selector Box */
    .dose-selector-box {
      margin-bottom: 14px;
      background: #F8FAFC;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-sm);
      padding: 8px 10px;
    }

    .dose-header {
      font-size: 10.5px;
      font-weight: 700;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }

    .dose-pills-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .dose-pill {
      min-height: 34px;
      padding: 4px 10px;
      border: 1.5px solid var(--gray-200);
      background: var(--white);
      color: var(--dark);
      font-size: 12px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dose-pill:active {
      transform: scale(0.95);
    }

    .dose-pill.active {
      background: var(--primary);
      color: var(--white);
      border-color: var(--primary);
    }

    .dose-select-dropdown {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      border: 1.5px solid var(--gray-200);
      border-radius: 6px;
      font-size: 15px;
      font-weight: 700;
      color: var(--dark);
      outline: none;
      background: var(--white);
    }

    /* Card Pricing Box */
    .card-pricing {
      background: var(--gray-100);
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      margin-bottom: 12px;
    }

    .price-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .price-value {
      font-size: 22px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1.1;
      margin: 1px 0;
    }

    .price-sub {
      font-size: 11px;
      color: #059669;
      font-weight: 600;
    }

    .card-actions {
      display: flex;
      gap: 8px;
    }

    .btn-add {
      flex: 1;
      height: 44px;
      border: none;
      background: var(--primary);
      color: var(--white);
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .btn-add:active {
      background: var(--primary-dark);
      transform: scale(0.98);
    }

    .btn-calc-shortcut {
      height: 44px;
      padding: 0 14px;
      border: 1.5px solid var(--primary-border);
      background: var(--white);
      color: var(--primary);
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-calc-shortcut:active {
      background: var(--primary-light);
    }

    /* Calculator View Mobile */
    .calc-view {
      display: none;
    }

    .calc-container {
      background: var(--white);
      border-radius: var(--radius-md);
      border: 1px solid var(--gray-200);
      box-shadow: var(--shadow-sm);
      padding: 18px 14px;
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      .calc-container {
        padding: 32px;
        border-radius: var(--radius-lg);
      }
    }

    .calc-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .calc-title {
      font-size: 20px;
      font-weight: 900;
      color: var(--primary);
      margin-bottom: 6px;
    }

    .calc-subtitle {
      font-size: 13px;
      color: var(--gray-600);
    }

    .calc-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    @media (min-width: 768px) {
      .calc-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
    }

    .input-group {
      margin-bottom: 16px;
    }

    .input-label {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }

    .select-box, .text-box {
      width: 100%;
      height: 44px;
      padding: 0 12px;
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 16px; /* 16px no iOS previne zoom */
      font-weight: 600;
      outline: none;
      background: var(--white);
    }

    .select-box:focus, .text-box:focus {
      border-color: var(--primary);
    }

    /* Syringe Card */
    .syringe-card {
      background: var(--gray-100);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      padding: 16px 12px;
      text-align: center;
    }

    .result-badge {
      background: var(--primary);
      color: var(--white);
      padding: 10px 16px;
      border-radius: var(--radius-sm);
      margin-bottom: 12px;
    }

    .result-units {
      font-size: 30px;
      font-weight: 900;
    }

    .result-desc {
      font-size: 12px;
      opacity: 0.95;
    }

    .syringe-svg-wrap {
      width: 100%;
      margin: 10px 0;
    }

    .yield-stat {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--gray-600);
      margin-top: 6px;
    }

    /* Guide Steps */
    .guide-steps {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--gray-200);
    }

    @media (min-width: 650px) {
      .guide-steps {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .step-box {
      background: #FAFCFB;
      padding: 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--gray-200);
    }

    .step-num {
      width: 24px;
      height: 24px;
      background: var(--primary-light);
      color: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 12px;
      margin-bottom: 6px;
    }

    .step-title {
      font-size: 13.5px;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .step-text {
      font-size: 11.5px;
      color: var(--gray-600);
      line-height: 1.4;
    }

    /* Cart Modal (Bottom Sheet on Mobile, Drawer on Desktop) */
    .cart-drawer-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 200;
      display: none;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .cart-drawer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: -100%;
      max-height: 90vh;
      background: var(--white);
      z-index: 210;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -10px 40px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      transition: bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media (min-width: 768px) {
      .cart-drawer {
        top: 0;
        bottom: 0;
        left: auto;
        right: -480px;
        width: 460px;
        max-height: 100vh;
        border-radius: 0;
        transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .cart-drawer.open {
        right: 0;
        bottom: 0;
      }
    }

    .cart-drawer.open {
      bottom: 0;
    }

    .cart-drawer-backdrop.open {
      display: block;
      opacity: 1;
    }

    /* Mobile Sheet Grab Handle */
    .sheet-handle {
      width: 40px;
      height: 4px;
      background: var(--gray-200);
      border-radius: 2px;
      margin: 8px auto 2px auto;
    }

    @media (min-width: 768px) {
      .sheet-handle {
        display: none;
      }
    }

    .cart-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cart-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--dark);
    }

    .btn-close-cart {
      background: transparent;
      border: none;
      font-size: 20px;
      color: var(--gray-400);
      padding: 4px 8px;
      cursor: pointer;
    }

    .cart-body {
      flex: 1;
      overflow-y: auto;
      padding: 14px 18px;
      max-height: 45vh;
    }

    @media (min-width: 768px) {
      .cart-body {
        max-height: none;
      }
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid var(--gray-100);
      gap: 10px;
    }

    .item-meta {
      flex: 1;
    }

    .item-name {
      font-size: 13.5px;
      font-weight: 700;
    }

    .item-sub {
      font-size: 11.5px;
      color: var(--gray-600);
    }

    .item-price {
      font-size: 13.5px;
      font-weight: 800;
      color: var(--primary);
    }

    .qty-controls {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-qty {
      width: 28px;
      height: 28px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      border-radius: 6px;
      cursor: pointer;
      font-weight: 700;
      font-size: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cart-footer {
      padding: 14px 18px calc(14px + env(safe-area-inset-bottom)) 18px;
      border-top: 1px solid var(--gray-200);
      background: var(--bg-page);
    }

    .shipping-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      background: var(--white);
      border: 1.5px solid var(--gray-200);
      border-radius: var(--radius-sm);
      margin-bottom: 6px;
      cursor: pointer;
    }

    .shipping-option.selected {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .shipping-title {
      font-size: 12px;
      font-weight: 700;
    }

    .shipping-desc {
      font-size: 10.5px;
      color: var(--gray-600);
    }

    .client-input {
      width: 100%;
      height: 42px;
      padding: 0 12px;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 15px;
      margin-bottom: 6px;
      outline: none;
      background: var(--white);
    }

    .client-input:focus {
      border-color: var(--primary);
    }

    .cart-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-top: 6px;
    }

    .cart-total-label {
      font-size: 14px;
      font-weight: 700;
    }

    .cart-total-val {
      font-size: 22px;
      font-weight: 900;
      color: var(--primary);
    }

    .btn-checkout-whatsapp {
      width: 100%;
      height: 48px;
      background: #25D366;
      color: var(--white);
      border: none;
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 3px 12px rgba(37, 211, 102, 0.3);
    }

    .btn-checkout-whatsapp:active {
      background: #1EBE5D;
      transform: scale(0.98);
    }

    .cfg-modal-btn {
      font-size: 10.5px;
      color: var(--gray-400);
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
      display: block;
      margin-top: 6px;
      text-align: center;
      width: 100%;
    }
  </style>
</head>
<body>

  <!-- Top Announcement Bar -->
  <div class="flash-banner">
    <span class="flash-pill">⚡ Flash SP</span>
    <span>Entrega em até <strong>2h na Grande SP</strong> via Uber Moto • Sedex Brasil <span style="opacity: 0.85; font-size: 10.5px; font-weight: 500;">(envio imediato sujeito à disponibilidade do estoque)</span></span>
  </div>

  <!-- Header -->
  <header>
    <div class="header-container">
      <div class="brand-logo" onclick="switchView('catalog')" title="PSL Labs - Catálogo Oficial">
        <img src="/brand/logo_transparent.png" onerror="this.onerror=null; this.src='/logo.png';" alt="PSL Labs - Premium Synthesis Line" class="header-logo-img">
      </div>

      <div class="header-right">
        <!-- Desktop Navigation Tabs -->
        <div class="desktop-nav">
          <div class="tab-pills">
            <button class="tab-btn active" id="tab-nav-catalog" onclick="switchView('catalog')">
              📦 Catálogo
            </button>
            <button class="tab-btn" id="tab-nav-calc" onclick="switchView('calc')">
              💉 Calculadora
            </button>
          </div>
          <button class="cart-btn-desktop" onclick="toggleCart(true)">
            🛒 Pedido (<span id="cart-badge-count-desktop">0</span>)
          </button>
        </div>

        <!-- Tier Switcher B2C vs B2B -->
        <div class="tier-box">
          <button class="tier-btn active" id="tier-b2c" onclick="setTier('b2c')">
            👤 1 Frasco
          </button>
          <button class="tier-btn" id="tier-b2b" onclick="setTier('b2b')">
            💼 Atacado (10 un)
          </button>
        </div>
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
            <input type="text" id="search-input" class="search-input" placeholder="Buscar peptídeo (ex: Retatrutide, BPC-157)..." oninput="filterCompounds()">
          </div>
        </div>
        <div class="category-chips-wrap">
          <div class="category-chips" id="category-chips">
            <button class="chip-btn active" onclick="setCategory('TODOS')">🔥 Todos</button>
            <button class="chip-btn" onclick="setCategory('Metabolismo & Shape')">⚡ Emagrecimento & GLP-1</button>
            <button class="chip-btn" onclick="setCategory('Regeneração & Articulações')">🩹 Regeneração & Articulações</button>
            <button class="chip-btn" onclick="setCategory('Longevidade & Biohacking')">🧬 Longevidade & NAD+</button>
            <button class="chip-btn" onclick="setCategory('Cérebro & Foco')">🧠 Cérebro & Foco</button>
            <button class="chip-btn" onclick="setCategory('Estética & Pele')">✨ Estética & Pele</button>
            <button class="chip-btn" onclick="setCategory('Massa Magra & GH')">💪 Massa Magra & GH</button>
            <button class="chip-btn" onclick="setCategory('Imunidade & Vitalidade')">🛡️ Imunidade</button>
          </div>
        </div>
      </div>

      <!-- Section Title & Meta -->
      <div class="section-meta-row">
        <span id="section-meta-text">Catálogo Oficial PSL Labs</span>
        <span class="sort-indicator">⭐ Mais Procurados</span>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" id="products-grid"></div>
    </div>

    <!-- CALCULATOR VIEW (PEPTIDE COMPANION) -->
    <div id="calc-view" class="calc-view">
      <div class="calc-container">
        <div class="calc-header">
          <h2 class="calc-title">💉 Calculadora de Reconstituição</h2>
          <p class="calc-subtitle">Saiba exatamente quantos tracinhos puxar na seringa de insulina com segurança.</p>
        </div>

        <div class="calc-grid">
          <!-- Left: Inputs -->
          <div class="calc-inputs">
            <div class="input-group">
              <label class="input-label">1. Concentração do Frasco</label>
              <select id="calc-peptide-select" class="select-box" onchange="onPeptideSelectChange()">
                <option value="10" selected>Retatrutide / Tirzepatide (10 mg) [Top]</option>
                <option value="5">Retatrutide / Tirzepatide (5 mg)</option>
                <option value="15">Retatrutide / Tirzepatide (15 mg)</option>
                <option value="20">Tirzepatide / Retatrutide (20 mg)</option>
                <option value="10">BPC-157 / TB-500 (10 mg) [Top]</option>
                <option value="5">BPC-157 (5 mg)</option>
                <option value="20">BPC-157 + TB-500 Blend (20 mg)</option>
                <option value="500">NAD+ Longevidade (500 mg)</option>
                <option value="100">GHK-Cu Blue Copper (100 mg)</option>
                <option value="10">Semax / Selank (10 mg)</option>
                <option value="custom">Outro valor manual...</option>
              </select>
            </div>

            <div class="input-group" id="manual-mg-wrap" style="display: none;">
              <label class="input-label">Pó no frasco (mg)</label>
              <input type="number" id="calc-vial-mg" class="text-box" value="10" min="0.1" step="0.1" oninput="calculateDose()">
            </div>

            <div class="input-group">
              <label class="input-label">
                2. Água Bacteriostática Adicionada
                <span class="hint">Volume (ml)</span>
              </label>
              <select id="calc-water-ml" class="select-box" onchange="calculateDose()">
                <option value="1">1.0 ml (Mais concentrado)</option>
                <option value="2" selected>2.0 ml (Recomendado)</option>
                <option value="2.5">2.5 ml</option>
                <option value="3">3.0 ml (Mais diluído)</option>
                <option value="5">5.0 ml</option>
              </select>
            </div>

            <div class="input-group">
              <label class="input-label">3. Dose Desejada por Aplicação</label>
              <div style="display: flex; gap: 8px;">
                <input type="number" id="calc-dose-amount" class="text-box" value="500" min="1" step="1" oninput="calculateDose()">
                <select id="calc-dose-unit" class="select-box" style="width: 100px;" onchange="calculateDose()">
                  <option value="mcg" selected>mcg</option>
                  <option value="mg">mg</option>
                </select>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">4. Tipo de Seringa de Insulina</label>
              <select id="calc-syringe-type" class="select-box" onchange="calculateDose()">
                <option value="100" selected>Seringa U-100 (1.0 ml = 100 UI)</option>
                <option value="50">Seringa U-50 (0.5 ml = 50 UI)</option>
                <option value="30">Seringa U-30 (0.3 ml = 30 UI)</option>
              </select>
            </div>
          </div>

          <!-- Right: Syringe Visualizer & Result -->
          <div class="calc-results">
            <div class="syringe-card">
              <div class="result-badge">
                <div class="price-label" style="color: rgba(255,255,255,0.85);">Puxe na seringa até:</div>
                <div class="result-units" id="res-units">10 UI</div>
                <div class="result-desc" id="res-units-desc">10 Unidades de Insulina</div>
              </div>

              <!-- Interactive Syringe SVG (Responsive) -->
              <div class="syringe-svg-wrap">
                <svg id="syringe-svg" viewBox="0 0 320 80" width="100%" height="auto" style="max-height: 80px;">
                  <rect x="30" y="20" width="230" height="40" rx="4" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
                  <rect id="syringe-fluid" x="30" y="22" width="46" height="36" fill="#10B981" opacity="0.75"/>
                  <rect id="syringe-plunger" x="76" y="16" width="6" height="48" fill="#145C46" rx="2"/>
                  <rect id="syringe-rod" x="78" y="36" width="140" height="8" fill="#94A3B8"/>
                  <rect id="syringe-thumb" x="218" y="22" width="12" height="36" rx="3" fill="#64748B"/>
                  <polygon points="30,28 16,36 16,44 30,52" fill="#94A3B8"/>
                  <line x1="16" y1="40" x2="0" y2="40" stroke="#64748B" stroke-width="2"/>
                  <g stroke="#475569" stroke-width="1.5">
                    <line x1="30" y1="20" x2="30" y2="32"/>
                    <line x1="76" y1="20" x2="76" y2="30"/>
                    <line x1="122" y1="20" x2="122" y2="30"/>
                    <line x1="168" y1="20" x2="168" y2="30"/>
                    <line x1="214" y1="20" x2="214" y2="30"/>
                    <line x1="260" y1="20" x2="260" y2="32"/>
                  </g>
                  <text x="30" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">0</text>
                  <text x="76" y="14" font-size="9" font-weight="700" fill="#145C46" text-anchor="middle">20</text>
                  <text x="145" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">50</text>
                  <text x="260" y="14" font-size="9" font-weight="700" fill="#64748B" text-anchor="middle">100 UI</text>
                </svg>
              </div>

              <div class="yield-stat" id="res-yield">
                Rendimento: <strong>20 aplicações</strong>
              </div>
              <div style="font-size: 11px; color: #059669; font-weight: 600; margin-top: 4px;" id="res-concentration">
                5.0 mg/ml (500 mcg a cada 10 UI)
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Step Protocol -->
        <div class="guide-steps">
          <div class="step-box">
            <div class="step-num">1</div>
            <div class="step-title">Injeção Suave</div>
            <div class="step-text">Deixe a água escorrer devagar pela parede do frasco. Nunca jogue o jato direto sobre o pó.</div>
          </div>
          <div class="step-box">
            <div class="step-num">2</div>
            <div class="step-title">Não Chacoalhe</div>
            <div class="step-text">Faça giros lentos e circulares. Peptídeos são frágeis e quebram se forem agitados com força.</div>
          </div>
          <div class="step-box">
            <div class="step-num">3</div>
            <div class="step-title">Geladeira (2°C a 8°C)</div>
            <div class="step-text">Guarde sempre na porta/meio da geladeira. Nunca congele a solução já diluída.</div>
          </div>
        </div>
      </div>
    </div>

    <footer style="text-align: center; margin-top: 50px; padding: 20px 0; border-top: 1px solid var(--gray-200);">
      <div style="font-size: 11.5px; color: var(--gray-400); margin-bottom: 6px;">
        © 2026 PSL Labs — Premium Synthesis Line • Padrão Farmacêutico
      </div>
      <a href="/admin" style="font-size: 11px; color: var(--gray-400); text-decoration: none; opacity: 0.8;">
        🔒 Painel Administrativo Operacional
      </a>
    </footer>
  </div>

  <!-- Mobile Bottom App Bar -->
  <nav class="mobile-bottom-bar">
    <button class="bottom-bar-item active" id="btn-m-catalog" onclick="switchView('catalog')">
      <span class="bottom-bar-icon">📦</span>
      <span>Catálogo</span>
    </button>
    <button class="bottom-bar-item" id="btn-m-calc" onclick="switchView('calc')">
      <span class="bottom-bar-icon">💉</span>
      <span>Calculadora</span>
    </button>
    <button class="bottom-bar-item" onclick="toggleCart(true)">
      <span class="bottom-bar-icon">🛒</span>
      <span>Pedido</span>
      <span class="bottom-cart-badge" id="cart-badge-count-mobile">0</span>
    </button>
    <button class="bottom-bar-item" onclick="directSupportWhatsApp()">
      <span class="bottom-bar-icon">💬</span>
      <span>Dúvidas</span>
    </button>
  </nav>

  <!-- Cart Modal / Bottom Sheet -->
  <div class="cart-drawer-backdrop" id="cart-backdrop" onclick="toggleCart(false)"></div>
  <div class="cart-drawer" id="cart-drawer">
    <div class="sheet-handle"></div>
    <div class="cart-header">
      <div class="cart-title">🛍️ Seu Pedido PSL Labs</div>
      <button class="btn-close-cart" onclick="toggleCart(false)">✕</button>
    </div>

    <div class="cart-body" id="cart-items-wrap">
      <div style="text-align: center; color: var(--gray-400); margin-top: 40px; font-size: 13px;">
        Seu carrinho está vazio.<br>Escolha os peptídeos no catálogo.
      </div>
    </div>

    <div class="cart-footer">
      <!-- Shipping Selector -->
      <div style="margin-bottom: 10px;">
        <label class="input-label" style="margin-bottom: 4px; font-size: 11.5px;">Forma de Entrega:</label>
        
        <div class="shipping-option selected" id="ship-uber" onclick="setShipping('uber')">
          <input type="radio" name="shipping" checked>
          <div>
            <div class="shipping-title">⚡ Uber Moto / Flash — São Paulo (Até 2h)</div>
            <div class="shipping-desc">Capital e Grande SP • <em>Envio imediato sujeito à disponibilidade do estoque</em></div>
          </div>
        </div>

        <div class="shipping-option" id="ship-sedex" onclick="setShipping('sedex')">
          <input type="radio" name="shipping">
          <div>
            <div class="shipping-title">📦 Correios Sedex — Todo o Brasil (2 a 5 dias)</div>
            <div class="shipping-desc">Com proteção isotérmica e rastreio</div>
          </div>
        </div>
      </div>

      <!-- Client Info Form -->
      <input type="text" id="client-name" class="client-input" placeholder="Seu Nome Completo">
      <input type="text" id="client-address" class="client-input" placeholder="Endereço / Bairro ou CEP">

      <!-- Total & Action -->
      <div class="cart-total-row">
        <span class="cart-total-label">Total:</span>
        <span class="cart-total-val" id="cart-total-display">R$ 0,00</span>
      </div>

      <button class="btn-checkout-whatsapp" onclick="checkoutWhatsApp()">
        <span>💬 Enviar Pedido via WhatsApp</span>
      </button>

      <button class="cfg-modal-btn" onclick="promptWhatsappNumber()">
        ⚙️ Configurar WhatsApp de recebimento
      </button>
    </div>
  </div>

  <!-- Embedded Product Database -->
  <script>
    const PSL_COMPOUNDS = ${JSON.stringify(compoundList)};
    
    // Application State
    let currentTier = 'b2c';
    let currentCategory = 'TODOS';
    let currentShipping = 'uber';
    let selectedDoses = {}; // { compoundId: doseIndex }
    let cart = {}; // { productCode: qty }
    let sellerWhatsapp = localStorage.getItem('psl_seller_wa') || '5511999999999';

    // Synchronize Custom Prices and Stock from Admin Panel
    const customPrices = JSON.parse(localStorage.getItem('psl_custom_prices') || '{}');
    const stockData = JSON.parse(localStorage.getItem('psl_stock_data') || '{}');

    PSL_COMPOUNDS.forEach(comp => {
      if (stockData[comp.id]) {
        comp.stockStatus = stockData[comp.id].status;
        comp.stockQty = stockData[comp.id].qty;
      } else {
        comp.stockStatus = 'in_stock';
      }
      comp.doses.forEach(dose => {
        if (customPrices[dose.code + '_b2c']) {
          dose.suggestedPriceB2C = customPrices[dose.code + '_b2c'];
        }
        if (customPrices[dose.code + '_b2b']) {
          dose.b2bBoxPrice = customPrices[dose.code + '_b2b'];
        }
      });
    });

    // Initialize default doses
    PSL_COMPOUNDS.forEach(c => {
      selectedDoses[c.id] = c.defaultDoseIndex || 0;
    });

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
      const btnMCat = document.getElementById('btn-m-catalog');
      const btnMCalc = document.getElementById('btn-m-calc');

      if (view === 'catalog') {
        catView.style.display = 'block';
        calcView.style.display = 'none';
        if (tabCat) tabCat.classList.add('active');
        if (tabCalc) tabCalc.classList.remove('active');
        if (btnMCat) btnMCat.classList.add('active');
        if (btnMCalc) btnMCalc.classList.remove('active');
      } else {
        catView.style.display = 'none';
        calcView.style.display = 'block';
        if (tabCat) tabCat.classList.remove('active');
        if (tabCalc) tabCalc.classList.add('active');
        if (btnMCat) btnMCat.classList.remove('active');
        if (btnMCalc) btnMCalc.classList.add('active');
        calculateDose();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setTier(tier) {
      currentTier = tier;
      document.getElementById('tier-b2c').classList.toggle('active', tier === 'b2c');
      document.getElementById('tier-b2b').classList.toggle('active', tier === 'b2b');
      filterCompounds();
      renderCart();
    }

    function setCategory(cat) {
      currentCategory = cat;
      const buttons = document.querySelectorAll('.chip-btn');
      buttons.forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(cat) || (cat === 'TODOS' && btn.textContent.includes('Todos')));
      });
      filterCompounds();
    }

    function filterCompounds() {
      const q = document.getElementById('search-input').value.toLowerCase().trim();
      const filtered = PSL_COMPOUNDS.filter(c => {
        const matchesCategory = currentCategory === 'TODOS' || c.line === currentCategory;
        const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.doses.some(d => d.label.toLowerCase().includes(q) || d.code.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      });
      renderCompounds(filtered);
    }

    function onSelectDose(compoundId, doseIdx) {
      selectedDoses[compoundId] = parseInt(doseIdx);
      updateCompoundCardUI(compoundId);
    }

    function updateCompoundCardUI(compoundId) {
      const compound = PSL_COMPOUNDS.find(c => c.id === compoundId);
      if (!compound) return;
      const doseIdx = selectedDoses[compoundId] || 0;
      const dose = compound.doses[doseIdx];

      const card = document.getElementById('card-' + compoundId);
      if (!card) return;

      const isB2B = currentTier === 'b2b';
      const price = isB2B ? dose.b2bBoxPrice : dose.suggestedPriceB2C;
      const priceLabel = isB2B ? "Preço de Atacado (Caixa c/ 10 Frascos):" : "Valor Unitário (1 Frasco):";
      const priceSub = isB2B ? "R$ " + (price / 10).toFixed(2) + " por frasco (Caixa c/ 10)" : "✓ 1 Frasco Liofilizado + Água Bacteriostática";

      const valEl = card.querySelector('.price-value');
      const labelEl = card.querySelector('.price-label');
      const subEl = card.querySelector('.price-sub');
      if (valEl) valEl.textContent = "R$ " + price.toFixed(2).replace('.', ',');
      if (labelEl) labelEl.textContent = priceLabel;
      if (subEl) subEl.textContent = priceSub;

      const pills = card.querySelectorAll('.dose-pill');
      pills.forEach((p, idx) => {
        p.classList.toggle('active', idx === doseIdx);
      });
      const dropdown = card.querySelector('.dose-select-dropdown');
      if (dropdown) dropdown.value = doseIdx;
    }

    function renderCompounds(list = PSL_COMPOUNDS) {
      const grid = document.getElementById('products-grid');
      grid.innerHTML = '';

      if (list.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gray-400); font-size: 13.5px;">Nenhum peptídeo encontrado para sua busca.</div>';
        return;
      }

      list.forEach(item => {
        const doseIdx = selectedDoses[item.id] !== undefined ? selectedDoses[item.id] : (item.defaultDoseIndex || 0);
        const currentDose = item.doses[doseIdx] || item.doses[0];

        const isB2B = currentTier === 'b2b';
        const price = isB2B ? currentDose.b2bBoxPrice : currentDose.suggestedPriceB2C;
        const priceLabel = isB2B ? "Preço Atacado (Caixa c/ 10 Frascos):" : "Valor Unitário (1 Frasco):";
        const priceSub = isB2B ? "R$ " + (price / 10).toFixed(2) + " por frasco" : "✓ 1 Frasco + Água Bacteriostática";

        const topBadge = item.isTopSeller ? '<span class="badge-top">🔥 Top</span>' : '';
        const isOutOfStock = item.stockStatus === 'out_of_stock';
        const isPreOrder = item.stockStatus === 'pre_order';
        const stockBadge = isOutOfStock ? '<span class="badge" style="background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px;">🔴 Esgotado</span>' : (isPreOrder ? '<span class="badge" style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:2px 6px;border-radius:6px;">🟡 Sob Encomenda (3-5d)</span>' : '');

        let doseSelectorHtml = '';
        if (item.doses.length > 1) {
          if (item.doses.length <= 5) {
            let pillsHtml = item.doses.map((d, idx) => {
              const activeCls = idx === doseIdx ? ' active' : '';
              return \`<button class="dose-pill\${activeCls}" onclick="onSelectDose('\${item.id}', \${idx})">\${d.label}</button>\`;
            }).join('');
            doseSelectorHtml = \`
              <div class="dose-selector-box">
                <div class="dose-header">
                  <span>Dosagem (\${isB2B ? 'Caixa c/ 10' : '1 Frasco'}):</span>
                  <span style="color: var(--primary); font-weight: 800;">\${item.doses.length} opções</span>
                </div>
                <div class="dose-pills-wrap">\${pillsHtml}</div>
              </div>
            \`;
          } else {
            let optionsHtml = item.doses.map((d, idx) => {
              const selected = idx === doseIdx ? ' selected' : '';
              const doseSub = isB2B ? "Caixa c/ 10 frascos" : "1 Frasco";
              return \`<option value="\${idx}"\${selected}>\${d.label} (\${doseSub})</option>\`;
            }).join('');
            doseSelectorHtml = \`
              <div class="dose-selector-box">
                <div class="dose-header">
                  <span>Dosagem (\${isB2B ? 'Caixa c/ 10' : '1 Frasco'}):</span>
                  <span style="color: var(--primary); font-weight: 800;">\${item.doses.length} opções</span>
                </div>
                <select class="dose-select-dropdown" onchange="onSelectDose('\${item.id}', this.value)">
                  \${optionsHtml}
                </select>
              </div>
            \`;
          }
        } else {
          doseSelectorHtml = \`
            <div class="dose-selector-box" style="padding: 6px 10px;">
              <div style="font-size: 11.5px; font-weight: 700; color: var(--gray-600);">
                Dosagem: <span style="color: var(--primary); font-weight: 800;">\${item.doses[0].label}</span> — <span style="color: var(--dark); font-weight: 600;">\${isB2B ? "Caixa c/ 10" : "1 Frasco"}</span>
              </div>
            </div>
          \`;
        }

        const card = document.createElement('div');
        card.className = 'product-card' + (item.isTopSeller ? ' top-featured' : '');
        card.id = 'card-' + item.id;
        card.innerHTML = \`
          <div class="card-top">
            <div class="card-badges">
              <span class="line-tag">\${item.line}</span>
              \${topBadge}
              \${stockBadge}
              <span class="purity-badge">&gt;99% HPLC</span>
            </div>
            <h3 class="product-title">\${item.name}</h3>
            <p class="product-desc">\${item.desc}</p>
            \${doseSelectorHtml}
          </div>

          <div>
            <div class="card-pricing">
              <div class="price-label">\${priceLabel}</div>
              <div class="price-value">R$ \${price.toFixed(2).replace('.', ',')}</div>
              <div class="price-sub">\${priceSub}</div>
            </div>

            <div class="card-actions">
              \${isOutOfStock ? \`
                <button class="btn-add" style="background:#94A3B8;cursor:not-allowed;" disabled>
                  <span>Esgotado</span>
                </button>
              \` : \`
                <button class="btn-add" onclick="addCurrentCompoundToCart('\${item.id}')">
                  <span>\${isPreOrder ? 'Encomendar' : 'Adicionar'}</span> +
                </button>
              \`}
              <button class="btn-calc-shortcut" title="Calcular Diluição na Seringa" onclick="openCalcForCompound('\${item.id}')">
                💉 Dose
              </button>
            </div>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    function addCurrentCompoundToCart(compoundId) {
      const compound = PSL_COMPOUNDS.find(c => c.id === compoundId);
      if (!compound) return;
      const doseIdx = selectedDoses[compoundId] || 0;
      const dose = compound.doses[doseIdx];
      addToCart(dose.code, compound.name, dose.label);
    }

    function openCalcForCompound(compoundId) {
      const compound = PSL_COMPOUNDS.find(c => c.id === compoundId);
      if (!compound) return;
      const doseIdx = selectedDoses[compoundId] || 0;
      const dose = compound.doses[doseIdx];
      openCalcForProduct(compound.name, dose.doseNum, dose.doseUnit);
    }

    // Cart Management
    function addToCart(code, compoundName, doseLabel) {
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
      const bDesktop = document.getElementById('cart-badge-count-desktop');
      const bMobile = document.getElementById('cart-badge-count-mobile');
      if (bDesktop) bDesktop.textContent = count;
      if (bMobile) bMobile.textContent = count;
    }

    function toggleCart(open) {
      const drawer = document.getElementById('cart-drawer');
      const backdrop = document.getElementById('cart-backdrop');
      if (open) {
        drawer.classList.add('open');
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer.classList.remove('open');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
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

    function findDoseByCode(code) {
      for (const comp of PSL_COMPOUNDS) {
        for (const dose of comp.doses) {
          if (dose.code === code) {
            return { compound: comp, dose: dose };
          }
        }
      }
      return null;
    }

    function renderCart() {
      const wrap = document.getElementById('cart-items-wrap');
      const totalDisplay = document.getElementById('cart-total-display');
      const codes = Object.keys(cart);

      if (codes.length === 0) {
        wrap.innerHTML = '<div style="text-align: center; color: var(--gray-400); margin-top: 40px; font-size: 13px;">Seu carrinho está vazio.<br>Escolha os peptídeos no catálogo.</div>';
        totalDisplay.textContent = 'R$ 0,00';
        return;
      }

      let total = 0;
      let html = '';

      codes.forEach(code => {
        const itemInfo = findDoseByCode(code);
        if (!itemInfo) return;
        const { compound, dose } = itemInfo;
        const qty = cart[code];
        const isB2B = currentTier === 'b2b';
        const unitPrice = isB2B ? dose.b2bBoxPrice : dose.suggestedPriceB2C;
        const sub = unitPrice * qty;
        total += sub;

        html += \`
          <div class="cart-item">
            <div class="item-meta">
              <div class="item-name">\${compound.name} (\${dose.label})</div>
              <div class="item-sub">\${isB2B ? 'Caixa fechada com 10 frascos' : '1 Frasco Liofilizado + Água'}</div>
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
      msg += "*Modalidade:* " + (isB2B ? "Revendedor / Atacado (Caixa com 10 Frascos)" : "Consumidor Final (1 Frasco por item)") + "\\n";
      msg += "-----------------------------------------\\n";
      msg += "*ITENS SELECIONADOS:*\\n";

      codes.forEach(code => {
        const itemInfo = findDoseByCode(code);
        if (!itemInfo) return;
        const { compound, dose } = itemInfo;
        const qty = cart[code];
        const unitPrice = isB2B ? dose.b2bBoxPrice : dose.suggestedPriceB2C;
        const sub = unitPrice * qty;
        total += sub;
        msg += "• " + qty + "x " + compound.name + " " + dose.label + " (" + (isB2B ? "Caixa c/ 10 Frascos" : "1 Frasco") + ") = R$ " + sub.toFixed(2).replace('.', ',') + "\\n";
      });

      msg += "-----------------------------------------\\n";
      msg += "*TOTAL DO PEDIDO:* R$ " + total.toFixed(2).replace('.', ',') + "\\n\\n";
      msg += "*FORMA DE ENTREGA:* " + (currentShipping === 'uber' ? "⚡ Uber Moto / Flash (São Paulo - até 2h - sujeito à disponibilidade de estoque)" : "📦 Correios Sedex (Todo Brasil)") + "\\n";
      msg += "*NOME:* " + clientName + "\\n";
      msg += "*ENDEREÇO / CIDADE:* " + clientAddress + "\\n\\n";
      msg += "Gostaria de confirmar a disponibilidade de estoque para envio imediato e a chave Pix para pagamento!";

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

      const targetDoseMg = doseUnit === 'mcg' ? targetDose / 1000 : targetDose;
      const concentrationMgPerMl = vialMg / waterMl;
      const neededMl = targetDoseMg / concentrationMgPerMl;
      const units = neededMl * 100;
      const totalDoses = Math.floor(vialMg / targetDoseMg);

      const roundedUnits = Math.round(units * 10) / 10;
      document.getElementById('res-units').textContent = roundedUnits + " UI";
      document.getElementById('res-units-desc').textContent = roundedUnits + " Unidades na seringa de insulina";
      document.getElementById('res-yield').innerHTML = "Rendimento: <strong>" + totalDoses + " aplicações</strong>";
      document.getElementById('res-concentration').textContent = concentrationMgPerMl.toFixed(2) + " mg/ml (" + (concentrationMgPerMl * 10).toFixed(0) + " mcg a cada 10 UI)";

      updateSyringeSvg(roundedUnits, syringeMaxUi);
    }

    function updateSyringeSvg(units, maxUnits) {
      const fluid = document.getElementById('syringe-fluid');
      const plunger = document.getElementById('syringe-plunger');
      const rod = document.getElementById('syringe-rod');
      const thumb = document.getElementById('syringe-thumb');

      const ratio = Math.min(Math.max(units / maxUnits, 0), 1);
      const barrelWidth = 230;
      const filledWidth = Math.max(ratio * barrelWidth, 4);

      if (fluid) fluid.setAttribute('width', filledWidth);
      if (plunger) plunger.setAttribute('x', 30 + filledWidth);
      if (rod) rod.setAttribute('x', 30 + filledWidth + 2);
      if (thumb) thumb.setAttribute('x', 30 + filledWidth + 140);
    }

    // Initialize
    renderCompounds();
    calculateDose();
  </script>
</body>
</html>
`;

fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/web/index.html", htmlContent, "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/index.html", htmlContent, "utf8");
console.log("Mobile-first application successfully generated.");
