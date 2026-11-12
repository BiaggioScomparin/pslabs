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
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">🛒 Registro de Compras de Estoque (Entradas)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Cadastre cada pedido de caixas ou frascos feito ao fornecedor.</div>
              </div>
              <button class="btn-sm btn-primary" onclick="openModal('modal-compra')">+ Nova Compra</button>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID / Data</th>
                    <th>Peptídeo / Dose</th>
                    <th>Qtd (Frascos)</th>
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
              <button class="btn-sm btn-success" onclick="openModal('modal-venda')">+ Lançar Nova Venda</button>
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
        </div>

        <!-- ========================================================= -->
        <!-- TAB 6: CONTROLE DE ESTOQUE PRONTA ENTREGA (SP) -->
        <!-- ========================================================= -->
        <div id="tab-estoque" class="view-tab">
          <div class="panel">
            <div class="panel-header">
              <div>
                <div class="panel-title">📦 Controle de Estoque Pronta-Entrega (SP)</div>
                <div style="font-size: 12px; color: var(--gray-600);">Altere o status para atualizar instantaneamente o catálogo do cliente no site.</div>
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
        <div class="modal-title">🛒 Registrar Nova Compra de Estoque</div>
        <button class="btn-sm btn-outline" onclick="closeModal('modal-compra')">✕</button>
      </div>
      <div class="modal-body">
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

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Qtd de Frascos</label>
            <input type="number" id="compra-qty" class="form-input" value="10" min="1" oninput="recalcCompraTotal()">
          </div>
          <div class="form-group">
            <label class="form-label">Custo Unitário Pó (R$)</label>
            <input type="number" id="compra-unit-cost" class="form-input" step="0.10" value="0.00" oninput="recalcCompraTotal()">
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
            <label class="form-label">Fornecedor / Lote</label>
            <input type="text" id="compra-supplier" class="form-input" placeholder="Ex: SinoPept / Lote 2611">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Observações</label>
          <input type="text" id="compra-notes" class="form-input" placeholder="Ex: Frascos de 60mg com laudo HPLC">
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

        <!-- Preview Lucro Desta Venda -->
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #166534; margin-bottom: 4px;">
            <span>Valor Total da Venda: <strong id="venda-preview-total">R$ 0,00</strong></span>
            <span>Custo Total (CMV): <span id="venda-preview-custo">R$ 0,00</span></span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #059669;">
            <span>LUCRO LÍQUIDO DESTA VENDA:</span>
            <span id="venda-preview-lucro">R$ 0,00</span>
          </div>
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
        <div class="modal-title">⚠️ Registrar Perda ou Avaria de Produto</div>
        <button class="btn-sm btn-outline" onclick="closeModal('modal-perda')">✕</button>
      </div>
      <div class="modal-body">
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

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Qtd de Frascos Perdidos</label>
            <input type="number" id="perda-qty" class="form-input" value="1" min="1" oninput="recalcPerdaTotal()">
          </div>
          <div class="form-group">
            <label class="form-label">Custo Unitário (R$)</label>
            <input type="number" id="perda-unit-cost" class="form-input" step="0.10" value="0.00" oninput="recalcPerdaTotal()">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Motivo da Perda</label>
          <select id="perda-reason" class="form-select">
            <option value="Frasco quebrado no manuseio/transporte">Frasco quebrado no manuseio ou transporte</option>
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

    // Application State
    let activeTab = 'dre';
    let stockData = JSON.parse(localStorage.getItem('psl_stock_data') || 'null');
    let customPrices = JSON.parse(localStorage.getItem('psl_custom_prices') || '{}');
    let orders = JSON.parse(localStorage.getItem('psl_orders') || 'null');

    // Compras, Vendas and Perdas State
    let compras = JSON.parse(localStorage.getItem('psl_compras') || 'null');
    let vendas = JSON.parse(localStorage.getItem('psl_vendas') || 'null');
    let perdas = JSON.parse(localStorage.getItem('psl_perdas') || 'null');

    // Default Seed Data if Empty
    if (!compras || compras.length === 0) {
      compras = [
        {
          id: "CMP-001",
          date: "2026-11-01",
          compoundId: "retatrutide",
          code: "RT60",
          name: "Retatrutide",
          dosage: "60mg",
          qty: 20,
          unitCost: 145.10,
          totalCost: 2902.00,
          supplier: "SinoPept Direct",
          notes: "Lote HPLC >99.4%"
        },
        {
          id: "CMP-002",
          date: "2026-11-02",
          compoundId: "ghk-cu",
          code: "CU50",
          name: "GHK-Cu",
          dosage: "50mg",
          qty: 20,
          unitCost: 25.40,
          totalCost: 508.00,
          supplier: "PureCopper Labs",
          notes: "Cristais azuis alta pureza"
        },
        {
          id: "CMP-003",
          date: "2026-11-03",
          compoundId: "tirzepatide",
          code: "TR50",
          name: "Tirzepatide",
          dosage: "50mg",
          qty: 15,
          unitCost: 108.60,
          totalCost: 1629.00,
          supplier: "Direct Labs Pharma",
          notes: "Duplo agonista GLP-1/GIP"
        },
        {
          id: "CMP-004",
          date: "2026-11-04",
          compoundId: "bpc157",
          code: "BPC5",
          name: "BPC-157",
          dosage: "5mg",
          qty: 20,
          unitCost: 37.70,
          totalCost: 754.00,
          supplier: "SinoPept Direct",
          notes: "Grau laboratorial"
        }
      ];
      localStorage.setItem('psl_compras', JSON.stringify(compras));
    }

    if (!vendas || vendas.length === 0) {
      vendas = [
        {
          id: "VND-001",
          date: "2026-11-05",
          clientName: "Rodrigo Silveira",
          clientPhone: "11988776655",
          compoundId: "retatrutide",
          code: "RT60",
          name: "Retatrutide",
          dosage: "60mg",
          qty: 2,
          unitPrice: 450.00,
          unitCost: 186.10,
          totalSale: 900.00,
          totalCost: 372.20,
          profit: 527.80,
          margin: 58.6,
          paymentMethod: "Pix",
          channel: "WhatsApp",
          status: "Pago"
        },
        {
          id: "VND-002",
          date: "2026-11-06",
          clientName: "Dra. Vanessa Lima",
          clientPhone: "11977665544",
          compoundId: "ghk-cu",
          code: "CU50",
          name: "GHK-Cu",
          dosage: "50mg",
          qty: 3,
          unitPrice: 250.00,
          unitCost: 66.40,
          totalSale: 750.00,
          totalCost: 199.20,
          profit: 550.80,
          margin: 73.4,
          paymentMethod: "Pix",
          channel: "WhatsApp",
          status: "Pago"
        },
        {
          id: "VND-003",
          date: "2026-11-08",
          clientName: "Carlos Eduardo Santos",
          clientPhone: "11999887711",
          compoundId: "tirzepatide",
          code: "TR50",
          name: "Tirzepatide",
          dosage: "50mg",
          qty: 2,
          unitPrice: 450.00,
          unitCost: 149.60,
          totalSale: 900.00,
          totalCost: 299.20,
          profit: 600.80,
          margin: 66.8,
          paymentMethod: "Pix",
          channel: "Loja Online",
          status: "Pago"
        },
        {
          id: "VND-004",
          date: "2026-11-09",
          clientName: "Lucas Zanin",
          clientPhone: "11988223344",
          compoundId: "bpc157",
          code: "BPC5",
          name: "BPC-157",
          dosage: "5mg",
          qty: 2,
          unitPrice: 319.00,
          unitCost: 78.70,
          totalSale: 638.00,
          totalCost: 157.40,
          profit: 480.60,
          margin: 75.3,
          paymentMethod: "Cartão de Crédito",
          channel: "Loja Online",
          status: "Pago"
        }
      ];
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));
    }

    if (!perdas || perdas.length === 0) {
      perdas = [
        {
          id: "PRD-001",
          date: "2026-11-08",
          compoundId: "retatrutide",
          code: "RT60",
          name: "Retatrutide",
          dosage: "60mg",
          qty: 1,
          unitCost: 145.10,
          lossTotal: 145.10,
          reason: "Frasco quebrado no manuseio/transporte",
          notes: "Caiu durante preparação da embalagem de envio"
        }
      ];
      localStorage.setItem('psl_perdas', JSON.stringify(perdas));
    }

    // Default orders demo if empty
    if (!orders) {
      orders = [
        {
          id: "PED-1082",
          date: "Hoje, 14:20",
          client: "Carlos Eduardo",
          phone: "5511999887711",
          items: "Tirzepatide 50mg (1 un)",
          delivery: "Uber Flash SP (2h)",
          total: 450.00,
          status: "Aguardando Motoboy"
        },
        {
          id: "PED-1081",
          date: "Ontem, 18:45",
          client: "Dra. Patricia Lima",
          phone: "5511988776655",
          items: "GHK-Cu 50mg (2 un)",
          delivery: "Sedex Térmico BR",
          total: 500.00,
          status: "Enviado / Rastreio"
        }
      ];
      localStorage.setItem('psl_orders', JSON.stringify(orders));
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
        onCompraCompoundChange();
      } else if (modalId === 'modal-venda') {
        document.getElementById('venda-date').value = today;
        populateCompoundSelect('venda-compound', 'venda-dose');
        onVendaCompoundChange();
      } else if (modalId === 'modal-perda') {
        document.getElementById('perda-date').value = today;
        populateCompoundSelect('perda-compound', 'perda-dose');
        onPerdaCompoundChange();
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

    function recalcCompraTotal() {
      const qty = parseFloat(document.getElementById('compra-qty').value) || 0;
      const unit = parseFloat(document.getElementById('compra-unit-cost').value) || 0;
      document.getElementById('compra-total-cost').value = (qty * unit).toFixed(2);
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
          // Preço sugerido do catálogo a 75%
          document.getElementById('venda-unit-price').value = dose.suggestedPriceB2C.toFixed(2);
          recalcVendaTotals();
        }
      }
    }

    function recalcVendaTotals() {
      const compId = document.getElementById('venda-compound').value;
      const doseCode = document.getElementById('venda-dose').value;
      const qty = parseFloat(document.getElementById('venda-qty').value) || 0;
      const unitPrice = parseFloat(document.getElementById('venda-unit-price').value) || 0;

      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      let unitCost = 0;
      if (comp) {
        const dose = comp.doses.find(d => d.code === doseCode);
        if (dose) unitCost = dose.totalCostB2C;
      }

      const totalSale = qty * unitPrice;
      const totalCost = qty * unitCost;
      const profit = totalSale - totalCost;

      document.getElementById('venda-preview-total').innerText = 'R$ ' + totalSale.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('venda-preview-custo').innerText = 'R$ ' + totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('venda-preview-lucro').innerText = 'R$ ' + profit.toLocaleString('pt-BR', {minimumFractionDigits: 2});
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
    function saveCompra() {
      const compId = document.getElementById('compra-compound').value;
      const doseCode = document.getElementById('compra-dose').value;
      const qty = parseInt(document.getElementById('compra-qty').value) || 0;
      const unitCost = parseFloat(document.getElementById('compra-unit-cost').value) || 0;
      const totalCost = parseFloat(document.getElementById('compra-total-cost').value) || 0;
      const date = document.getElementById('compra-date').value || new Date().toISOString().split('T')[0];
      const supplier = document.getElementById('compra-supplier').value.trim() || 'Fornecedor Padrão';
      const notes = document.getElementById('compra-notes').value.trim() || '';

      if (qty <= 0 || unitCost <= 0) {
        alert("Por favor, preencha quantidade e custo válidos!");
        return;
      }

      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const dose = comp ? comp.doses.find(d => d.code === doseCode) : null;

      const newCompra = {
        id: "CMP-" + String(compras.length + 1).padStart(3, '0'),
        date: date,
        compoundId: compId,
        code: doseCode,
        name: comp ? comp.name : 'Peptídeo',
        dosage: dose ? dose.label : 'Dose',
        qty: qty,
        unitCost: unitCost,
        totalCost: totalCost,
        supplier: supplier,
        notes: notes
      };

      compras.unshift(newCompra);
      localStorage.setItem('psl_compras', JSON.stringify(compras));

      closeModal('modal-compra');
      showToast("Compra de " + qty + " un registrada com sucesso!");
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
      const clientName = document.getElementById('venda-client').value.trim() || 'Cliente';
      const clientPhone = document.getElementById('venda-phone').value.trim() || '';
      const compId = document.getElementById('venda-compound').value;
      const doseCode = document.getElementById('venda-dose').value;
      const qty = parseInt(document.getElementById('venda-qty').value) || 0;
      const unitPrice = parseFloat(document.getElementById('venda-unit-price').value) || 0;
      const paymentMethod = document.getElementById('venda-pagto').value;
      const channel = document.getElementById('venda-canal').value;
      const date = document.getElementById('venda-date').value || new Date().toISOString().split('T')[0];

      if (qty <= 0 || unitPrice <= 0) {
        alert("Por favor, preencha quantidade e preço válidos!");
        return;
      }

      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const dose = comp ? comp.doses.find(d => d.code === doseCode) : null;
      const unitCost = dose ? dose.totalCostB2C : 0;

      const totalSale = qty * unitPrice;
      const totalCost = qty * unitCost;
      const profit = totalSale - totalCost;
      const margin = totalSale > 0 ? ((profit / totalSale) * 100) : 0;

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
        status: "Pago"
      };

      vendas.unshift(newVenda);
      localStorage.setItem('psl_vendas', JSON.stringify(vendas));

      closeModal('modal-venda');
      showToast("Venda de R$ " + totalSale.toFixed(2) + " registrada!");
      renderDRE();
      renderVendasTable();
      renderBalancoTable();
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
    function savePerda() {
      const compId = document.getElementById('perda-compound').value;
      const doseCode = document.getElementById('perda-dose').value;
      const qty = parseInt(document.getElementById('perda-qty').value) || 0;
      const unitCost = parseFloat(document.getElementById('perda-unit-cost').value) || 0;
      const lossTotal = parseFloat(document.getElementById('perda-total-cost').value) || 0;
      const reason = document.getElementById('perda-reason').value;
      const date = document.getElementById('perda-date').value || new Date().toISOString().split('T')[0];
      const notes = document.getElementById('perda-notes').value.trim() || '';

      if (qty <= 0 || unitCost <= 0) {
        alert("Por favor, informe a quantidade e custo do frasco perdido!");
        return;
      }

      const comp = INITIAL_COMPOUNDS.find(c => c.id === compId);
      const dose = comp ? comp.doses.find(d => d.code === doseCode) : null;

      const newPerda = {
        id: "PRD-" + String(perdas.length + 1).padStart(3, '0'),
        date: date,
        compoundId: compId,
        code: doseCode,
        name: comp ? comp.name : 'Peptídeo',
        dosage: dose ? dose.label : 'Dose',
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
      let totalFrascosComprados = 0;
      compras.forEach(c => {
        totalComprado += c.totalCost;
        totalFrascosComprados += c.qty;
      });

      // Lucro Líquido Real = Faturamento - CMV - Perdas
      const lucroReal = totalVendido - totalCMV - totalPerdas;
      const margemReal = totalVendido > 0 ? ((lucroReal / totalVendido) * 100) : 0;

      // Estoque Físico Restante = Comprados - Vendidos - Perdidos
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
      document.getElementById('kpi-faturamento-sub').innerText = totalFrascosVendidos + ' frascos vendidos';

      document.getElementById('kpi-cmv').innerText = 'R$ ' + totalCMV.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      document.getElementById('kpi-perdas').innerText = 'R$ ' + totalPerdas.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-perdas-sub').innerText = totalFrascosPerdidos + ' frascos descartados/quebrados';

      const lucroEl = document.getElementById('kpi-lucro-real');
      lucroEl.innerText = (lucroReal >= 0 ? '+' : '') + 'R$ ' + lucroReal.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      lucroEl.style.color = lucroReal >= 0 ? '#059669' : '#DC2626';

      document.getElementById('kpi-margem-real').innerText = 'Margem Líquida Real: ' + margemReal.toFixed(1) + '%';

      // Update Secondary KPIs
      document.getElementById('kpi-total-compras').innerText = 'R$ ' + totalComprado.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-compras-sub').innerText = totalFrascosComprados + ' frascos adquiridos';

      document.getElementById('kpi-estoque-qtd').innerText = estoqueQtd + ' unidades';
      document.getElementById('kpi-estoque-custo').innerText = 'R$ ' + estoqueCusto.toLocaleString('pt-BR', {minimumFractionDigits: 2});
      document.getElementById('kpi-estoque-venda').innerText = 'R$ ' + estoqueVenda.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      // Render DRE Breakdown Table
      const dreTbody = document.getElementById('dre-table-body');
      const lucroPercent = totalVendido > 0 ? ((lucroReal / totalVendido) * 100).toFixed(1) : '0.0';
      const cmvPercent = totalVendido > 0 ? ((totalCMV / totalVendido) * 100).toFixed(1) : '0.0';
      const perdasPercent = totalVendido > 0 ? ((totalPerdas / totalVendido) * 100).toFixed(1) : '0.0';

      dreTbody.innerHTML = \`
        <tr style="background: #F8FAFC; font-weight: 800;">
          <td>(+) Receita Bruta de Vendas</td>
          <td>Total cobrado dos clientes</td>
          <td style="color: #059669; font-size: 15px;">R$ \${totalVendido.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>100.0%</td>
        </tr>
        <tr>
          <td>(-) Custo das Mercadorias Vendidas (CMV)</td>
          <td>Custo do pó + insumos dos itens entregues</td>
          <td style="color: #64748B;">- R$ \${totalCMV.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>-\${cmvPercent}%</td>
        </tr>
        <tr style="background: #FEF2F2;">
          <td style="color: #DC2626;">(-) Perdas / Quebras / Avarias</td>
          <td>Frascos descartados ou danificados</td>
          <td style="color: #DC2626; font-weight: 700;">- R$ \${totalPerdas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>-\${perdasPercent}%</td>
        </tr>
        <tr style="background: #F0FDF4; font-weight: 900; font-size: 15px;">
          <td style="color: #145C46;">(=) LUCRO LÍQUIDO REAL OPERACIONAL</td>
          <td>(Vendas - CMV - Perdas)</td>
          <td style="color: #059669; font-size: 18px;">R$ \${lucroReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td style="color: #059669;">\${lucroPercent}%</td>
        </tr>
        <tr>
          <td style="color: #475569;">Saldo de Fluxo de Caixa (Vendas - Compras Totais - Perdas)</td>
          <td>Balanço de caixa imediato (inclui estoque parado)</td>
          <td style="font-weight: 700;">R$ \${(totalVendido - totalComprado - totalPerdas).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>—</td>
        </tr>
      \`;
    }

    function renderComprasTable() {
      const tbody = document.getElementById('compras-table-body');
      if (compras.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma compra registrada ainda. Clique em "+ Nova Compra" para lançar.</td></tr>';
        return;
      }
      tbody.innerHTML = compras.map(c => \`
        <tr>
          <td><strong>\${c.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${c.date}</span></td>
          <td><strong>\${c.name}</strong><br><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${c.dosage}</span></td>
          <td><strong>\${c.qty}</strong> un</td>
          <td>R$ \${c.unitCost.toFixed(2)}</td>
          <td style="font-weight: 800; color: var(--primary);">R$ \${c.totalCost.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td>\${c.supplier}</td>
          <td style="font-size: 12px; color: var(--gray-600);">\${c.notes || '-'}</td>
          <td>
            <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deleteCompra('\${c.id}')">Excluir</button>
          </td>
        </tr>
      \`).join('');
    }

    function renderVendasTable() {
      const tbody = document.getElementById('vendas-table-body');
      if (vendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma venda registrada ainda. Clique em "+ Lançar Nova Venda" para adicionar.</td></tr>';
        return;
      }
      tbody.innerHTML = vendas.map(v => \`
        <tr>
          <td><strong>\${v.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${v.date}</span></td>
          <td><strong>\${v.clientName}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${v.channel} · \${v.clientPhone || ''}</span></td>
          <td><strong>\${v.name}</strong><br><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${v.dosage}</span></td>
          <td><strong>\${v.qty}</strong></td>
          <td>R$ \${v.unitPrice.toFixed(2)}</td>
          <td style="color: var(--gray-400);">R$ \${v.unitCost.toFixed(2)}</td>
          <td><strong>R$ \${v.totalSale.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></td>
          <td style="color: #059669; font-weight: 800;">+ R$ \${v.profit.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
          <td><span class="badge" style="background: #DCFCE7; color: #166534;">\${v.margin}%</span></td>
          <td>\${v.paymentMethod}</td>
          <td>
            <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deleteVenda('\${v.id}')">Excluir</button>
          </td>
        </tr>
      \`).join('');
    }

    function renderPerdasTable() {
      const tbody = document.getElementById('perdas-table-body');
      if (perdas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--gray-400); padding: 30px;">Nenhuma perda registrada. Estoque com 100% de aproveitamento!</td></tr>';
        return;
      }
      tbody.innerHTML = perdas.map(p => \`
        <tr>
          <td><strong>\${p.id}</strong><br><span style="font-size: 11px; color: var(--gray-400);">\${p.date}</span></td>
          <td><strong>\${p.name}</strong><br><span class="badge" style="background: #E0E7FF; color: #3730A3;">\${p.dosage}</span></td>
          <td style="font-weight: 800; color: #DC2626;">\${p.qty} frasco(s)</td>
          <td><span class="badge" style="background: #FEE2E2; color: #991B1B;">\${p.reason}</span></td>
          <td>R$ \${p.unitCost.toFixed(2)}</td>
          <td style="font-weight: 800; color: #DC2626;">- R$ \${p.lossTotal.toFixed(2)}</td>
          <td style="font-size: 12px; color: var(--gray-600);">\${p.notes || '-'}</td>
          <td>
            <button class="btn-sm btn-outline" style="color: #EF4444;" onclick="deletePerda('\${p.id}')">Excluir</button>
          </td>
        </tr>
      \`).join('');
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
      if (!confirm("Deseja resetar para os dados iniciais de demonstração?")) return;
      localStorage.removeItem('psl_compras');
      localStorage.removeItem('psl_vendas');
      localStorage.removeItem('psl_perdas');
      window.location.reload();
    }

    // Stock Management Tab
    function renderStockTable() {
      const tbody = document.getElementById('stock-tbody');
      tbody.innerHTML = '';

      INITIAL_COMPOUNDS.forEach(comp => {
        const tr = document.createElement('tr');
        const st = (stockData && stockData[comp.id]) ? stockData[comp.id] : 'in_stock';
        
        let badgeHtml = '';
        if (st === 'in_stock') badgeHtml = '<span class="badge badge-in-stock">Pronta Entrega SP</span>';
        else if (st === 'pre_order') badgeHtml = '<span class="badge badge-pre-order">Sob Encomenda (3-5d)</span>';
        else badgeHtml = '<span class="badge badge-out-of-stock">Esgotado</span>';

        tr.innerHTML = \`
          <td><strong>\${comp.name}</strong></td>
          <td><span style="font-size: 11px; color: var(--gray-400);">\${comp.line}</span></td>
          <td>\${comp.doses.map(d => '<span class="badge" style="background: var(--gray-100); color: var(--gray-700); margin-right: 4px;">' + d.label + '</span>').join('')}</td>
          <td id="stock-badge-\${comp.id}">\${badgeHtml}</td>
          <td><strong>\${comp.doses[0].stockQty} frascos</strong></td>
          <td>
            <select class="form-select" style="padding: 4px 8px; font-size: 11px;" onchange="updateCompoundStock('\${comp.id}', this.value)">
              <option value="in_stock" \${st === 'in_stock' ? 'selected' : ''}>Pronta Entrega</option>
              <option value="pre_order" \${st === 'pre_order' ? 'selected' : ''}>Sob Encomenda</option>
              <option value="out_of_stock" \${st === 'out_of_stock' ? 'selected' : ''}>Esgotado</option>
            </select>
          </td>
        \`;
        tbody.appendChild(tr);
      });
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
