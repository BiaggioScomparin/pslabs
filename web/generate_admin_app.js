const fs = require('fs');

// Reads compound data from catalog
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
  if (n.includes("CJC1295 without DAC")) return { id: "cjc-nodac", name: "CJC-1295 (sem DAC)", desc: "GHRH pulsátil ideal para protocolos noturnos em conjunto com Ipamorelin." };
  if (n.includes("Kisspeptin-10")) return { id: "kisspeptin", name: "Kisspeptin-10", desc: "Regulador mestre do eixo hipotálamo-hipófise-gonadal para modulação natural de LH/FSH." };
  if (n.includes("Thymalin")) return { id: "thymalin", name: "Thymalin", desc: "Bio-regulador peptídico do timo para reativação do sistema imunológico celular." };
  if (n.includes("Thymosin Alpha 1")) return { id: "thymosin-a1", name: "Thymosin Alpha 1", desc: "Modulador imunitário padrão-ouro para imunossupressão, defesa antiviral e longevidade celular." };
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
    stockQty: 5,
    status: 'in_stock'
  });
});

const compoundList = Array.from(compoundMap.values());

// Read HTML content and build script
const adminHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel Administrativo & DRE · PSL Labs</title>
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
      --gray-900: #0F172A;
      --gray-800: #1E293B;
      --gray-700: #334155;
      --gray-600: #475569;
      --gray-400: #94A3B8;
      --gray-200: #E2E8F0;
      --gray-100: #F1F5F9;
      --bg-page: #F8FAFC;
      --white: #FFFFFF;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 14px -2px rgba(20, 92, 70, 0.08);
      --shadow-lg: 0 12px 28px -4px rgba(0,0,0,0.15);
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 18px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg-page);
      color: var(--dark);
      min-height: 100vh;
    }

    /* Auth Screen Overlay */
    #auth-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(10, 30, 24, 0.95);
      backdrop-filter: blur(12px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 36px 32px;
      max-width: 420px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      text-align: center;
    }

    .auth-input {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid var(--gray-200);
      border-radius: var(--radius-md);
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 6px;
      text-align: center;
      color: var(--primary);
      margin: 16px 0;
      outline: none;
      transition: border 0.2s;
    }
    .auth-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 4px var(--primary-light);
    }

    .btn-auth {
      width: 100%;
      padding: 14px;
      background: var(--primary);
      color: var(--white);
      font-size: 15px;
      font-weight: 700;
      border-radius: var(--radius-md);
      border: none;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-auth:hover { background: var(--primary-dark); }

    /* Admin Shell Layout */
    .admin-wrapper {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar Desktop */
    .admin-sidebar {
      width: 270px;
      background: var(--white);
      border-right: 1px solid var(--gray-200);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
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
      overflow-y: auto;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      font-size: 13.5px;
      font-weight: 600;
      color: var(--gray-700);
      text-decoration: none;
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .nav-link:hover {
      background: var(--gray-100);
      color: var(--primary);
    }
    .nav-link.active {
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 700;
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
    .btn-logout:hover { background: #FEF2F2; }

    /* Main Content */
    .admin-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    .admin-topbar {
      height: 64px;
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .topbar-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--dark);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .admin-mobile-tabs {
      display: none;
      background: var(--white);
      border-bottom: 1px solid var(--gray-200);
      padding: 8px 12px;
      overflow-x: auto;
      white-space: nowrap;
      gap: 6px;
    }

    .m-tab-btn {
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 100px;
      border: 1px solid var(--gray-200);
      background: var(--white);
      color: var(--gray-600);
      cursor: pointer;
    }
    .m-tab-btn.active {
      background: var(--primary);
      color: var(--white);
      border-color: var(--primary);
    }

    .admin-content {
      padding: 24px;
      flex: 1;
    }

    .view-tab {
      display: none;
    }
    .view-tab.active {
      display: block;
    }

    /* KPI Metrics Grid */
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
      padding: 20px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }
    .metric-card.highlight {
      border-color: var(--primary);
      background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%);
    }
    .metric-card.loss-card {
      border-color: #FCA5A5;
      background: linear-gradient(135deg, #FFFFFF 0%, #FEF2F2 100%);
    }

    .metric-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--gray-600);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .metric-val {
      font-size: 28px;
      font-weight: 900;
      color: var(--dark);
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .metric-val.profit-val {
      color: #059669;
    }
    .metric-val.loss-val {
      color: #DC2626;
    }

    .metric-sub {
      font-size: 11.5px;
      color: var(--gray-400);
    }

    /* Panels & Tables */
    .panel {
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 24px;
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .panel-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--dark);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-sm);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
    }

    th {
      background: var(--gray-100);
      color: var(--gray-700);
      font-weight: 700;
      padding: 12px 14px;
      border-bottom: 1px solid var(--gray-200);
      white-space: nowrap;
    }

    td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--gray-200);
      vertical-align: middle;
      color: var(--gray-800);
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #F8FAFC;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .badge-in-stock { background: #DCFCE7; color: #166534; }
    .badge-pre-order { background: #FEF3C7; color: #92400E; }
    .badge-out-of-stock { background: #FEE2E2; color: #991B1B; }
    .badge-peptide { background: #DCFCE7; color: #166534; }
    .badge-water { background: #CFFAFE; color: #0E7490; }
    .badge-box { background: #FEF3C7; color: #92400E; }
    .badge-label { background: #F3E8FF; color: #6B21A8; }
    .badge-supplies { background: #FFE4E6; color: #BE123C; }
    .badge-other { background: #F1F5F9; color: #475569; }

    .filter-pill {
      background: var(--white);
      color: var(--gray-700);
      border: 1px solid var(--gray-200);
      border-radius: 100px;
      padding: 5px 13px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s;
    }
    .filter-pill:hover { background: var(--gray-100); }
    .filter-pill.active { background: var(--primary); color: var(--white); border-color: var(--primary); }

    /* Buttons */
    .btn-sm {
      padding: 7px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.15s;
    }
    .btn-primary { background: var(--primary); color: var(--white); border: none; }
    .btn-primary:hover { background: var(--primary-dark); }
    .btn-success { background: #10B981; color: var(--white); border: none; }
    .btn-success:hover { background: #059669; }
    .btn-danger { background: #EF4444; color: var(--white); border: none; }
    .btn-danger:hover { background: #DC2626; }
    .btn-outline { background: var(--white); color: var(--gray-700); border: 1px solid var(--gray-200); }
    .btn-outline:hover { background: var(--gray-100); }

    /* Form Inputs */
    .form-group {
      margin-bottom: 16px;
    }
    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--gray-700);
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 10px 14px;
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-sm);
      font-size: 13.5px;
      font-family: inherit;
      color: var(--dark);
      outline: none;
      background: var(--white);
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-light);
    }

    /* Modal System */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-backdrop.active {
      display: flex;
    }
    .modal-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      max-width: 520px;
      width: 100%;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
      animation: modalFadeIn 0.2s ease;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid var(--gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--dark);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      flex: 1;
    }
    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--gray-200);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      background: #F8FAFC;
    }

    /* Toast */
    .toast-msg {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #04120E;
      border-left: 4px solid var(--accent);
      color: var(--white);
      padding: 12px 20px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 700;
      box-shadow: var(--shadow-lg);
      z-index: 99999;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.25s ease;
      pointer-events: none;
    }
    .toast-msg.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* Responsive */
    @media (max-width: 900px) {
      .admin-sidebar { display: none; }
      .admin-mobile-tabs { display: flex; }
      .admin-content { padding: 16px; }
      .metrics-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .metrics-grid { grid-template-columns: 1fr; }
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
      <div class="auth-sub" style="font-size: 10px; font-weight: 800; color: var(--primary); letter-spacing: 2.5px; margin-bottom: 14px;">PAINEL OPERACIONAL &amp; DRE</div>
      <p style="font-size: 13.5px; color: var(--gray-600); margin-bottom: 16px;">
        Digite o PIN de segurança para gerenciar compras, vendas, perdas e financeiro:
      </p>
      <input type="password" id="admin-pin-input" class="auth-input" placeholder="••••" maxlength="10">
      <button class="btn-auth" onclick="verifyPin()">Entrar no Painel</button>
      <div style="font-size: 11px; color: var(--gray-400); margin-top: 14px;">PIN Padrão: <strong>psl2026</strong></div>
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
        <div style="font-size: 8px; font-weight: 800; color: var(--primary); letter-spacing: 2px; text-transform: uppercase;">Gestão Financeira &amp; Estoque</div>
      </div>

      <nav class="sidebar-nav">
        <button class="nav-link active" onclick="showTab('dre')">
          <span>📈</span> Lucro Real &amp; DRE
        </button>
        <button class="nav-link" onclick="showTab('compras')">
          <span>🛒</span> Compras (Entradas)
        </button>
        <button class="nav-link" onclick="showTab('vendas')">
          <span>💰</span> Vendas (Saídas)
        </button>
        <button class="nav-link" onclick="showTab('perdas')">
          <span>⚠️</span> Perdas &amp; Avarias
        </button>
        <button class="nav-link" onclick="showTab('balanco')">
          <span>⚖️</span> Balanço por Peptídeo
        </button>
        <button class="nav-link" onclick="showTab('estoque')">
          <span>📦</span> Estoque Pronta-Entrega
        </button>
        <button class="nav-link" onclick="showTab('precos')">
          <span>🏷️</span> Editor de Preços (75%)
        </button>
        <button class="nav-link" onclick="showTab('pedidos')">
          <span>🛍️</span> Pedidos da Loja
        </button>
        <button class="nav-link" onclick="showTab('crm')">
          <span>👥</span> CRM &amp; Recompra
        </button>
        <a href="/marketing" target="_blank" class="nav-link" style="text-decoration: none; color: #25D366; font-weight: 700; border: 1px dashed rgba(37, 211, 102, 0.4);">
          <span>📢</span> Divulgação Status
        </a>
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

    <!-- Main Content Area -->
    <main class="admin-main">
      
      <!-- Topbar -->
      <div class="admin-topbar">
        <div class="topbar-title" id="page-title">📈 Painel de Lucro Real &amp; DRE</div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-sm btn-primary" onclick="openModal('modal-compra')">+ Nova Compra</button>
          <button class="btn-sm btn-success" onclick="openModal('modal-venda')">+ Nova Venda</button>
          <button class="btn-sm btn-danger" onclick="openModal('modal-perda')">+ Registrar Perda</button>
          <a href="/" target="_blank" class="btn-sm btn-outline">Abrir Loja ↗</a>
        </div>
      </div>

      <!-- Mobile Tabs Bar -->
      <div class="admin-mobile-tabs">
        <button class="m-tab-btn active" onclick="showTab('dre')">📈 Lucro Real</button>
        <button class="m-tab-btn" onclick="showTab('compras')">🛒 Compras</button>
        <button class="m-tab-btn" onclick="showTab('vendas')">💰 Vendas</button>
        <button class="m-tab-btn" onclick="showTab('perdas')">⚠️ Perdas</button>
        <button class="m-tab-btn" onclick="showTab('balanco')">⚖️ Balanço</button>
        <button class="m-tab-btn" onclick="showTab('estoque')">📦 Estoque</button>
        <button class="m-tab-btn" onclick="showTab('precos')">🏷️ Preços</button>
        <button class="m-tab-btn" onclick="showTab('pedidos')">🛍️ Pedidos</button>
        <a href="/marketing" target="_blank" class="m-tab-btn" style="text-decoration: none; color: #25D366; font-weight: 700;">📢 Status</a>
        <button class="m-tab-btn" onclick="showTab('config')">⚙️ Config</button>
      </div>

      <div class="admin-content">

        <!-- ========================================================= -->
        <!-- TAB 1: DRE & LUCRO REAL (COMPRAS x VENDAS x PERDAS) -->
        <!-- ========================================================= -->
        <div id="tab-dre" class="view-tab active">
          
          <!-- Top KPI Cards -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">💰 Faturamento Total (Vendas)</div>
              <div class="metric-val" id="kpi-faturamento">R$ 0,00</div>
              <div class="metric-sub" id="kpi-faturamento-sub">0 frascos vendidos</div>
            </div>

            <div class="metric-card">
              <div class="metric-label">📉 CMV (Custo das Vendas)</div>
              <div class="metric-val" style="color: #64748B;" id="kpi-cmv">R$ 0,00</div>
              <div class="metric-sub">Custo pó + insumos dos itens vendidos</div>
            </div>

            <div class="metric-card loss-card">
              <div class="metric-label">⚠️ Prejuízo com Perdas</div>
              <div class="metric-val loss-val" id="kpi-perdas">R$ 0,00</div>
              <div class="metric-sub" id="kpi-perdas-sub">0 frascos descartados/quebrados</div>
            </div>

            <div class="metric-card highlight">
              <div class="metric-label">💎 LUCRO LÍQUIDO REAL</div>
              <div class="metric-val profit-val" id="kpi-lucro-real">R$ 0,00</div>
              <div class="metric-sub" id="kpi-margem-real">Margem Líquida Real: 0%</div>
            </div>
          </div>

          <!-- Secondary Inventory Financial Summary -->
          <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 24px;">
            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">🛒 Total Investido em Compras</div>
              <div style="font-size: 20px; font-weight: 800; color: var(--dark);" id="kpi-total-compras">R$ 0,00</div>
              <div class="metric-sub" id="kpi-compras-sub">0 frascos adquiridos</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">📦 Estoque em Mãos (Frascos)</div>
              <div style="font-size: 20px; font-weight: 800; color: #0284C7;" id="kpi-estoque-qtd">0 unidades</div>
              <div class="metric-sub">Compras - Vendas - Perdas</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">🏷️ Valor de Custo do Estoque</div>
              <div style="font-size: 20px; font-weight: 800; color: #475569;" id="kpi-estoque-custo">R$ 0,00</div>
              <div class="metric-sub">Capital imobilizado em estoque</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">🚀 Potencial de Venda (75%)</div>
              <div style="font-size: 20px; font-weight: 800; color: #059669;" id="kpi-estoque-venda">R$ 0,00</div>
              <div class="metric-sub">Valor de mercado a 75% margem</div>
            </div>
          </div>

          <!-- DRE Summary Card Table -->
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">📊 Demonstrativo de Resultado (DRE Gerencial Consolidado)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Visão executiva precisa do que entrou, o que saiu e o lucro limpo em caixa.</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-sm btn-outline" onclick="exportDataBackup()">💾 Exportar Backup (JSON)</button>
                <button class="btn-sm btn-outline" onclick="resetToDemoData()">🔄 Restaurar Dados Demo</button>
              </div>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Linha Financeira</th>
                    <th>Fórmula Contábil</th>
                    <th>Valor Consolidado</th>
                    <th>% sobre Faturamento</th>
                  </tr>
                </thead>
                <tbody id="dre-table-body">
                  <!-- Dynamically populated -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 2: REGISTRO DE COMPRAS (ENTRADAS / FORNECEDOR) -->
        <!-- ========================================================= -->
        <div id="tab-compras" class="view-tab">
          
          <!-- Summary Metrics Cards for Compras -->
          <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-bottom: 20px;">
            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">🛒 Total Geral Comprado</div>
              <div style="font-size: 20px; font-weight: 800; color: var(--primary);" id="compras-metric-total">R$ 0,00</div>
              <div class="metric-sub" id="compras-metric-total-sub">0 compras cadastradas</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">🧪 Peptídeos (Pó Liofilizado)</div>
              <div style="font-size: 20px; font-weight: 800; color: #166534;" id="compras-metric-pep">R$ 0,00</div>
              <div class="metric-sub" id="compras-metric-pep-sub">0 frascos de pó</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">📦 Insumos & Embalagens</div>
              <div style="font-size: 20px; font-weight: 800; color: #0E7490;" id="compras-metric-insumos">R$ 0,00</div>
              <div class="metric-sub" id="compras-metric-insumos-sub">Água, caixas, etiquetas e kits</div>
            </div>

            <div class="metric-card" style="padding: 14px 18px;">
              <div class="metric-label">📝 Outras Despesas / Frete</div>
              <div style="font-size: 20px; font-weight: 800; color: #475569;" id="compras-metric-outros">R$ 0,00</div>
              <div class="metric-sub" id="compras-metric-outros-sub">Custos operacionais diversos</div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-header" style="flex-wrap: wrap; gap: 12px;">
              <div>
                <div class="panel-title">🛒 Registro de Compras de Estoque & Insumos</div>
                <div style="font-size: 12px; color: var(--gray-600);">Cadastre pedidos de peptídeos, água bacteriostática, caixas térmicas, etiquetas e insumos.</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-sm btn-outline" onclick="seedSuppliesDemo()" title="Adiciona compras de água, caixas, etiquetas e insumos para demonstração">+ Insumos Exemplo</button>
                <button class="btn-sm btn-primary" onclick="openModal('modal-compra')">+ Nova Compra</button>
              </div>
            </div>

            <!-- Category Filter Pills -->
            <div style="padding: 12px 20px; border-bottom: 1px solid var(--gray-200); display: flex; gap: 8px; flex-wrap: wrap; background: #FAFAFA;">
              <button class="filter-pill active" data-cat="all" onclick="filterCompras('all', this)">Todos (<span id="count-all">0</span>)</button>
              <button class="filter-pill" data-cat="peptide" onclick="filterCompras('peptide', this)">🧪 Peptídeos (<span id="count-peptide">0</span>)</button>
              <button class="filter-pill" data-cat="water" onclick="filterCompras('water', this)">💧 Água Bacteriostática (<span id="count-water">0</span>)</button>
              <button class="filter-pill" data-cat="box" onclick="filterCompras('box', this)">📦 Caixas (<span id="count-box">0</span>)</button>
              <button class="filter-pill" data-cat="label" onclick="filterCompras('label', this)">🏷️ Etiquetas (<span id="count-label">0</span>)</button>
              <button class="filter-pill" data-cat="supplies" onclick="filterCompras('supplies', this)">💉 Insumos (<span id="count-supplies">0</span>)</button>
              <button class="filter-pill" data-cat="gift" onclick="filterCompras('gift', this)" style="background: #FFFBEB; border-color: #FDE68A; color: #92400E;">🎁 Brindes (<span id="count-gift">0</span>)</button>
              <button class="filter-pill" data-cat="other" onclick="filterCompras('other', this)">📝 Outros (<span id="count-other">0</span>)</button>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID / Data</th>
                    <th>Categoria & Item</th>
                    <th>Qtd</th>
                    <th>Custo Unit. (R$)</th>
                    <th>Total Pago (R$)</th>
                    <th>Fornecedor / Lote</th>
                    <th>Obs</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="compras-table-body">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 3: REGISTRO DE VENDAS (SAÍDAS / CLIENTES) -->
        <!-- ========================================================= -->
        <div id="tab-vendas" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">💰 Registro e Acompanhamento de Vendas (Saídas)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Controle de todas as vendas com cálculo automático do lucro real de cada transação.</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-sm btn-outline" style="color: #DC2626; border-color: #FECACA;" onclick="clearAllVendas()">🗑️ Zerar Vendas</button>
                <button class="btn-sm btn-success" onclick="openModal('modal-venda')">+ Lançar Nova Venda</button>
              </div>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID / Data</th>
                    <th>Cliente / Canal</th>
                    <th>Peptídeo / Dose</th>
                    <th>Qtd</th>
                    <th>Preço Unit.</th>
                    <th>Custo Unit.</th>
                    <th>Total Venda</th>
                    <th>Lucro Desta Venda</th>
                    <th>Margem</th>
                    <th>Pagto</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="vendas-table-body">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 4: REGISTRO DE PERDAS & AVARIAS (WASTE) -->
        <!-- ========================================================= -->
        <div id="tab-perdas" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">⚠️ Registro de Perdas de Produtos (Quebras, Descarte e Amostras)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Abata do estoque físico e contabilize o prejuízo financeiro real para não distorcer o lucro.</div>
              </div>
              <button class="btn-sm btn-danger" onclick="openModal('modal-perda')">+ Registrar Perda</button>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID / Data</th>
                    <th>Peptídeo / Dose</th>
                    <th>Qtd Perdida</th>
                    <th>Motivo da Perda</th>
                    <th>Custo Unit.</th>
                    <th>Prejuízo Total (R$)</th>
                    <th>Observações</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody id="perdas-table-body">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 5: BALANÇO COMPRAS x VENDAS POR PEPTÍDEO -->
        <!-- ========================================================= -->
        <div id="tab-balanco" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">⚖️ Balanço Consolidado por Peptídeo (Comprado x Vendido x Lucro)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Veja exatamente quais compostos geraram mais lucro líquido e quanto resta de cada um.</div>
              </div>
              <input type="text" id="balanco-search" placeholder="Buscar peptídeo..." oninput="renderBalancoTable()" style="padding: 6px 12px; border: 1px solid var(--gray-200); border-radius: 6px; font-size: 13px;">
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Peptídeo / Dose</th>
                    <th>Comprados</th>
                    <th>Vendidos</th>
                    <th>Perdidos</th>
                    <th>Estoque Físico</th>
                    <th>Total Compras (R$)</th>
                    <th>Total Vendas (R$)</th>
                    <th>CMV Vendas (R$)</th>
                    <th>Prejuízo Perdas</th>
                    <th>LUCRO REAL DO ITEM</th>
                  </tr>
                </thead>
                <tbody id="balanco-table-body">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Balanço de Insumos, Caixas & Outros Gastos -->
          <div class="panel" style="margin-top: 24px;">
            <div class="panel-header">
              <div>
                <div class="panel-title">📦 Balanço Consolidado de Insumos, Caixas & Despesas Operacionais</div>
                <div style="font-size: 12px; color: var(--gray-600);">Acompanhamento de custos com água bacteriostática, embalagens térmicas, etiquetas, insumos e frete.</div>
              </div>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Descrição / Especificação</th>
                    <th>Total Comprado (Qtd)</th>
                    <th>Custo Médio Unitário</th>
                    <th>Total Investido (R$)</th>
                    <th>Perdas Registradas</th>
                    <th>Saldo Investido Líquido</th>
                  </tr>
                </thead>
                <tbody id="balanco-insumos-body">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 6: CONTROLE DE ESTOQUE PRONTA ENTREGA (SP) -->
        <!-- ========================================================= -->
        <div id="tab-estoque" class="view-tab">
          <!-- Estoque KPI Cards -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; margin-bottom: 16px;">
            <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; padding: 14px 18px; box-shadow: var(--shadow-sm);">
              <div style="font-size: 11.5px; font-weight: 700; color: var(--gray-600);">⚡ Compostos Pronta Entrega</div>
              <div style="font-size: 24px; font-weight: 900; color: #059669; margin: 4px 0;" id="kpi-stock-instock-count">0</div>
              <div style="font-size: 11px; color: var(--gray-400);">Com estoque físico disponível em SP</div>
            </div>
            <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; padding: 14px 18px; box-shadow: var(--shadow-sm);">
              <div style="font-size: 11.5px; font-weight: 700; color: var(--gray-600);">⏳ Compostos Sob Encomenda</div>
              <div style="font-size: 24px; font-weight: 900; color: #D97706; margin: 4px 0;" id="kpi-stock-preorder-count">0</div>
              <div style="font-size: 11px; color: var(--gray-400);">Sem compra ou estoque zerado (3-5 dias)</div>
            </div>
            <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; padding: 14px 18px; box-shadow: var(--shadow-sm);">
              <div style="font-size: 11.5px; font-weight: 700; color: var(--gray-600);">📦 Frascos Físicos em SP</div>
              <div style="font-size: 24px; font-weight: 900; color: var(--primary); margin: 4px 0;" id="kpi-stock-total-vials">0</div>
              <div style="font-size: 11px; color: var(--gray-400);">Saldo total de unidades para envio imediato</div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">📦 Controle de Estoque Pronta-Entrega (SP)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Sincronizado automaticamente com Compras x Vendas x Perdas. Somente o que tem estoque físico é Pronta Entrega.</div>
              </div>
              <input type="text" id="stock-search" placeholder="Filtrar composto..." oninput="filterStockTable()" style="padding: 6px 12px; border: 1px solid var(--gray-200); border-radius: 6px; font-size: 13px;">
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Composto</th>
                    <th>Linha</th>
                    <th>Doses Disponíveis</th>
                    <th>Status Loja</th>
                    <th>Frascos SP</th>
                    <th>Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody id="stock-tbody">
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 7: EDITOR DE PREÇOS (75% MARGEM) -->
        <!-- ========================================================= -->
        <div id="tab-precos" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">🏷️ Editor de Preços (B2C &amp; B2B)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Preços padrão configurados com 75% de margem. Você pode personalizar qualquer preço aqui.</div>
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

        <!-- ========================================================= -->
        <!-- TAB 8: PEDIDOS DA LOJA -->
        <!-- ========================================================= -->
        <div id="tab-pedidos" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div class="panel-title">🛍️ Funil de Pedidos Recebidos</div>
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
                  <!-- Injected via JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 9: CRM & ALERTA DE RECOMPRA -->
        <!-- ========================================================= -->
        <div id="tab-crm" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">👥 Previsão de Recompra (LTV de Clientes)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Dispare lembretes no WhatsApp antes que o frasco do cliente acabe (ciclo de 21 a 30 dias).</div>
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
                    <td>Retatrutide 60mg (1 Frasco)</td>
                    <td>22/10/2026</td>
                    <td><strong>Hoje (21 dias)</strong></td>
                    <td><span class="badge" style="background: #FEE2E2; color: #991B1B;">Frasco Terminando</span></td>
                    <td>
                      <button class="btn-sm btn-success" onclick="sendReorderReminder('Dr. Marcelo', 'Retatrutide 60mg', '5511988776655')">💬 Lembrete Recompra</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Camila Albuquerque</strong><br><span style="font-size: 11px; color: var(--gray-400);">11 97766-5544</span></td>
                    <td>GHK-Cu 50mg (1 Frasco)</td>
                    <td>25/10/2026</td>
                    <td>Em 3 dias</td>
                    <td><span class="badge" style="background: #FEF3C7; color: #92400E;">Meio Ciclo</span></td>
                    <td>
                      <button class="btn-sm btn-success" onclick="sendReorderReminder('Camila', 'GHK-Cu 50mg', '5511977665544')">💬 Acompanhar Uso</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ========================================================= -->
        <!-- TAB 10: CONFIGURAÇÕES -->
        <!-- ========================================================= -->
        <div id="tab-config" class="view-tab">
          <div class="panel" style="max-width: 600px;">
            <div class="panel-header">
              <div class="panel-title">⚙️ Configurações Operacionais</div>
            </div>

            <div class="form-group">
              <label class="form-label">Número de WhatsApp Oficial para Receber Pedidos</label>
              <input type="text" id="cfg-wa" class="form-input" placeholder="Ex: 5511999999999">
              <div style="font-size: 11px; color: var(--gray-400); margin-top: 4px;">Código do país (55) + DDD + Telefone sem traços.</div>
            </div>

            <div class="form-group">
              <label class="form-label">Chave Pix Padrão da PSL Labs</label>
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

  <!-- ========================================================= -->
  <!-- MODAL 1: CADASTRAR COMPRA (ENTRADA) -->
  <!-- ========================================================= -->
  <div class="modal-backdrop" id="modal-compra">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">🛒 Registrar Nova Compra (Peptídeos & Insumos)</div>
        <button class="btn-sm btn-outline" onclick="closeModal('modal-compra')">✕</button>
      </div>
      <div class="modal-body">
        
        <!-- Categoria do Item -->
        <div class="form-group">
          <label class="form-label" style="font-weight: 800; color: var(--primary);">Categoria / Tipo de Item</label>
          <select id="compra-category" class="form-select" onchange="onCompraCategoryChange()" style="border: 2px solid var(--primary-light);">
            <option value="peptide">🧪 Peptídeo (Pó Liofilizado)</option>
            <option value="water">💧 Água Bacteriostática</option>
            <option value="box">📦 Caixa (Embalagem Térmica / Envio)</option>
            <option value="label">🏷️ Etiquetas / Rótulos / Lacres</option>
            <option value="supplies">💉 Insumos (Seringas, Swabs, Gelo)</option>
            <option value="other">📝 Outros (Despesas e Gastos Gerais)</option>
          </select>
        </div>

        <!-- Campos para Peptídeo -->
        <div id="compra-fields-peptide">
          <div class="form-group">
            <label class="form-label">Peptídeo / Composto</label>
            <select id="compra-compound" class="form-select" onchange="onCompraCompoundChange()">
              <!-- Populated via JS -->
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Dosagem</label>
            <select id="compra-dose" class="form-select" onchange="onCompraDoseChange()">
              <!-- Populated via JS -->
            </select>
          </div>
        </div>

        <!-- Campos para Insumos / Presets (Água, Caixas, Etiquetas, Insumos) -->
        <div id="compra-fields-preset" style="display: none;">
          <div class="form-group">
            <label class="form-label" id="compra-preset-label">Item / Modelo Padrão</label>
            <select id="compra-preset-select" class="form-select" onchange="onCompraPresetSelectChange()">
              <!-- Populated via JS -->
            </select>
          </div>
          <div class="form-group" id="compra-custom-spec-group" style="display: none;">
            <label class="form-label">Especificação Personalizada</label>
            <input type="text" id="compra-custom-spec" class="form-input" placeholder="Ex: Frasco 10ml tampa flip-off prata">
          </div>
        </div>

        <!-- Campos para Outros -->
        <div id="compra-fields-other" style="display: none;">
          <div class="form-group">
            <label class="form-label">Descrição do Item / Despesa</label>
            <input type="text" id="compra-other-desc" class="form-input" placeholder="Ex: Frete Aéreo Internacional DHL, Fita gomada, etc.">
          </div>
        </div>

        <!-- Opção Brinde da Chinesa / Bonificação (Custo R$ 0,00) -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 10px 14px; margin-bottom: 14px;">
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: 700; color: #166534; font-size: 13px; margin: 0;">
            <input type="checkbox" id="compra-is-gift" onchange="toggleCompraGift(this.checked)" style="width: 18px; height: 18px; accent-color: #10B981; cursor: pointer;">
            <span>🎁 Item recebido como Brinde / Bonificação (Custo R$ 0,00)</span>
          </label>
          <div style="font-size: 11px; color: #15803D; margin-top: 4px; margin-left: 28px;">
            Marque para frascos ou itens enviados de brinde pela fabricante chinesa. O item entra no estoque físico a custo zero, gerando 100% de lucro líquido na venda.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label" id="compra-qty-label">Qtd de Frascos</label>
            <input type="number" id="compra-qty" class="form-input" value="10" min="1" oninput="recalcCompraTotal()">
          </div>
          <div class="form-group">
            <label class="form-label" id="compra-unit-cost-label">Custo Unitário Pó (R$)</label>
            <input type="number" id="compra-unit-cost" class="form-input" step="0.05" value="0.00" oninput="recalcCompraTotal()">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Valor Total Pago (R$)</label>
          <input type="number" id="compra-total-cost" class="form-input" step="0.10" value="0.00" style="font-weight: 800; font-size: 16px; color: var(--primary);">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Data da Compra</label>
            <input type="date" id="compra-date" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Fornecedor / Lote / Nota</label>
            <input type="text" id="compra-supplier" class="form-input" placeholder="Ex: SinoPept / Lote 2611">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Observações</label>
          <input type="text" id="compra-notes" class="form-input" placeholder="Ex: Lote HPLC >99.4%, frascos com vácuo">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-sm btn-outline" onclick="closeModal('modal-compra')">Cancelar</button>
        <button class="btn-sm btn-primary" onclick="saveCompra()">Salvar Compra</button>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL 2: LANÇAR VENDA (SAÍDA) -->
  <!-- ========================================================= -->
  <div class="modal-backdrop" id="modal-venda">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">💰 Lançar Nova Venda Manual</div>
        <button class="btn-sm btn-outline" onclick="closeModal('modal-venda')">✕</button>
      </div>
      <div class="modal-body">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Nome do Cliente</label>
            <input type="text" id="venda-client" class="form-input" placeholder="Ex: Dr. Lucas ou Particular">
          </div>
          <div class="form-group">
            <label class="form-label">Telefone / WhatsApp</label>
            <input type="text" id="venda-phone" class="form-input" placeholder="11 99999-9999">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Peptídeo / Composto</label>
          <select id="venda-compound" class="form-select" onchange="onVendaCompoundChange()">
            <!-- Populated via JS -->
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Dosagem</label>
          <select id="venda-dose" class="form-select" onchange="onVendaDoseChange()">
            <!-- Populated via JS -->
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Quantidade</label>
            <input type="number" id="venda-qty" class="form-input" value="1" min="1" oninput="recalcVendaTotals()">
          </div>
          <div class="form-group">
            <label class="form-label">Preço Cobrado Unit. (R$)</label>
            <input type="number" id="venda-unit-price" class="form-input" step="1" value="0.00" oninput="recalcVendaTotals()">
          </div>
        </div>

        <!-- 1. Custo do Frasco / Peptídeo no Estoque (Calculado das Compras) -->
        <div style="background: #F8FAFC; border: 1px solid var(--gray-200); border-radius: 8px; padding: 10px 12px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <label class="form-label" style="margin-bottom: 0; font-weight: 700; font-size: 13px; color: var(--gray-900);">🧪 Custo Unit. do Peptídeo no Estoque (Compras):</label>
            <span id="venda-compound-stock-badge" class="badge" style="background: #DCFCE7; color: #166534;">Estoque: -- un</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--gray-600);">R$</span>
            <input type="number" id="venda-compound-unit-cost" class="form-input" step="0.01" style="max-width: 120px; font-weight: 700;" oninput="recalcVendaTotals()">
            <span id="venda-compound-cost-origin" style="font-size: 11px; color: var(--gray-500); line-height: 1.3;">Calculado automaticamente pelo valor real das compras</span>
          </div>
        </div>

        <!-- 2. Opções de Inclusão de Custos (Checkboxes Interativos + Valores) -->
        <div style="border: 1px solid #CBD5E1; border-radius: 8px; padding: 12px; margin-bottom: 14px; background: #FFFFFF;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px;">
            <label class="form-label" style="font-size: 13px; font-weight: 800; color: #0F172A; margin: 0;">
              📦 Insumos &amp; Custos Inclusos Nesta Venda:
            </label>
            <span style="font-size: 11px; color: #64748B;">Marque o que acompanha o envio</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Caixa Térmica -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-box-check" checked onchange="recalcVendaTotals()">
                <span>📦 <strong>Caixa Térmica / Isopor</strong></span>
              </label>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-box-val" class="form-input" step="0.10" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="6.50" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Etiqueta / Rótulo -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-label-check" checked onchange="recalcVendaTotals()">
                <span>🏷️ <strong>Etiqueta / Rótulo</strong> <span style="font-size: 11px; color: var(--gray-500);">(un/frasco)</span></span>
              </label>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-label-val" class="form-input" step="0.05" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="0.80" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Água Bacteriostática BAC -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-water-check" checked onchange="recalcVendaTotals()">
                <span>💧 <strong>Água Bacteriostática</strong></span>
              </label>
              <div style="display: flex; align-items: center; gap: 6px;">
                <select id="venda-cost-water-type" class="form-select" style="padding: 2px 4px; font-size: 11px; height: 28px;" onchange="onVendaWaterTypeChange()">
                  <option value="3ml">BAC 3ml (R$ 15,00)</option>
                  <option value="10ml">BAC 10ml (R$ 25,00)</option>
                  <option value="custom">Outro Volume</option>
                </select>
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-water-val" class="form-input" step="0.50" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="15.00" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Insumos Gerais Seringas + Swabs -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-supplies-check" onchange="recalcVendaTotals()">
                <span>💉 <strong>Insumos (Seringas BD 1ml 31G + Swabs)</strong></span>
              </label>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-supplies-val" class="form-input" step="0.10" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="3.20" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Frete / Envio Pago por Nós -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-shipping-check" onchange="recalcVendaTotals()">
                <span>🛵 <strong>Frete Pago por Nós (Motoboy / Sedex)</strong></span>
              </label>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-shipping-val" class="form-input" step="1.00" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="0.00" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Taxa de Gateway / Cartão -->
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 6px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" id="venda-cost-gateway-check" onchange="recalcVendaTotals()">
                <span>💳 <strong>Taxa Maquininha / Gateway (Cartão)</strong></span>
              </label>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                <input type="number" id="venda-cost-gateway-val" class="form-input" step="0.50" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="0.00" oninput="recalcVendaTotals()">
              </div>
            </div>

            <!-- Outro Custo Adicional -->
            <div style="background: #F8FAFC; padding: 8px 10px; border-radius: 6px; border: 1px solid #E2E8F0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer; margin: 0; user-select: none;">
                  <input type="checkbox" id="venda-cost-other-check" onchange="recalcVendaTotals()">
                  <span>➕ <strong>Outro Custo Adicional</strong></span>
                </label>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 12px; color: var(--gray-500);">R$</span>
                  <input type="number" id="venda-cost-other-val" class="form-input" step="1.00" style="width: 75px; padding: 2px 6px; font-size: 12px; height: 28px;" value="0.00" oninput="recalcVendaTotals()">
                </div>
              </div>
              <input type="text" id="venda-cost-other-desc" class="form-input" placeholder="Descrição do custo (ex: Brinde, gelo reutilizável, fita extra)" style="font-size: 11px; padding: 4px 8px; height: 26px;">
            </div>
          </div>
        </div>

        <!-- 3. Demonstrativo do Lucro Líquido Real Desta Venda -->
        <div style="background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #166534; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">
            📊 Demonstrativo do Lucro Líquido Real
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #15803D; margin-bottom: 2px;">
            <span>(+) Valor Cobrado do Cliente:</span>
            <strong id="venda-calc-receita">R$ 0,00</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #DC2626; margin-bottom: 2px;">
            <span>(-) Custo Peptídeo (Estoque/Compras):</span>
            <span id="venda-calc-peptideo">- R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #DC2626; margin-bottom: 4px;">
            <span>(-) Insumos &amp; Custos Extras Selecionados:</span>
            <span id="venda-calc-extras">- R$ 0,00</span>
          </div>
          <div id="venda-extras-list" style="font-size: 11px; color: #4B5563; background: #FFFFFF; padding: 4px 8px; border-radius: 4px; margin-bottom: 8px; border: 1px dashed #CBD5E1;">
            Nenhum custo extra selecionado
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #374151; border-top: 1px solid #BBF7D0; padding-top: 6px; margin-bottom: 4px;">
            <span>Custo Total Real (CMV):</span>
            <strong id="venda-preview-custo">R$ 0,00</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 800; color: #059669; border-top: 2px solid #86EFAC; padding-top: 6px;">
            <span>LUCRO LÍQUIDO DESTA VENDA:</span>
            <span id="venda-preview-lucro" style="font-size: 16px;">R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #047857; margin-top: 3px;">
            <span>Margem Líquida Real:</span>
            <strong id="venda-calc-margem">0.0%</strong>
          </div>
          <span id="venda-preview-total" style="display:none;"></span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Forma de Pagamento</label>
            <select id="venda-pagto" class="form-select">
              <option value="Pix">Pix</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Transferência / Outro">Transferência / Outro</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Canal da Venda</label>
            <select id="venda-canal" class="form-select">
              <option value="WhatsApp">WhatsApp</option>
              <option value="Loja Online">Loja Online</option>
              <option value="Clínica / Atacado">Clínica / Atacado</option>
              <option value="Indicação">Indicação</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Data da Venda</label>
          <input type="date" id="venda-date" class="form-input">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-sm btn-outline" onclick="closeModal('modal-venda')">Cancelar</button>
        <button class="btn-sm btn-success" onclick="saveVenda()">Confirmar Venda</button>
      </div>
    </div>
  </div>

  <!-- ========================================================= -->
  <!-- MODAL 3: REGISTRAR PERDA / AVARIA (WASTE) -->
  <!-- ========================================================= -->
  <div class="modal-backdrop" id="modal-perda">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">⚠️ Registrar Perda ou Avaria (Peptídeos & Insumos)</div>
        <button class="btn-sm btn-outline" onclick="closeModal('modal-perda')">✕</button>
      </div>
      <div class="modal-body">
        
        <!-- Categoria da Perda -->
        <div class="form-group">
          <label class="form-label" style="font-weight: 800; color: #DC2626;">Categoria do Item Perdido / Avariado</label>
          <select id="perda-category" class="form-select" onchange="onPerdaCategoryChange()">
            <option value="peptide">🧪 Peptídeo (Pó Liofilizado)</option>
            <option value="water">💧 Água Bacteriostática</option>
            <option value="box">📦 Caixa / Embalagem Térmica Danificada</option>
            <option value="label">🏷️ Etiquetas / Rótulos Inutilizados</option>
            <option value="supplies">💉 Insumos Gerais (Seringas, Swabs, Gelo)</option>
            <option value="other">📝 Outro Item / Despesa Extra</option>
          </select>
        </div>

        <!-- Campos Peptídeo -->
        <div id="perda-fields-peptide">
          <div class="form-group">
            <label class="form-label">Peptídeo / Composto</label>
            <select id="perda-compound" class="form-select" onchange="onPerdaCompoundChange()">
              <!-- Populated via JS -->
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Dosagem</label>
            <select id="perda-dose" class="form-select" onchange="onPerdaDoseChange()">
              <!-- Populated via JS -->
            </select>
          </div>
        </div>

        <!-- Campos Preset (Água, Caixas, Etiquetas, Insumos) -->
        <div id="perda-fields-preset" style="display: none;">
          <div class="form-group">
            <label class="form-label" id="perda-preset-label">Item / Modelo</label>
            <select id="perda-preset-select" class="form-select" onchange="onPerdaPresetSelectChange()">
              <!-- Populated via JS -->
            </select>
          </div>
        </div>

        <!-- Campos Outros -->
        <div id="perda-fields-other" style="display: none;">
          <div class="form-group">
            <label class="form-label">Descrição do Item Perdido</label>
            <input type="text" id="perda-other-desc" class="form-input" placeholder="Ex: Ampola quebrada, caixa esmagada, etc.">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label" id="perda-qty-label">Qtd Perdida (Frascos)</label>
            <input type="number" id="perda-qty" class="form-input" value="1" min="1" oninput="recalcPerdaTotal()">
          </div>
          <div class="form-group">
            <label class="form-label" id="perda-unit-cost-label">Custo Unitário (R$)</label>
            <input type="number" id="perda-unit-cost" class="form-input" step="0.10" value="0.00" oninput="recalcPerdaTotal()">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Motivo da Perda</label>
          <select id="perda-reason" class="form-select">
            <option value="Frasco quebrado no manuseio/transporte">Frasco quebrado no manuseio ou transporte</option>
            <option value="Embalagem/caixa amassada ou danificada">Embalagem/caixa amassada ou danificada</option>
            <option value="Falha na reconstituição / diluição teste">Falha na reconstituição / diluição teste</option>
            <option value="Perda de vácuo / descarte por validade">Perda de vácuo / descarte por validade</option>
            <option value="Amostra grátis para médico / influenciador">Amostra grátis para médico / parceiro</option>
            <option value="Extravio nos Correios ou Motoboy">Extravio nos Correios ou Motoboy</option>
            <option value="Outro motivo operacional">Outro motivo operacional</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Prejuízo Total Registrado (R$)</label>
          <input type="number" id="perda-total-cost" class="form-input" step="0.10" value="0.00" style="font-weight: 800; font-size: 16px; color: #DC2626;" readonly>
        </div>

        <div class="form-group">
          <label class="form-label">Data da Ocorrência</label>
          <input type="date" id="perda-date" class="form-input">
        </div>

        <div class="form-group">
          <label class="form-label">Observações</label>
          <input type="text" id="perda-notes" class="form-input" placeholder="Detalhes do ocorrido...">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-sm btn-outline" onclick="closeModal('modal-perda')">Cancelar</button>
        <button class="btn-sm btn-danger" onclick="savePerda()">Registrar Prejuízo</button>
      </div>
    </div>
  </div>

  <div id="toast" class="toast-msg">Mensagem salva com sucesso!</div>

  <!-- JavaScript Application Engine -->
  <script>
    const INITIAL_COMPOUNDS = ${JSON.stringify(compoundList)};
    const DEFAULT_PIN = "psl2026";

    // Insumos & Suprimentos Presets
    const SUPPLY_PRESETS = {
      water: {
        label: "Água Bacteriostática",
        unitName: "frascos",
        defaultQty: 20,
        items: [
          { name: "Água Bacteriostática 3ml (Álcool Benzílico 0.9%)", defaultCost: 15.00, spec: "Frasco Ampola 3ml" },
          { name: "Água Bacteriostática 10ml (Álcool Benzílico 0.9%)", defaultCost: 25.00, spec: "Frasco Ampola 10ml" },
          { name: "Água Bacteriostática 20ml (Álcool Benzílico 0.9%)", defaultCost: 35.00, spec: "Frasco Ampola 20ml" },
          { name: "Água Bacteriostática 30ml (Álcool Benzílico 0.9%)", defaultCost: 45.00, spec: "Frasco 30ml" },
          { name: "Ampola Água para Injeção 10ml Estéril", defaultCost: 10.00, spec: "Ampola 10ml" },
          { name: "Outro Volume / Personalizado", defaultCost: 25.00, spec: "Personalizado" }
        ]
      },
      box: {
        label: "Caixas e Embalagens Térmicas",
        unitName: "caixas",
        defaultQty: 50,
        items: [
          { name: "Caixa Térmica Isopor c/ Tampa (Padrão 2-4 Frascos)", defaultCost: 6.50, spec: "Isopor 0.5L" },
          { name: "Caixa Térmica Isopor Média (6-10 Frascos / Kits)", defaultCost: 10.00, spec: "Isopor 1.5L" },
          { name: "Caixa de Papelão Personalizada PSL Labs (Exterior)", defaultCost: 4.80, spec: "Papelão Kraft Branco" },
          { name: "Caixa Padrão Correios / Sedex Pequena", defaultCost: 5.50, spec: "Papelão Sedex" },
          { name: "Outro Tipo de Caixa / Personalizado", defaultCost: 6.00, spec: "Personalizado" }
        ]
      },
      label: {
        label: "Etiquetas, Rótulos e Lacres",
        unitName: "etiquetas",
        defaultQty: 200,
        items: [
          { name: "Rótulos Frasco 58x26mm (Adesivo Vinil Fosco PSL)", defaultCost: 0.80, spec: "Vinil Fosco 58x26" },
          { name: "Lacres de Segurança Holográficos / Destrutíveis", defaultCost: 0.45, spec: "Lacre Holográfico" },
          { name: "Adesivos Selo / Logo PSL Labs para Caixa", defaultCost: 1.20, spec: "Adesivo Redondo 50mm" },
          { name: "Rolo de Etiquetas Térmicas (1.000 un)", defaultCost: 65.00, spec: "Rolo 1.000 un" },
          { name: "Outro Rótulo / Personalizado", defaultCost: 1.00, spec: "Personalizado" }
        ]
      },
      supplies: {
        label: "Insumos Gerais e Acessórios",
        unitName: "unidades",
        defaultQty: 100,
        items: [
          { name: "Seringas de Insulina 1ml Ultra-Fine 31G (BD/Uniqmed)", defaultCost: 1.60, spec: "Seringa 1ml 31G" },
          { name: "Lenços Antissépticos Álcool 70% (Swabs BD)", defaultCost: 0.35, spec: "Swab Álcool 70%" },
          { name: "Gelo Gel Reutilizável Térmico (Bolsas 150ml)", defaultCost: 2.50, spec: "Bolsa Gelo Gel" },
          { name: "Sacos Herméticos Zip-Lock c/ Proteção Bolha", defaultCost: 0.60, spec: "Envelope Zip Bolha" },
          { name: "Kit Completo de Aplicação (Seringa + Swab + Gelo)", defaultCost: 4.50, spec: "Kit Aplicação" },
          { name: "Outro Insumo / Personalizado", defaultCost: 2.00, spec: "Personalizado" }
        ]
      },
      other: {
        label: "Outros Gastos e Despesas",
        unitName: "unidades",
        defaultQty: 1,
        items: [
          { name: "Frete Aéreo Internacional (DHL / FedEx / Aéreo)", defaultCost: 380.00, spec: "Logística Externa" },
          { name: "Taxa Alfandegária / Imposto de Importação", defaultCost: 200.00, spec: "Tributação" },
          { name: "Material de Expedição (Fitas, Embalagens)", defaultCost: 80.00, spec: "Expedição" },
          { name: "Outra Despesa Operacional", defaultCost: 50.00, spec: "Diversos" }
        ]
      }
    };

    // Application State
    let activeTab = 'dre';
    let currentComprasFilter = 'all';
    let stockData = JSON.parse(localStorage.getItem('psl_stock_data') || 'null');
    let customPrices = JSON.parse(localStorage.getItem('psl_custom_prices') || '{}');
    let orders = JSON.parse(localStorage.getItem('psl_orders') || 'null');

    // Compras, Vendas and Perdas State
    let compras = JSON.parse(localStorage.getItem('psl_compras') || 'null');
    let vendas = JSON.parse(localStorage.getItem('psl_vendas') || 'null');
    let perdas = JSON.parse(localStorage.getItem('psl_perdas') || 'null');

    // Default Seed Data matching user's real business inventory
    const defaultCompras = [
      {
        id: "CMP-001",
        date: "2026-11-10",
        category: "peptide",
        compoundId: "ghk-cu",
        code: "CU50",
        name: "GHK-Cu",
        dosage: "50mg",
        qty: 40,
        unitCost: 25.40,
        totalCost: 1016.00,
        supplier: "Fábrica Chinesa / SinoPept",
        notes: "Lote de 40 frascos registrado"
      }
    ];
    const defaultVendas = []; // ZERO vendas iniciais
    const defaultPerdas = [
      {
        id: "PRD-001",
        date: "2026-11-11",
        category: "peptide",
        compoundId: "ghk-cu",
        code: "CU50",
        name: "GHK-Cu",
        dosage: "50mg",
        qty: 10,
        unitCost: 25.40,
        lossTotal: 254.00,
        reason: "Fornecedor não enviou",
        notes: "Faltaram 10 frascos na remessa do fornecedor"
      },
      {
        id: "PRD-002",
        date: "2026-11-12",
        category: "peptide",
        compoundId: "ghk-cu",
        code: "CU50",
        name: "GHK-Cu",
        dosage: "50mg",
        qty: 1,
        unitCost: 25.40,
        lossTotal: 25.40,
        reason: "Uso próprio",
        notes: "Retirado 1 frasco para protocolo pessoal"
      }
    ];

    if (!compras) {
      compras = defaultCompras;
      localStorage.setItem('psl_compras', JSON.stringify(compras));
    }
    if (!vendas) {
      vendas = defaultVendas;
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));
    }
    if (!perdas) {
      perdas = defaultPerdas;
      localStorage.setItem('psl_perdas', JSON.stringify(perdas));
    }

    // Auto-purge old demo mock sales (VND-001..VND-004)
    const demoVendasIds = ['VND-001', 'VND-002', 'VND-003', 'VND-004'];
    if (vendas && vendas.some(v => demoVendasIds.includes(v.id))) {
      vendas = vendas.filter(v => !demoVendasIds.includes(v.id));
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));
    }

    // Auto-purge old mock compras if they contain the old demo non-ghk-cu items
    const demoComprasIds = ['CMP-001', 'CMP-002', 'CMP-003', 'CMP-004', 'CMP-005', 'CMP-006', 'CMP-007', 'CMP-008', 'CMP-009', 'CMP-010'];
    if (compras && compras.some(c => demoComprasIds.includes(c.id) && c.compoundId !== 'ghk-cu')) {
      compras = compras.filter(c => !(demoComprasIds.includes(c.id) && c.compoundId !== 'ghk-cu'));
      if (compras.length === 0) compras = defaultCompras;
      localStorage.setItem('psl_compras', JSON.stringify(compras));
    }

    // Auto-purge old mock perdas (Retatrutide/Água quebradas do demo)
    const demoPerdasIds = ['PRD-001', 'PRD-002'];
    if (perdas && perdas.some(p => demoPerdasIds.includes(p.id) && (p.compoundId === 'retatrutide' || p.compoundId === 'water'))) {
      perdas = perdas.filter(p => !(demoPerdasIds.includes(p.id) && (p.compoundId === 'retatrutide' || p.compoundId === 'water')));
      if (perdas.length === 0) perdas = defaultPerdas;
      localStorage.setItem('psl_perdas', JSON.stringify(perdas));
    }

    // Auto-migrate: ensure every record has category defined
    let migrated = false;
    compras.forEach(c => {
      if (!c.category) {
        c.category = 'peptide';
        migrated = true;
      }
    });
    if (migrated) localStorage.setItem('psl_compras', JSON.stringify(compras));

    let migratedP = false;
    perdas.forEach(p => {
      if (!p.category) {
        p.category = 'peptide';
        migratedP = true;
      }
    });
    if (migratedP) localStorage.setItem('psl_perdas', JSON.stringify(perdas));

    // Default orders demo if empty
    if (!orders) {
      orders = [];
      localStorage.setItem('psl_orders', JSON.stringify(orders));
    } else {
      const demoOrdersIds = ['PED-1081', 'PED-1082'];
      if (orders.some(o => demoOrdersIds.includes(o.id))) {
        orders = orders.filter(o => !demoOrdersIds.includes(o.id));
        localStorage.setItem('psl_orders', JSON.stringify(orders));
      }
    }

    // Auth verification
    function checkAuthOnLoad() {
      const isAuth = sessionStorage.getItem('psl_admin_auth');
      if (isAuth === 'true') {
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-app').style.display = 'flex';
        initializeApp();
      } else {
        document.getElementById('auth-overlay').style.display = 'flex';
        document.getElementById('admin-app').style.display = 'none';
        document.getElementById('admin-pin-input').focus();
      }
    }

    function verifyPin() {
      const savedPin = localStorage.getItem('psl_admin_pin') || DEFAULT_PIN;
      const inputPin = document.getElementById('admin-pin-input').value.trim();
      if (inputPin === savedPin) {
        sessionStorage.setItem('psl_admin_auth', 'true');
        document.getElementById('auth-overlay').style.display = 'none';
        document.getElementById('admin-app').style.display = 'flex';
        initializeApp();
      } else {
        alert("PIN Incorreto! O PIN padrão inicial é: " + DEFAULT_PIN);
      }
    }

    document.getElementById('admin-pin-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') verifyPin();
    });

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
        const onclick = l.getAttribute('onclick') || '';
        if (onclick.includes(tabId)) l.classList.add('active');
      });

      // Update mobile tabs
      const mTabs = document.querySelectorAll('.m-tab-btn');
      mTabs.forEach(t => {
        const onclick = t.getAttribute('onclick') || '';
        if (onclick.includes(tabId)) t.classList.add('active');
      });

      // Update Topbar Title
      const titles = {
        'dre': '📈 Painel de Lucro Real & DRE',
        'compras': '🛒 Registro de Compras de Estoque',
        'vendas': '💰 Registro e Acompanhamento de Vendas',
        'perdas': '⚠️ Registro de Perdas & Avarias',
        'balanco': '⚖️ Balanço Compras x Vendas por Peptídeo',
        'estoque': '📦 Estoque Pronta-Entrega',
        'precos': '🏷️ Editor de Preços (75% Margem)',
        'pedidos': '🛍️ Pedidos da Loja',
        'crm': '👥 CRM & Previsão de Recompra',
        'config': '⚙️ Configurações'
      };
      if (titles[tabId]) document.getElementById('page-title').innerHTML = titles[tabId];

      if (tabId === 'dre') renderDRE();
      if (tabId === 'compras') renderComprasTable();
      if (tabId === 'vendas') renderVendasTable();
      if (tabId === 'perdas') renderPerdasTable();
      if (tabId === 'balanco') renderBalancoTable();
    }

    // Modal Helpers
    function openModal(modalId) {
      document.getElementById(modalId).classList.add('active');
      const today = new Date().toISOString().split('T')[0];

      if (modalId === 'modal-compra') {
        document.getElementById('compra-date').value = today;
        populateCompoundSelect('compra-compound', 'compra-dose');
        document.getElementById('compra-category').value = 'peptide';
        const giftCheck = document.getElementById('compra-is-gift');
        if (giftCheck) giftCheck.checked = false;
        onCompraCategoryChange();
      } else if (modalId === 'modal-venda') {
        document.getElementById('venda-date').value = today;
        populateCompoundSelect('venda-compound', 'venda-dose');
        onVendaCompoundChange();
      } else if (modalId === 'modal-perda') {
        document.getElementById('perda-date').value = today;
        populateCompoundSelect('perda-compound', 'perda-dose');
        document.getElementById('perda-category').value = 'peptide';
        onPerdaCategoryChange();
      }
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('active');
    }

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2500);
    }

    // Populate Selects from INITIAL_COMPOUNDS
    function populateCompoundSelect(compSelectId, doseSelectId) {
      const sel = document.getElementById(compSelectId);
      sel.innerHTML = '';
      INITIAL_COMPOUNDS.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.innerText = c.name + " (" + c.doses.length + " doses)";
        sel.appendChild(opt);
      });
    }

// Category Switcher for Compra Modal
    function onCompraCategoryChange() {
      const cat = document.getElementById('compra-category').value;
      const peptideFields = document.getElementById('compra-fields-peptide');
      const presetFields = document.getElementById('compra-fields-preset');
      const otherFields = document.getElementById('compra-fields-other');
      const qtyLabel = document.getElementById('compra-qty-label');
      const costLabel = document.getElementById('compra-unit-cost-label');
      const customSpecGroup = document.getElementById('compra-custom-spec-group');

      if (cat === 'peptide') {
        peptideFields.style.display = 'block';
        presetFields.style.display = 'none';
        otherFields.style.display = 'none';
        if (customSpecGroup) customSpecGroup.style.display = 'none';
        qtyLabel.innerText = 'Qtd de Frascos';
        costLabel.innerText = 'Custo Unitário Pó (R$)';
        document.getElementById('compra-qty').value = 10;
        onCompraCompoundChange();
      } else if (cat === 'other') {
        peptideFields.style.display = 'none';
        presetFields.style.display = 'none';
        otherFields.style.display = 'block';
        if (customSpecGroup) customSpecGroup.style.display = 'none';
        qtyLabel.innerText = 'Quantidade';
        costLabel.innerText = 'Valor / Custo Unit. (R$)';
        document.getElementById('compra-qty').value = 1;
        document.getElementById('compra-unit-cost').value = '50.00';
        recalcCompraTotal();
      } else {
        // water, box, label, supplies
        peptideFields.style.display = 'none';
        presetFields.style.display = 'block';
        otherFields.style.display = 'none';

        const info = SUPPLY_PRESETS[cat];
        qtyLabel.innerText = 'Qtd de ' + info.unitName;
        costLabel.innerText = 'Custo Unitário (R$)';

        const sel = document.getElementById('compra-preset-select');
        sel.innerHTML = '';
        info.items.forEach((it, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          opt.innerText = it.name + ' (R$ ' + it.defaultCost.toFixed(2) + ')';
          sel.appendChild(opt);
        });

        document.getElementById('compra-qty').value = info.defaultQty;
        onCompraPresetSelectChange();
      }
    }

    function onCompraPresetSelectChange() {
      const cat = document.getElementById('compra-category').value;
      const sel = document.getElementById('compra-preset-select');
      const idx = parseInt(sel.value) || 0;
      const info = SUPPLY_PRESETS[cat];
      if (info && info.items[idx]) {
        const item = info.items[idx];
        document.getElementById('compra-unit-cost').value = item.defaultCost.toFixed(2);
        const customGroup = document.getElementById('compra-custom-spec-group');
        if (item.spec === 'Personalizado') {
          customGroup.style.display = 'block';
        } else {
          customGroup.style.display = 'none';
        }
      }
      recalcCompraTotal();
    }

    // Category Switcher for Perda Modal
    function onPerdaCategoryChange() {
      const cat = document.getElementById('perda-category').value;
      const peptideFields = document.getElementById('perda-fields-peptide');
      const presetFields = document.getElementById('perda-fields-preset');
      const otherFields = document.getElementById('perda-fields-other');
      const qtyLabel = document.getElementById('perda-qty-label');
      const costLabel = document.getElementById('perda-unit-cost-label');

      if (cat === 'peptide') {
        peptideFields.style.display = 'block';
        presetFields.style.display = 'none';
        otherFields.style.display = 'none';
        qtyLabel.innerText = 'Qtd Perdida (Frascos)';
        costLabel.innerText = 'Custo Unitário Pó (R$)';
        onPerdaCompoundChange();
      } else if (cat === 'other') {
        peptideFields.style.display = 'none';
        presetFields.style.display = 'none';
        otherFields.style.display = 'block';
        qtyLabel.innerText = 'Qtd Perdida';
        costLabel.innerText = 'Custo / Valor Unit. (R$)';
        document.getElementById('perda-qty').value = 1;
        document.getElementById('perda-unit-cost').value = '50.00';
        recalcPerdaTotal();
      } else {
        peptideFields.style.display = 'none';
        presetFields.style.display = 'block';
        otherFields.style.display = 'none';

        const info = SUPPLY_PRESETS[cat];
        qtyLabel.innerText = 'Qtd Perdida (' + info.unitName + ')';
        costLabel.innerText = 'Custo Unitário (R$)';

        const sel = document.getElementById('perda-preset-select');
        sel.innerHTML = '';
        info.items.forEach((it, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          opt.innerText = it.name + ' (R$ ' + it.defaultCost.toFixed(2) + ')';
          sel.appendChild(opt);
        });

        document.getElementById('perda-qty').value = 1;
        onPerdaPresetSelectChange();
      }
    }

    function onPerdaPresetSelectChange() {
      const cat = document.getElementById('perda-category').value;
      const sel = document.getElementById('perda-preset-select');
      const idx = parseInt(sel.value) || 0;
      const info = SUPPLY_PRESETS[cat];
      if (info && info.items[idx]) {
        document.getElementById('perda-unit-cost').value = info.items[idx].defaultCost.toFixed(2);
      }
      recalcPerdaTotal();
    }

    function filterCompras(cat, btn) {
      currentComprasFilter = cat;
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderComprasTable();
    }

    function getCategoryBadge(cat) {
      switch(cat) {
        case 'water':
          return '<span class="badge badge-water">💧 Água Bacteriostática</span>';
        case 'box':
          return '<span class="badge badge-box">📦 Caixa Térmica</span>';
        case 'label':
          return '<span class="badge badge-label">🏷️ Etiquetas / Rótulos</span>';
        case 'supplies':
          return '<span class="badge badge-supplies">💉 Insumos Gerais</span>';
        case 'other':
          return '<span class="badge badge-other">📝 Outros Gastos</span>';
        default:
          return '<span class="badge badge-peptide">🧪 Peptídeo</span>';
      }
    }

    function seedSuppliesDemo() {
      const samples = [
        { id: "CMP-" + String(compras.length + 1).padStart(3, '0'), date: new Date().toISOString().split('T')[0], category: "water", compoundId: "water", code: "AGUA-10ML", name: "Água Bacteriostática", dosage: "10ml (Álcool Benzílico 0.9%)", qty: 50, unitCost: 25.00, totalCost: 1250.00, supplier: "PharmaGrade Soluções", notes: "Frascos ampolas lacrados estéreis" },
        { id: "CMP-" + String(compras.length + 2).padStart(3, '0'), date: new Date().toISOString().split('T')[0], category: "box", compoundId: "box", code: "CAIXA-TER", name: "Caixa Térmica Isopor", dosage: "Padrão 2-4 Frascos c/ Tampa", qty: 100, unitCost: 6.50, totalCost: 650.00, supplier: "Térmicas Express SP", notes: "Isopor EPS alta densidade" },
        { id: "CMP-" + String(compras.length + 3).padStart(3, '0'), date: new Date().toISOString().split('T')[0], category: "label", compoundId: "label", code: "ROT-VINIL", name: "Etiquetas & Rótulos", dosage: "Rótulo Frasco 58x26mm Vinil Fosco", qty: 500, unitCost: 0.80, totalCost: 400.00, supplier: "LabelPrint Tech", notes: "Adesivo impermeável fosco PSL" },
        { id: "CMP-" + String(compras.length + 4).padStart(3, '0'), date: new Date().toISOString().split('T')[0], category: "supplies", compoundId: "supplies", code: "INS-SER", name: "Insumos Gerais", dosage: "Seringas BD 1ml 31G + Swabs", qty: 200, unitCost: 1.60, totalCost: 320.00, supplier: "MedCirúrgica Distribuidora", notes: "Agulha ultrafina 31G" }
      ];
      samples.forEach(s => compras.unshift(s));
      localStorage.setItem('psl_compras', JSON.stringify(compras));
      showToast("4 compras de insumos adicionadas com sucesso!");
      renderDRE();
      renderComprasTable();
      renderBalancoTable();
    }

    function onCompraCompoundChange() {
      const compId = document.getElementById('compra-compound').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const doseSel = document.getElementById('compra-dose');
      doseSel.innerHTML = '';
      if (comp) {
        comp.doses.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.code;
          opt.innerText = d.label + " (" + d.spec + ")";
          doseSel.appendChild(opt);
        });
      }
      onCompraDoseChange();
    }

    function onCompraDoseChange() {
      const compId = document.getElementById('compra-compound').value;
      const doseCode = document.getElementById('compra-dose').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      if (comp) {
        const dose = comp.doses.find(d => d.code === doseCode);
        if (dose) {
          document.getElementById('compra-unit-cost').value = dose.powderCostPerVial.toFixed(2);
          recalcCompraTotal();
        }
      }
    }

    function toggleCompraGift(isGift) {
      const costInput = document.getElementById('compra-unit-cost');
      const totalInput = document.getElementById('compra-total-cost');
      const notesInput = document.getElementById('compra-notes');
      const supplierInput = document.getElementById('compra-supplier');

      if (isGift) {
        costInput.value = '0.00';
        totalInput.value = '0.00';
        if (!notesInput.value) {
          notesInput.value = '🎁 Brinde da chinesa (custo R$ 0,00)';
        }
        if (!supplierInput.value || supplierInput.value === 'Fornecedor Padrão') {
          supplierInput.value = 'SinoPept / Fábrica Chinesa';
        }
      } else {
        const cat = document.getElementById('compra-category').value;
        if (cat === 'peptide') {
          onCompraDoseChange();
        } else if (cat === 'other') {
          costInput.value = '50.00';
        } else {
          onCompraPresetSelectChange();
        }
        recalcCompraTotal();
      }
    }

    function recalcCompraTotal() {
      const giftCheck = document.getElementById('compra-is-gift');
      const isGift = giftCheck ? giftCheck.checked : false;
      const qty = parseFloat(document.getElementById('compra-qty').value) || 0;
      const unit = parseFloat(document.getElementById('compra-unit-cost').value) || 0;
      
      if (isGift || unit === 0) {
        document.getElementById('compra-total-cost').value = '0.00';
      } else {
        document.getElementById('compra-total-cost').value = (qty * unit).toFixed(2);
      }
    }

    function onVendaCompoundChange() {
      const compId = document.getElementById('venda-compound').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const doseSel = document.getElementById('venda-dose');
      doseSel.innerHTML = '';
      if (comp) {
        comp.doses.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.code;
          opt.innerText = d.label + " (" + d.spec + ")";
          doseSel.appendChild(opt);
        });
      }
      onVendaDoseChange();
    }

    function onVendaDoseChange() {
      const compId = document.getElementById('venda-compound').value;
      const doseCode = document.getElementById('venda-dose').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      if (comp) {
        const dose = comp.doses.find(d => d.code === doseCode);
        if (dose) {
          // Preço sugerido do catálogo
          document.getElementById('venda-unit-price').value = dose.suggestedPriceB2C.toFixed(2);

          // 1. Custo Real do Peptídeo calculado pelo estoque e compras
          const matchingCompras = compras.filter(c => c.code === doseCode && !c.isGift && Number(c.unitCost) > 0);
          let baseVialCost = 0;
          let costOriginText = '';

          if (matchingCompras.length > 0) {
            const totalSpent = matchingCompras.reduce((sum, c) => sum + (Number(c.totalCost) || (Number(c.qty) * Number(c.unitCost))), 0);
            const totalQty = matchingCompras.reduce((sum, c) => sum + (Number(c.qty) || 0), 0);
            baseVialCost = totalQty > 0 ? (totalSpent / totalQty) : (matchingCompras[0].unitCost || 0);
            costOriginText = 'Custo real das compras cadastradas (' + totalQty + ' un compradas)';
          } else {
            baseVialCost = dose.powderCostPerVial || 25.00;
            costOriginText = 'Custo estimado de catálogo (sem compra cadastrada ainda)';
          }

          document.getElementById('venda-compound-unit-cost').value = baseVialCost.toFixed(2);
          document.getElementById('venda-compound-cost-origin').innerText = costOriginText;

          // 2. Saldo atual em estoque físico
          const comprados = compras.filter(c => c.code === doseCode).reduce((a, b) => a + (Number(b.qty) || 0), 0);
          const vendidos = vendas.filter(v => v.code === doseCode).reduce((a, b) => a + (Number(b.qty) || 0), 0);
          const perdidos = perdas.filter(p => p.code === doseCode).reduce((a, b) => a + (Number(p.qty) || 0), 0);
          const saldo = Math.max(0, comprados - vendidos - perdidos);

          const stockBadge = document.getElementById('venda-compound-stock-badge');
          if (stockBadge) {
            stockBadge.innerText = 'Estoque: ' + saldo + ' un';
            if (saldo > 0) {
              stockBadge.style.background = '#DCFCE7';
              stockBadge.style.color = '#166534';
            } else {
              stockBadge.style.background = '#FEF3C7';
              stockBadge.style.color = '#92400E';
            }
          }

          // 3. Atualizar custos de insumos das compras reais cadastradas
          const boxCompras = compras.filter(c => c.category === 'box' && Number(c.unitCost) > 0);
          if (boxCompras.length > 0) {
            document.getElementById('venda-cost-box-val').value = Number(boxCompras[0].unitCost).toFixed(2);
          }

          const labelCompras = compras.filter(c => c.category === 'label' && Number(c.unitCost) > 0);
          if (labelCompras.length > 0) {
            document.getElementById('venda-cost-label-val').value = Number(labelCompras[0].unitCost).toFixed(2);
          }

          const waterCompras = compras.filter(c => c.category === 'water' && Number(c.unitCost) > 0);
          if (waterCompras.length > 0) {
            const lastWater = waterCompras[0];
            if (lastWater.dosage && lastWater.dosage.includes('3ml')) {
              document.getElementById('venda-cost-water-val').value = Number(lastWater.unitCost).toFixed(2);
            }
          }

          const suppliesCompras = compras.filter(c => c.category === 'supplies' && Number(c.unitCost) > 0);
          if (suppliesCompras.length > 0) {
            document.getElementById('venda-cost-supplies-val').value = Number(suppliesCompras[0].unitCost).toFixed(2);
          }

          recalcVendaTotals();
        }
      }
    }

    function onVendaWaterTypeChange() {
      const type = document.getElementById('venda-cost-water-type').value;
      if (type === '3ml') {
        document.getElementById('venda-cost-water-val').value = '15.00';
      } else if (type === '10ml') {
        document.getElementById('venda-cost-water-val').value = '25.00';
      }
      recalcVendaTotals();
    }

    function recalcVendaTotals() {
      const qty = parseFloat(document.getElementById('venda-qty').value) || 0;
      const unitPrice = parseFloat(document.getElementById('venda-unit-price').value) || 0;
      const vialCost = parseFloat(document.getElementById('venda-compound-unit-cost').value) || 0;

      const totalSale = qty * unitPrice;
      const totalPeptideCost = qty * vialCost;

      let extrasCost = 0;
      const extrasList = [];

      // 1. Caixa Térmica / Isopor (por pedido)
      const boxCheck = document.getElementById('venda-cost-box-check');
      if (boxCheck && boxCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-box-val').value) || 0;
        extrasCost += val;
        extrasList.push('Caixa (R$ ' + val.toFixed(2) + ')');
      }

      // 2. Etiqueta / Rótulo (por frasco vendido)
      const labelCheck = document.getElementById('venda-cost-label-check');
      if (labelCheck && labelCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-label-val').value) || 0;
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push('Etiqueta (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 3. Água Bacteriostática (por frasco vendido)
      const waterCheck = document.getElementById('venda-cost-water-check');
      if (waterCheck && waterCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-water-val').value) || 0;
        const waterType = document.getElementById('venda-cost-water-type').value;
        const typeLabel = waterType === '3ml' ? 'Água BAC 3ml' : (waterType === '10ml' ? 'Água BAC 10ml' : 'Água BAC');
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push(typeLabel + ' (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 4. Kit Insumos Seringas + Swabs (por frasco vendido)
      const suppliesCheck = document.getElementById('venda-cost-supplies-check');
      if (suppliesCheck && suppliesCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-supplies-val').value) || 0;
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push('Seringas/Swabs (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 5. Frete Pago pela Loja
      const shippingCheck = document.getElementById('venda-cost-shipping-check');
      if (shippingCheck && shippingCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-shipping-val').value) || 0;
        extrasCost += val;
        extrasList.push('Frete (R$ ' + val.toFixed(2) + ')');
      }

      // 6. Taxa Cartão / Gateway
      const gatewayCheck = document.getElementById('venda-cost-gateway-check');
      if (gatewayCheck && gatewayCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-gateway-val').value) || 0;
        extrasCost += val;
        extrasList.push('Taxa Cartão (R$ ' + val.toFixed(2) + ')');
      }

      // 7. Outro Custo Adicional
      const otherCheck = document.getElementById('venda-cost-other-check');
      if (otherCheck && otherCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-other-val').value) || 0;
        const desc = document.getElementById('venda-cost-other-desc').value.trim() || 'Outro Custo';
        extrasCost += val;
        extrasList.push(desc + ' (R$ ' + val.toFixed(2) + ')');
      }

      const totalCost = totalPeptideCost + extrasCost;
      const profit = totalSale - totalCost;
      const margin = totalSale > 0 ? ((profit / totalSale) * 100) : 0;

      // Update Top & Breakdown UI
      document.getElementById('venda-preview-total').innerText = 'R$ ' + totalSale.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('venda-preview-custo').innerText = 'R$ ' + totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('venda-preview-lucro').innerText = 'R$ ' + profit.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      if (document.getElementById('venda-calc-receita')) {
        document.getElementById('venda-calc-receita').innerText = 'R$ ' + totalSale.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('venda-calc-peptideo').innerText = '- R$ ' + totalPeptideCost.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + ' (' + qty + ' un × R$ ' + vialCost.toFixed(2) + ')';
        document.getElementById('venda-calc-extras').innerText = '- R$ ' + extrasCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('venda-extras-list').innerText = extrasList.length > 0 ? extrasList.join(' • ') : 'Nenhum insumo extra selecionado';
        document.getElementById('venda-calc-margem').innerText = margin.toFixed(1) + '%';
      }
    }

    function onPerdaCompoundChange() {
      const compId = document.getElementById('perda-compound').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const doseSel = document.getElementById('perda-dose');
      doseSel.innerHTML = '';
      if (comp) {
        comp.doses.forEach(d => {
          const opt = document.createElement('option');
          opt.value = d.code;
          opt.innerText = d.label + " (" + d.spec + ")";
          doseSel.appendChild(opt);
        });
      }
      onPerdaDoseChange();
    }

    function onPerdaDoseChange() {
      const compId = document.getElementById('perda-compound').value;
      const doseCode = document.getElementById('perda-dose').value;
      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      if (comp) {
        const dose = comp.doses.find(d => d.code === doseCode);
        if (dose) {
          document.getElementById('perda-unit-cost').value = dose.powderCostPerVial.toFixed(2);
          recalcPerdaTotal();
        }
      }
    }

    function recalcPerdaTotal() {
      const qty = parseFloat(document.getElementById('perda-qty').value) || 0;
      const unitCost = parseFloat(document.getElementById('perda-unit-cost').value) || 0;
      document.getElementById('perda-total-cost').value = (qty * unitCost).toFixed(2);
    }

    // CRUD: Save Compra
    // CRUD: Save Compra (Peptídeos & Insumos)
    function saveCompra() {
      const cat = document.getElementById('compra-category').value;
      const giftCheck = document.getElementById('compra-is-gift');
      const isGift = Boolean(giftCheck && giftCheck.checked);
      const qty = parseInt(document.getElementById('compra-qty').value) || 0;
      let unitCost = parseFloat(document.getElementById('compra-unit-cost').value);
      if (isNaN(unitCost)) unitCost = 0;
      let totalCost = isGift ? 0 : (parseFloat(document.getElementById('compra-total-cost').value) || (qty * unitCost));
      const date = document.getElementById('compra-date').value || new Date().toISOString().split('T')[0];
      const supplier = document.getElementById('compra-supplier').value.trim() || (isGift ? 'SinoPept / Fábrica Chinesa' : 'Fornecedor Padrão');
      let notes = document.getElementById('compra-notes').value.trim();

      if (qty <= 0) {
        alert("Por favor, informe uma quantidade válida (maior que zero)!");
        return;
      }

      if (unitCost < 0) {
        alert("O custo unitário não pode ser negativo!");
        return;
      }

      // Se custo for 0 ou marcado como brinde, confirma condição de brinde gratuito
      const finalIsGift = isGift || (unitCost === 0);
      if (finalIsGift) {
        unitCost = 0;
        totalCost = 0;
        if (!notes) notes = '🎁 Brinde da chinesa (custo R$ 0,00)';
      }

      let compoundId = '';
      let code = '';
      let name = '';
      let dosage = '';

      if (cat === 'peptide') {
        compoundId = document.getElementById('compra-compound').value;
        code = document.getElementById('compra-dose').value;
        const comp = INITIAL_COMPOUNDS.find(c => c.id === compoundId);
        const dose = comp ? comp.doses.find(d => d.code === code) : null;
        name = comp ? comp.name : 'Peptídeo';
        dosage = dose ? dose.label : 'Dose';
      } else if (cat === 'other') {
        const otherDesc = document.getElementById('compra-other-desc').value.trim() || 'Despesa Operacional';
        compoundId = 'other';
        code = 'OUT-' + Date.now().toString().slice(-4);
        name = 'Outros Gastos';
        dosage = otherDesc;
      } else {
        // water, box, label, supplies
        const info = SUPPLY_PRESETS[cat];
        const sel = document.getElementById('compra-preset-select');
        const idx = parseInt(sel.value) || 0;
        const item = (info && info.items[idx]) ? info.items[idx] : { name: info.label, spec: info.label };

        let specText = item.name;
        const customInput = document.getElementById('compra-custom-spec');
        if (item.spec === 'Personalizado' && customInput && customInput.value.trim()) {
          specText = customInput.value.trim();
        }

        const codePrefixes = { water: 'AGUA', box: 'CAIXA', label: 'ETIQ', supplies: 'INS' };
        compoundId = cat;
        code = (codePrefixes[cat] || 'ITEM') + '-' + Date.now().toString().slice(-4);
        name = info.label;
        dosage = specText;
      }

      const newCompra = {
        id: "CMP-" + String(compras.length + 1).padStart(3, '0'),
        date: date,
        category: cat,
        isGift: finalIsGift,
        compoundId: compoundId,
        code: code,
        name: name,
        dosage: dosage,
        qty: qty,
        unitCost: unitCost,
        totalCost: totalCost,
        supplier: supplier,
        notes: notes
      };

      compras.unshift(newCompra);
      localStorage.setItem('psl_compras', JSON.stringify(compras));

      closeModal('modal-compra');
      showToast(finalIsGift ? ("🎁 Brinde registrado com sucesso: " + name + " (" + qty + " un a R$ 0)") : ("Compra registrada: " + name + " (" + qty + " un)"));
      renderDRE();
      renderComprasTable();
      renderBalancoTable();
    }

    function deleteCompra(id) {
      if (!confirm("Tem certeza que deseja excluir esta compra?")) return;
      compras = compras.filter(c => c.id !== id);
      localStorage.setItem('psl_compras', JSON.stringify(compras));
      showToast("Compra excluída!");
      renderDRE();
      renderComprasTable();
      renderBalancoTable();
    }

    // CRUD: Save Venda
    function saveVenda() {
      const clientName = document.getElementById('venda-client').value.trim() || 'Cliente Particular';
      const clientPhone = document.getElementById('venda-phone').value.trim();
      const compId = document.getElementById('venda-compound').value;
      const doseCode = document.getElementById('venda-dose').value;
      const qty = parseInt(document.getElementById('venda-qty').value) || 0;
      const unitPrice = parseFloat(document.getElementById('venda-unit-price').value) || 0;
      const vialCost = parseFloat(document.getElementById('venda-compound-unit-cost').value) || 0;
      const paymentMethod = document.getElementById('venda-pagto').value;
      const channel = document.getElementById('venda-canal').value;
      const date = document.getElementById('venda-date').value || new Date().toISOString().split('T')[0];

      if (qty <= 0 || unitPrice <= 0) {
        alert("Por favor, preencha quantidade e preço válidos!");
        return;
      }

      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const dose = comp ? comp.doses.find(d => d.code === doseCode) : null;

      const totalSale = qty * unitPrice;
      const totalPeptideCost = qty * vialCost;

      let extrasCost = 0;
      const extrasList = [];

      // 1. Caixa Térmica / Isopor
      const boxCheck = document.getElementById('venda-cost-box-check');
      if (boxCheck && boxCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-box-val').value) || 0;
        extrasCost += val;
        extrasList.push('Caixa (R$ ' + val.toFixed(2) + ')');
      }

      // 2. Etiqueta / Rótulo
      const labelCheck = document.getElementById('venda-cost-label-check');
      if (labelCheck && labelCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-label-val').value) || 0;
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push('Etiqueta (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 3. Água Bacteriostática
      const waterCheck = document.getElementById('venda-cost-water-check');
      if (waterCheck && waterCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-water-val').value) || 0;
        const waterType = document.getElementById('venda-cost-water-type').value;
        const typeLabel = waterType === '3ml' ? 'Água BAC 3ml' : (waterType === '10ml' ? 'Água BAC 10ml' : 'Água BAC');
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push(typeLabel + ' (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 4. Kit Insumos Seringas + Swabs
      const suppliesCheck = document.getElementById('venda-cost-supplies-check');
      if (suppliesCheck && suppliesCheck.checked) {
        const unitVal = parseFloat(document.getElementById('venda-cost-supplies-val').value) || 0;
        const totalVal = unitVal * qty;
        extrasCost += totalVal;
        extrasList.push('Seringas/Swabs (' + qty + 'x R$ ' + unitVal.toFixed(2) + ')');
      }

      // 5. Frete
      const shippingCheck = document.getElementById('venda-cost-shipping-check');
      if (shippingCheck && shippingCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-shipping-val').value) || 0;
        extrasCost += val;
        extrasList.push('Frete (R$ ' + val.toFixed(2) + ')');
      }

      // 6. Taxa Gateway / Cartão
      const gatewayCheck = document.getElementById('venda-cost-gateway-check');
      if (gatewayCheck && gatewayCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-gateway-val').value) || 0;
        extrasCost += val;
        extrasList.push('Taxa Cartão (R$ ' + val.toFixed(2) + ')');
      }

      // 7. Outro Custo
      const otherCheck = document.getElementById('venda-cost-other-check');
      if (otherCheck && otherCheck.checked) {
        const val = parseFloat(document.getElementById('venda-cost-other-val').value) || 0;
        const desc = document.getElementById('venda-cost-other-desc').value.trim() || 'Outro Custo';
        extrasCost += val;
        extrasList.push(desc + ' (R$ ' + val.toFixed(2) + ')');
      }

      const totalCost = totalPeptideCost + extrasCost;
      const profit = totalSale - totalCost;
      const margin = totalSale > 0 ? ((profit / totalSale) * 100) : 0;
      const unitCost = Number((totalCost / (qty || 1)).toFixed(2));

      const newVenda = {
        id: "VND-" + String(vendas.length + 1).padStart(3, '0'),
        date: date,
        clientName: clientName,
        clientPhone: clientPhone,
        compoundId: compId,
        code: doseCode,
        name: comp ? comp.name : 'Peptídeo',
        dosage: dose ? dose.label : 'Dose',
        qty: qty,
        unitPrice: unitPrice,
        unitCost: unitCost,
        totalSale: totalSale,
        totalCost: totalCost,
        profit: profit,
        margin: Number(margin.toFixed(1)),
        paymentMethod: paymentMethod,
        channel: channel,
        status: "Pago",
        costsDetail: {
          vialCost: vialCost,
          totalPeptideCost: totalPeptideCost,
          extrasCost: extrasCost,
          items: extrasList
        }
      };

      vendas.unshift(newVenda);
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));

      closeModal('modal-venda');
      showToast("Venda de R$ " + totalSale.toFixed(2) + " registrada!");
      renderDRE();
      renderVendasTable();
      renderBalancoTable();
      renderStockTable();
    }

    function clearAllVendas() {
      if (!confirm("Deseja realmente ZERAR todo o histórico de vendas? Esta ação removerá todas as vendas cadastradas e recalculará o estoque físico.")) return;
      vendas = [];
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));
      initializeApp();
      showToast("Histórico de vendas zerado com sucesso!");
    }

    function deleteVenda(id) {
      if (!confirm("Tem certeza que deseja excluir esta venda?")) return;
      vendas = vendas.filter(v => v.id !== id);
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));
      showToast("Venda excluída!");
      renderDRE();
      renderVendasTable();
      renderBalancoTable();
    }

    // CRUD: Save Perda
    // CRUD: Save Perda (Peptídeos & Insumos)
    function savePerda() {
      const cat = document.getElementById('perda-category').value;
      const qty = parseInt(document.getElementById('perda-qty').value) || 0;
      const unitCost = parseFloat(document.getElementById('perda-unit-cost').value) || 0;
      const lossTotal = parseFloat(document.getElementById('perda-total-cost').value) || (qty * unitCost);
      const reason = document.getElementById('perda-reason').value;
      const date = document.getElementById('perda-date').value || new Date().toISOString().split('T')[0];
      const notes = document.getElementById('perda-notes').value.trim() || '';

      if (qty <= 0 || unitCost <= 0) {
        alert("Por favor, informe a quantidade e custo do item avariado!");
        return;
      }

      let compoundId = '';
      let code = '';
      let name = '';
      let dosage = '';

      if (cat === 'peptide') {
        compoundId = document.getElementById('perda-compound').value;
        code = document.getElementById('perda-dose').value;
        const comp = INITIAL_COMPOUNDS.find(c => c.id === compoundId);
        const dose = comp ? comp.doses.find(d => d.code === code) : null;
        name = comp ? comp.name : 'Peptídeo';
        dosage = dose ? dose.label : 'Dose';
      } else if (cat === 'other') {
        const otherDesc = document.getElementById('perda-other-desc').value.trim() || 'Despesa / Item Diverso';
        compoundId = 'other';
        code = 'PRD-OUT';
        name = 'Outro Item';
        dosage = otherDesc;
      } else {
        const info = SUPPLY_PRESETS[cat];
        const sel = document.getElementById('perda-preset-select');
        const idx = parseInt(sel.value) || 0;
        const item = (info && info.items[idx]) ? info.items[idx] : { name: info.label };
        compoundId = cat;
        code = 'PRD-' + cat.toUpperCase();
        name = info.label;
        dosage = item.name;
      }

      const newPerda = {
        id: "PRD-" + String(perdas.length + 1).padStart(3, '0'),
        date: date,
        category: cat,
        compoundId: compoundId,
        code: code,
        name: name,
        dosage: dosage,
        qty: qty,
        unitCost: unitCost,
        lossTotal: lossTotal,
        reason: reason,
        notes: notes
      };

      perdas.unshift(newPerda);
      localStorage.setItem('psl_perdas', JSON.stringify(perdas));

      closeModal('modal-perda');
      showToast("Perda de R$ " + lossTotal.toFixed(2) + " registrada no DRE.");
      renderDRE();
      renderPerdasTable();
      renderBalancoTable();
    }

    function deletePerda(id) {
      if (!confirm("Tem certeza que deseja excluir este registro de perda?")) return;
      perdas = perdas.filter(p => p.id !== id);
      localStorage.setItem('psl_perdas', JSON.stringify(perdas));
      showToast("Registro de perda excluído!");
      renderDRE();
      renderPerdasTable();
      renderBalancoTable();
    }

    // RENDER TABLES & DRE
    // RENDER TABLES & DRE
    function renderDRE() {
      let totalVendido = 0;
      let totalCMV = 0;
      let totalFrascosVendidos = 0;
      vendas.forEach(v => {
        totalVendido += v.totalSale;
        totalCMV += v.totalCost;
        totalFrascosVendidos += v.qty;
      });

      let totalPerdas = 0;
      let totalFrascosPerdidos = 0;
      perdas.forEach(p => {
        totalPerdas += p.lossTotal;
        totalFrascosPerdidos += p.qty;
      });

      let totalComprado = 0;
      let totalPeptideosComprados = 0;
      let totalFrascosComprados = 0;
      let totalInsumosComprados = 0;
      let totalOutrosComprados = 0;

      compras.forEach(c => {
        totalComprado += c.totalCost;
        const cat = c.category || 'peptide';
        if (cat === 'peptide') {
          totalPeptideosComprados += c.totalCost;
          totalFrascosComprados += c.qty;
        } else if (['water', 'box', 'label', 'supplies'].includes(cat)) {
          totalInsumosComprados += c.totalCost;
        } else {
          totalOutrosComprados += c.totalCost;
        }
      });

      // Lucro Líquido Real = Faturamento - CMV - Perdas
      const lucroReal = totalVendido - totalCMV - totalPerdas;
      const margemReal = totalVendido > 0 ? ((lucroReal / totalVendido) * 100) : 0;

      // Estoque Físico Restante de Peptídeos = Comprados - Vendidos - Perdidos
      const estoqueQtd = Math.max(0, totalFrascosComprados - totalFrascosVendidos - totalFrascosPerdidos);

      // Valor de Custo do Estoque Parado
      let estoqueCusto = 0;
      let estoqueVenda = 0;
      INITIAL_COMPOUNDS.forEach(comp => {
        comp.doses.forEach(dose => {
          const compComprados = compras.filter(c => c.code === dose.code).reduce((a, b) => a + b.qty, 0);
          const compVendidos = vendas.filter(v => v.code === dose.code).reduce((a, b) => a + b.qty, 0);
          const compPerdidos = perdas.filter(p => p.code === dose.code).reduce((a, b) => a + b.qty, 0);
          const saldo = Math.max(0, compComprados - compVendidos - compPerdidos);
          estoqueCusto += saldo * dose.powderCostPerVial;
          estoqueVenda += saldo * dose.suggestedPriceB2C;
        });
      });

      // Update Top KPIs
      document.getElementById('kpi-faturamento').innerText = 'R$ ' + totalVendido.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-faturamento-sub').innerText = totalFrascosVendidos + ' frascos entregues';

      document.getElementById('kpi-cmv').innerText = 'R$ ' + totalCMV.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      document.getElementById('kpi-perdas').innerText = 'R$ ' + totalPerdas.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-perdas-sub').innerText = totalFrascosPerdidos + ' itens avariados/descartados';

      const lucroEl = document.getElementById('kpi-lucro-real');
      lucroEl.innerText = (lucroReal >= 0 ? '+' : '') + 'R$ ' + lucroReal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      lucroEl.style.color = lucroReal >= 0 ? '#059669' : '#DC2626';

      document.getElementById('kpi-margem-real').innerText = 'Margem Líquida Real: ' + margemReal.toFixed(1) + '%';

      // Update Secondary KPIs
      document.getElementById('kpi-total-compras').innerText = 'R$ ' + totalComprado.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-compras-sub').innerText = totalFrascosComprados + ' frascos pó + insumos';

      document.getElementById('kpi-estoque-qtd').innerText = estoqueQtd + ' frascos pó';
      document.getElementById('kpi-estoque-custo').innerText = 'R$ ' + estoqueCusto.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-estoque-venda').innerText = 'R$ ' + estoqueVenda.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      // Render DRE Breakdown Table
      const dreTbody = document.getElementById('dre-table-body');
      const lucroPercent = totalVendido > 0 ? ((lucroReal / totalVendido) * 100).toFixed(1) : '0.0';
      const cmvPercent = totalVendido > 0 ? ((totalCMV / totalVendido) * 100).toFixed(1) : '0.0';
      const perdasPercent = totalVendido > 0 ? ((totalPerdas / totalVendido) * 100).toFixed(1) : '0.0';
      const saldoFluxoCaixa = totalVendido - totalComprado - totalPerdas;

      dreTbody.innerHTML = \`
        <tr style="background: #F8FAFC; font-weight: 800;">
          <td>(+) Receita Bruta de Vendas</td>
          <td>Total cobrado dos clientes por todos os pedidos pagos</td>
          <td style="color: #059669; font-size: 15px;">R$ \${totalVendido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>100.0%</td>
        </tr>
        <tr>
          <td>(-) CMV (Custo dos Peptídeos + Insumos Vendidos)</td>
          <td>Custo do pó liofilizado + água + embalagem + kits dos itens entregues</td>
          <td style="color: #64748B;">- R$ \${totalCMV.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>-\${cmvPercent}%</td>
        </tr>
        <tr style="background: #FEF2F2;">
          <td style="color: #DC2626;">(-) Perdas / Quebras / Avarias</td>
          <td>Frascos quebrados, água avariada, caixas danificadas ou descarte de validade</td>
          <td style="color: #DC2626; font-weight: 700;">- R$ \${totalPerdas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>-\${perdasPercent}%</td>
        </tr>
        <tr style="background: #F0FDF4; font-weight: 900; font-size: 15px;">
          <td style="color: #145C46;">(=) LUCRO LÍQUIDO REAL OPERACIONAL</td>
          <td>(Faturamento - CMV - Perdas Reais)</td>
          <td style="color: #059669; font-size: 18px;">R$ \${lucroReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td style="color: #059669;">\${lucroPercent}%</td>
        </tr>
        <tr style="background: #FFFBEB; font-weight: 700;">
          <td style="color: #92400E;">📦 Total Investido em Compras de Estoque & Insumos</td>
          <td>Peptídeos (R$ \${totalPeptideosComprados.toLocaleString('pt-BR', {minimumFractionDigits: 2})}) + Insumos/Caixas (R$ \${(totalInsumosComprados + totalOutrosComprados).toLocaleString('pt-BR', {minimumFractionDigits: 2})})</td>
          <td style="color: #92400E;">R$ \${totalComprado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>—</td>
        </tr>
        <tr>
          <td style="color: #475569;">💵 Saldo de Fluxo de Caixa Imediato</td>
          <td>(Vendas Recebidas - Compras Totais Pagas - Perdas)</td>
          <td style="font-weight: 800; font-size: 15px; color: \${saldoFluxoCaixa >= 0 ? '#059669' : '#DC2626'};">
            \${saldoFluxoCaixa >= 0 ? '+' : ''}R$ \${saldoFluxoCaixa.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </td>
          <td>—</td>
        </tr>
      \`;
    }

    function renderComprasTable() {
      const tbody = document.getElementById('compras-table-body');

      // Calculate summary metrics
      let totalComprasGeral = 0;
      let totalPepCost = 0;
      let totalPepQty = 0;
      let totalInsumosCost = 0;
      let totalOutrosCost = 0;

      let countAll = compras.length;
      let countPeptide = 0;
      let countWater = 0;
      let countBox = 0;
      let countLabel = 0;
      let countSupplies = 0;
      let countGift = 0;
      let countOther = 0;

      compras.forEach(c => {
        totalComprasGeral += c.totalCost;
        const cat = c.category || 'peptide';
        if (c.isGift || c.unitCost === 0) countGift++;

        if (cat === 'peptide') {
          countPeptide++;
          totalPepCost += c.totalCost;
          totalPepQty += c.qty;
        } else if (cat === 'water') {
          countWater++;
          totalInsumosCost += c.totalCost;
        } else if (cat === 'box') {
          countBox++;
          totalInsumosCost += c.totalCost;
        } else if (cat === 'label') {
          countLabel++;
          totalInsumosCost += c.totalCost;
        } else if (cat === 'supplies') {
          countSupplies++;
          totalInsumosCost += c.totalCost;
        } else {
          countOther++;
          totalOutrosCost += c.totalCost;
        }
      });

      // Update pill counters
      if (document.getElementById('count-all')) document.getElementById('count-all').innerText = countAll;
      if (document.getElementById('count-peptide')) document.getElementById('count-peptide').innerText = countPeptide;
      if (document.getElementById('count-water')) document.getElementById('count-water').innerText = countWater;
      if (document.getElementById('count-box')) document.getElementById('count-box').innerText = countBox;
      if (document.getElementById('count-label')) document.getElementById('count-label').innerText = countLabel;
      if (document.getElementById('count-supplies')) document.getElementById('count-supplies').innerText = countSupplies;
      if (document.getElementById('count-gift')) document.getElementById('count-gift').innerText = countGift;
      if (document.getElementById('count-other')) document.getElementById('count-other').innerText = countOther;

      // Update top metric cards in Compras tab
      if (document.getElementById('compras-metric-total')) {
        document.getElementById('compras-metric-total').innerText = 'R$ ' + totalComprasGeral.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('compras-metric-total-sub').innerText = compras.length + ' compras registradas';
        document.getElementById('compras-metric-pep').innerText = 'R$ ' + totalPepCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('compras-metric-pep-sub').innerText = totalPepQty + ' frascos de pó liofilizado';
        document.getElementById('compras-metric-insumos').innerText = 'R$ ' + totalInsumosCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('compras-metric-insumos-sub').innerText = (countWater + countBox + countLabel + countSupplies) + ' itens (água, caixas, rótulos, kits)';
        document.getElementById('compras-metric-outros').innerText = 'R$ ' + totalOutrosCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
        document.getElementById('compras-metric-outros-sub').innerText = countOther + ' lançamentos operacionais';
      }

      // Filter
      let filtered = compras;
      if (currentComprasFilter === 'gift') {
        filtered = compras.filter(c => Boolean(c.isGift || c.unitCost === 0));
      } else if (currentComprasFilter !== 'all') {
        filtered = compras.filter(c => (c.category || 'peptide') === currentComprasFilter);
      }

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma compra encontrada nesta categoria. Clique em "+ Nova Compra" para lançar.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(c => {
        const cat = c.category || 'peptide';
        const badge = getCategoryBadge(cat);
        const isGift = Boolean(c.isGift || c.unitCost === 0);
        const giftBadge = isGift ? '<span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 700; margin-left: 4px;">🎁 Brinde (R$ 0)</span>' : '';
        return \`
          <tr style="\${isGift ? 'background: #FFFDF5;' : ''}">
            <td><strong>\${c.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${c.date}</span></td>
            <td>
              <div style="margin-bottom: 4px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                \${badge}
                \${giftBadge}
              </div>
              <strong style="color: var(--dark); font-size: 13px;">\${c.name}</strong>
              <div style="font-size: 12px; color: var(--gray-600);">\${c.dosage}</div>
            </td>
            <td><strong>\${c.qty}</strong> un</td>
            <td>\${isGift ? '<span style="color: #059669; font-weight: 700;">R$ 0,00</span>' : 'R$ ' + c.unitCost.toFixed(2)}</td>
            <td style="font-weight: 800; color: \${isGift ? '#059669' : 'var(--primary)'};">
              \${isGift ? 'R$ 0,00 <span style="font-size: 11px; font-weight: 600; color: #059669;">(Grátis)</span>' : 'R$ ' + c.totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
            </td>
            <td>\${c.supplier}</td>
            <td style="font-size: 12px; color: var(--gray-600);">\${c.notes || '-'}</td>
            <td>
              <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deleteCompra('\${c.id}')">Excluir</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function renderVendasTable() {
      const tbody = document.getElementById('vendas-table-body');
      if (vendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma venda registrada ainda. Clique em "+ Lançar Nova Venda" para adicionar.</td></tr>';
        return;
      }
      tbody.innerHTML = vendas.map(v => {
        const hasExtras = v.costsDetail && v.costsDetail.items && v.costsDetail.items.length > 0;
        const detailsTooltip = hasExtras
          ? ('Pó: R$ ' + (v.costsDetail.vialCost || 0).toFixed(2) + ' + Insumos: ' + v.costsDetail.items.join(', '))
          : 'Custo direto';
        const extrasBadge = hasExtras
          ? '<br><span style="font-size: 10px; color: #0284C7; background: #E0F2FE; padding: 1px 6px; border-radius: 4px; display: inline-block; margin-top: 2px; cursor: help;" title="' + detailsTooltip + '">📦 +' + v.costsDetail.items.length + ' insumos</span>'
          : '';

        return \`
        <tr>
          <td><strong>\${v.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${v.date}</span></td>
          <td><strong>\${v.clientName}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${v.channel} · \${v.clientPhone || ''}</span></td>
          <td><strong>\${v.name}</strong><br><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${v.dosage}</span></td>
          <td><strong>\${v.qty}</strong></td>
          <td>R$ \${v.unitPrice.toFixed(2)}</td>
          <td>
            <span style="font-weight: 600; color: #475569;" title="\${detailsTooltip}">R$ \${v.unitCost.toFixed(2)}</span>
            \${extrasBadge}
          </td>
          <td><strong>R$ \${v.totalSale.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
          <td style="color: #059669; font-weight: 800;">+ R$ \${v.profit.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td><span class="badge" style="background: #DCFCE7; color: #166534;">\${v.margin}%</span></td>
          <td>\${v.paymentMethod}</td>
          <td>
            <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deleteVenda('\${v.id}')">Excluir</button>
          </td>
        </tr>
      \`;
      }).join('');
    }

    function renderPerdasTable() {
      const tbody = document.getElementById('perdas-table-body');
      if (perdas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma perda registrada. Estoque com 100% de aproveitamento!</td></tr>';
        return;
      }
      tbody.innerHTML = perdas.map(p => {
        const cat = p.category || 'peptide';
        const badge = getCategoryBadge(cat);
        return \`
          <tr>
            <td><strong>\${p.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${p.date}</span></td>
            <td>
              <div style="margin-bottom: 4px;">\${badge}</div>
              <strong style="color: var(--dark);">\${p.name}</strong><br><span style="font-size: 12px; color: var(--gray-600);">\${p.dosage}</span>
            </td>
            <td style="font-weight: 800; color: #DC2626;">\${p.qty} un</td>
            <td><span class="badge" style="background: #FEE2E2; color: #991B1B;">\${p.reason}</span></td>
            <td>R$ \${p.unitCost.toFixed(2)}</td>
            <td style="font-weight: 800; color: #DC2626;">- R$ \${p.lossTotal.toFixed(2)}</td>
            <td style="font-size: 12px; color: var(--gray-600);">\${p.notes || '-'}</td>
            <td>
              <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deletePerda('\${p.id}')">Excluir</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function renderBalancoTable() {
      const tbody = document.getElementById('balanco-table-body');
      const search = (document.getElementById('balanco-search').value || '').toLowerCase();

      let rowsHtml = '';
      INITIAL_COMPOUNDS.forEach(comp => {
        comp.doses.forEach(dose => {
          const fullName = (comp.name + " " + dose.label).toLowerCase();
          if (search && !fullName.includes(search)) return;

          const compComprados = compras.filter(c => c.code === dose.code).reduce((a, b) => a + b.qty, 0);
          const compVendidos = vendas.filter(v => v.code === dose.code).reduce((a, b) => a + b.qty, 0);
          const compPerdidos = perdas.filter(p => p.code === dose.code).reduce((a, b) => a + b.qty, 0);

          const totalGasto = compras.filter(c => c.code === dose.code).reduce((a, b) => a + b.totalCost, 0);
          const totalVendas = vendas.filter(v => v.code === dose.code).reduce((a, b) => a + b.totalSale, 0);
          const cmvVendas = vendas.filter(v => v.code === dose.code).reduce((a, b) => a + b.totalCost, 0);
          const prejPerdas = perdas.filter(p => p.code === dose.code).reduce((a, b) => a + b.lossTotal, 0);

          const lucroItem = totalVendas - cmvVendas - prejPerdas;
          const saldoEstoque = compComprados - compVendidos - compPerdidos;

          // Only render items with movement or prominent items
          if (compComprados > 0 || compVendidos > 0 || compPerdidos > 0 || ['RT60', 'CU50', 'TR50', 'BPC5'].includes(dose.code)) {
            rowsHtml += \`
              <tr>
                <td><strong>\${comp.name}</strong><br><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${dose.label}</span></td>
                <td>\${compComprados}</td>
                <td>\${compVendidos}</td>
                <td style="color: #DC2626;">\${compPerdidos}</td>
                <td><strong style="color: \${saldoEstoque > 0 ? '#059669' : '#DC2626'};">\${saldoEstoque} un</strong></td>
                <td>R$ \${totalGasto.toFixed(2)}</td>
                <td><strong>R$ \${totalVendas.toFixed(2)}</strong></td>
                <td style="color: var(--gray-400);">R$ \${cmvVendas.toFixed(2)}</td>
                <td style="color: #DC2626;">\${prejPerdas > 0 ? '- R$ ' + prejPerdas.toFixed(2) : '-'}</td>
                <td style="font-weight: 800; font-size: 14px; color: \${lucroItem >= 0 ? '#059669' : '#DC2626'};">
                  \${lucroItem >= 0 ? '+ ' : ''}R$ \${lucroItem.toFixed(2)}
                </td>
              </tr>
            \`;
          }
        });
      });

      if (!rowsHtml) {
        rowsHtml = '<tr><td colspan="10" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhum composto encontrado com movimentação.</td></tr>';
      }
      tbody.innerHTML = rowsHtml;

      // Populate Balanço de Insumos & Suprimentos
      const insumosBody = document.getElementById('balanco-insumos-body');
      if (insumosBody) {
        const cats = [
          { key: 'water', label: '💧 Água Bacteriostática', desc: 'Frascos ampolas com álcool benzílico 0.9%' },
          { key: 'box', label: '📦 Caixas Térmicas', desc: 'Embalagens EPS alta densidade e caixas de envio' },
          { key: 'label', label: '🏷️ Etiquetas e Rótulos', desc: 'Rótulos vinil fosco e lacres de segurança' },
          { key: 'supplies', label: '💉 Insumos Gerais', desc: 'Seringas BD 1ml, swabs álcool 70%, bolsas gelo gel' },
          { key: 'other', label: '📝 Outras Despesas', desc: 'Fretes internacionais DHL, taxas e suprimentos' }
        ];

        insumosBody.innerHTML = cats.map(c => {
          const items = compras.filter(item => (item.category || 'peptide') === c.key);
          const totalQtd = items.reduce((acc, it) => acc + it.qty, 0);
          const totalInvestido = items.reduce((acc, it) => acc + it.totalCost, 0);
          const avgCost = totalQtd > 0 ? (totalInvestido / totalQtd) : 0;
          const perdasCat = perdas.filter(p => (p.category || 'peptide') === c.key);
          const totalPerdasVal = perdasCat.reduce((acc, p) => acc + p.lossTotal, 0);
          const totalPerdasQtd = perdasCat.reduce((acc, p) => acc + p.qty, 0);
          const saldoLiquido = totalInvestido - totalPerdasVal;

          return \`
            <tr>
              <td><strong>\${c.label}</strong></td>
              <td style="font-size: 12px; color: var(--gray-600);">\${c.desc}</td>
              <td><strong>\${totalQtd}</strong> un (\${items.length} compras)</td>
              <td>\${totalQtd > 0 ? 'R$ ' + avgCost.toFixed(2) : '—'}</td>
              <td style="font-weight: 700; color: var(--dark);">R$ \${totalInvestido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
              <td style="color: \${totalPerdasVal > 0 ? '#DC2626' : 'var(--gray-400)'};">
                \${totalPerdasVal > 0 ? totalPerdasQtd + ' un (- R$ ' + totalPerdasVal.toFixed(2) + ')' : '0 un'}
              </td>
              <td style="font-weight: 800; color: var(--primary);">R$ \${saldoLiquido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            </tr>
          \`;
        }).join('');
      }
    }

    // Backup & Export JSON
    function exportDataBackup() {
      const backup = {
        exportedAt: new Date().toISOString(),
        compras: compras,
        vendas: vendas,
        perdas: perdas,
        customPrices: customPrices,
        stockData: stockData
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
      const a = document.createElement('a');
      a.setAttribute("href", dataStr);
      a.setAttribute("download", "PSL_Labs_Backup_Financeiro_" + new Date().toISOString().split('T')[0] + ".json");
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast("Backup financeiro exportado com sucesso!");
    }

    function resetToDemoData() {
      if (!confirm("Deseja resetar para os dados iniciais de estoque?")) return;
      localStorage.removeItem('psl_compras');
      localStorage.removeItem('psl_vendas');
      localStorage.removeItem('psl_perdas');
      localStorage.removeItem('psl_orders');
      window.location.reload();
    }

    // Stock Management Tab - Synchronized with Compras, Vendas and Perdas
    function renderStockTable() {
      const tbody = document.getElementById('stock-tbody');
      tbody.innerHTML = '';

      let totalInStockCompounds = 0;
      let totalPreOrderCompounds = 0;
      let totalPhysicalVials = 0;

      INITIAL_COMPOUNDS.forEach(comp => {
        const tr = document.createElement('tr');

        // Calculate real physical balance per dose for this compound
        let compPhysicalStock = 0;
        const doseDetails = comp.doses.map(dose => {
          const comprados = compras.filter(c => c.code === dose.code).reduce((a, b) => a + (Number(b.qty) || 0), 0);
          const vendidos = vendas.filter(v => v.code === dose.code).reduce((a, b) => a + (Number(b.qty) || 0), 0);
          const perdidos = perdas.filter(p => p.code === dose.code).reduce((a, b) => a + (Number(b.qty) || 0), 0);
          const saldo = Math.max(0, comprados - vendidos - perdidos);
          compPhysicalStock += saldo;
          return { code: dose.code, label: dose.label, comprados, vendidos, perdidos, saldo };
        });

        totalPhysicalVials += compPhysicalStock;

        // Determine status: manual override or automated based on physical stock
        const override = (stockData && stockData[comp.id]) ? (typeof stockData[comp.id] === 'string' ? stockData[comp.id] : stockData[comp.id].status) : null;
        let effectiveStatus = '';
        if (override && override !== 'auto') {
          effectiveStatus = override;
        } else {
          effectiveStatus = compPhysicalStock > 0 ? 'in_stock' : 'pre_order';
        }

        if (effectiveStatus === 'in_stock') totalInStockCompounds++;
        else totalPreOrderCompounds++;

        let badgeHtml = '';
        if (effectiveStatus === 'in_stock') {
          badgeHtml = '<span class="badge badge-in-stock">⚡ Pronta Entrega SP (' + compPhysicalStock + ' un)</span>';
        } else if (effectiveStatus === 'pre_order') {
          badgeHtml = '<span class="badge badge-pre-order">⏳ Sob Encomenda (3-5d)</span>';
        } else {
          badgeHtml = '<span class="badge badge-out-of-stock">❌ Esgotado</span>';
        }

        // Doses pill summary
        const dosePillsHtml = doseDetails.map(d => {
          const bg = d.saldo > 0 ? '#D1FAE5' : 'var(--gray-100)';
          const color = d.saldo > 0 ? '#065F46' : 'var(--gray-600)';
          const weight = d.saldo > 0 ? '800' : '600';
          return '<span class="badge" style="background: ' + bg + '; color: ' + color + '; font-weight: ' + weight + '; margin-right: 4px; margin-bottom: 2px;" title="Comprados: ' + d.comprados + ' | Vendidos: ' + d.vendidos + ' | Perdas: ' + d.perdidos + '">' + d.label + ': ' + d.saldo + ' un</span>';
        }).join(' ');

        tr.innerHTML = \`
          <td><strong>\${comp.name}</strong></td>
          <td><span style="font-size: 11px; color: var(--gray-400);">\${comp.line}</span></td>
          <td>\${dosePillsHtml}</td>
          <td id="stock-badge-\${comp.id}">\${badgeHtml}</td>
          <td><strong style="color: \${compPhysicalStock > 0 ? '#059669' : 'var(--gray-400)'};">\${compPhysicalStock} frascos</strong></td>
          <td>
            <select class="form-select" style="padding: 4px 8px; font-size: 11px;" onchange="updateCompoundStock('\${comp.id}', this.value)">
              <option value="auto" \${(!override || override === 'auto') ? 'selected' : ''}>🤖 Automático (\${compPhysicalStock > 0 ? 'Pronta Entrega' : 'Sob Encomenda'})</option>
              <option value="in_stock" \${override === 'in_stock' ? 'selected' : ''}>⚡ Forçar Pronta Entrega</option>
              <option value="pre_order" \${override === 'pre_order' ? 'selected' : ''}>⏳ Forçar Sob Encomenda</option>
              <option value="out_of_stock" \${override === 'out_of_stock' ? 'selected' : ''}>❌ Forçar Esgotado</option>
            </select>
          </td>
        \`;
        tbody.appendChild(tr);
      });

      // Update Stock Tab KPI Banner
      const kpiInStock = document.getElementById('kpi-stock-instock-count');
      const kpiPreOrder = document.getElementById('kpi-stock-preorder-count');
      const kpiTotalVials = document.getElementById('kpi-stock-total-vials');
      if (kpiInStock) kpiInStock.innerText = totalInStockCompounds;
      if (kpiPreOrder) kpiPreOrder.innerText = totalPreOrderCompounds;
      if (kpiTotalVials) kpiTotalVials.innerText = totalPhysicalVials;
    }

    function updateCompoundStock(compId, status) {
      if (!stockData) stockData = {};
      stockData[compId] = status;
      localStorage.setItem('psl_stock_data', JSON.stringify(stockData));
      renderStockTable();
      showToast("Estoque atualizado no catálogo!");
    }

    function filterStockTable() {
      const query = document.getElementById('stock-search').value.toLowerCase();
      const rows = document.querySelectorAll('#stock-tbody tr');
      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(query) ? '' : 'none';
      });
    }

    // Prices Management Tab (75% Margin)
    function renderPricesTable() {
      const tbody = document.getElementById('prices-tbody');
      tbody.innerHTML = '';

      INITIAL_COMPOUNDS.forEach(comp => {
        comp.doses.forEach(dose => {
          const currentPrice = (customPrices && customPrices[dose.code]) ? customPrices[dose.code] : dose.suggestedPriceB2C;
          const tr = document.createElement('tr');
          tr.innerHTML = \`
            <td><strong>\${comp.name}</strong></td>
            <td><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${dose.label}</span></td>
            <td>R$ \${dose.totalCostB2C.toFixed(2)}</td>
            <td>
              <input type="number" id="price-input-\${dose.code}" value="\${currentPrice}" style="width: 100px; padding: 4px 8px; border: 1px solid var(--gray-200); border-radius: 4px; font-weight: 700;">
            </td>
            <td>R$ \${dose.b2bBoxPrice.toFixed(2)}</td>
            <td><span class="badge badge-in-stock">\${dose.marginPercent}%</span></td>
            <td>
              <button class="btn-sm btn-primary" onclick="saveCustomPrice('\${dose.code}')">Salvar</button>
            </td>
          \`;
          tbody.appendChild(tr);
        });
      });
    }

    function saveCustomPrice(code) {
      const val = parseFloat(document.getElementById('price-input-' + code).value);
      if (val > 0) {
        customPrices[code] = val;
        localStorage.setItem('psl_custom_prices', JSON.stringify(customPrices));
        showToast("Preço do SKU " + code + " atualizado para R$ " + val.toFixed(2));
      }
    }

    function resetDefaultPrices() {
      if (!confirm("Restaurar os preços padrão calculados com 75% de margem?")) return;
      localStorage.removeItem('psl_custom_prices');
      customPrices = {};
      renderPricesTable();
      showToast("Preços restaurados para 75% de margem!");
    }

    // Orders Tab
    function renderOrdersTable() {
      const tbody = document.getElementById('orders-tbody');
      tbody.innerHTML = '';
      if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--gray-400); padding: 20px;">Nenhum pedido pendente no momento.</td></tr>';
        return;
      }
      orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td><strong>\${o.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${o.date}</span></td>
          <td><strong>\${o.client}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${o.phone}</span></td>
          <td>\${o.items}</td>
          <td><span class="badge" style="background: #E0F2FE; color: #0369A1;">\${o.delivery}</span></td>
          <td><strong>R$ \${o.total.toFixed(2)}</strong></td>
          <td><span class="badge badge-in-stock">\${o.status}</span></td>
          <td>
            <button class="btn-sm btn-success" onclick="notifyOrderWhatsApp('\${o.phone}', '\${o.id}', '\${o.client}')">WhatsApp</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function notifyOrderWhatsApp(phone, id, client) {
      const msg = encodeURI("Olá, " + client + "! Seu pedido " + id + " da PSL Labs foi processado e já está em preparação para envio imediato.");
      window.open("https://wa.me/" + phone + "?text=" + msg, "_blank");
    }

    function sendReorderReminder(client, product, phone) {
      const msg = encodeURI("Olá, " + client + "! Como estão seus resultados com o " + product + " da PSL Labs? Pelos nossos cálculos, seu frasco deve estar nos últimos dias. Gostaria de garantir o próximo para não interromper seu protocolo?");
      window.open("https://wa.me/" + phone + "?text=" + msg, "_blank");
    }

    function saveAdminSettings() {
      const wa = document.getElementById('cfg-wa').value.trim();
      const pix = document.getElementById('cfg-pix').value.trim();
      const newPin = document.getElementById('cfg-new-pin').value.trim();

      if (wa) localStorage.setItem('psl_seller_wa', wa.replace(/\D/g, ''));
      if (pix) localStorage.setItem('psl_pix_key', pix);
      if (newPin) {
        if (newPin.length < 4) {
          alert("O PIN deve ter no mínimo 4 dígitos.");
          return;
        }
        localStorage.setItem('psl_admin_pin', newPin);
        alert("Novo PIN salvo com sucesso!");
      }
      showToast("Configurações salvas!");
    }

    function initializeApp() {
      renderDRE();
      renderComprasTable();
      renderVendasTable();
      renderPerdasTable();
      renderBalancoTable();
      renderStockTable();
      renderPricesTable();
      renderOrdersTable();

      const wa = localStorage.getItem('psl_seller_wa') || '5511999999999';
      const pix = localStorage.getItem('psl_pix_key') || 'financeiro@psllabs.com.br';
      if (document.getElementById('cfg-wa')) document.getElementById('cfg-wa').value = wa;
      if (document.getElementById('cfg-pix')) document.getElementById('cfg-pix').value = pix;
    }

    // Auto-start auth check
    checkAuthOnLoad();
  </script>
</body>
</html>`;

fs.writeFileSync('web/admin.html', adminHtml, 'utf8');
fs.writeFileSync('admin.html', adminHtml, 'utf8');
fs.writeFileSync('admin/index.html', adminHtml, 'utf8');
fs.writeFileSync('web/admin/index.html', adminHtml, 'utf8');

console.log('✅ Admin Panel successfully upgraded with Compras, Vendas, Perdas, and Lucro Real DRE!');
