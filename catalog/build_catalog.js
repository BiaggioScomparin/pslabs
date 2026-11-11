const fs = require('fs');

const rawData = [
  // Page 1
  { name: "L-carnitine", spec: "600mg por frasco, caixa com 10 frascos", code: "LC600", boxCost: 470, cat: "Metabolismo & Queima" },
  { name: "L-carnitine", spec: "1200mg por frasco, caixa com 10 frascos", code: "LC1200", boxCost: 654, cat: "Metabolismo & Queima" },
  { name: "Lemon Bottle", spec: "10ml por frasco, caixa com 10 frascos", code: "LemonBottle", boxCost: 470, cat: "Gordura Localizada" },
  { name: "Lipo-c", spec: "10ml por frasco, caixa com 10 frascos", code: "Lipo-C", boxCost: 716, cat: "Metabolismo & Fígado" },
  { name: "MIC (Lipo C with B12)", spec: "10mg por frasco, caixa com 10 frascos", code: "MIC", boxCost: 654, cat: "Metabolismo & Energia" },
  { name: "BPC 157", spec: "5mg por frasco, caixa com 10 frascos", code: "BC5", boxCost: 377, cat: "Regeneração & Articulações" },
  { name: "BPC 157", spec: "10mg por frasco, caixa com 10 frascos", code: "BC10", boxCost: 470, cat: "Regeneração & Articulações" },
  { name: "BPC 157", spec: "20mg por frasco, caixa com 10 frascos", code: "BC20", boxCost: 654, cat: "Regeneração & Articulações" },
  { name: "TB500 全链", spec: "5mg por frasco, caixa com 10 frascos", code: "BT5", boxCost: 593, cat: "Regeneração Muscular" },
  { name: "TB500 全链", spec: "10mg por frasco, caixa com 10 frascos", code: "BT10", boxCost: 962, cat: "Regeneração Muscular" },
  { name: "GHK-Cu", spec: "50mg por frasco, caixa com 10 frascos", code: "CU50", boxCost: 254, cat: "Pele, Cabelo & Colágeno" },
  { name: "GHK-Cu", spec: "100mg por frasco, caixa com 10 frascos", code: "CU100", boxCost: 300, cat: "Pele, Cabelo & Colágeno" },
  { name: "AHK-CU", spec: "20mg por frasco, caixa com 10 frascos", code: "AU20", boxCost: 285, cat: "Crescimento Capilar" },
  { name: "AHK-CU", spec: "50mg por frasco, caixa com 10 frascos", code: "AU50", boxCost: 346, cat: "Crescimento Capilar" },
  { name: "AHK-CU", spec: "100mg por frasco, caixa com 10 frascos", code: "AU100", boxCost: 439, cat: "Crescimento Capilar" },
  { name: "Sermorelin", spec: "5mg por frasco, caixa com 10 frascos", code: "SMO5", boxCost: 624, cat: "Anti-Aging & GH" },
  { name: "Sermorelin", spec: "10mg por frasco, caixa com 10 frascos", code: "SMO10", boxCost: 1055, cat: "Anti-Aging & GH" },
  { name: "Tesamorelin", spec: "2mg por frasco, caixa com 10 frascos", code: "TSM2", boxCost: 408, cat: "Gordura Visceral & GH" },
  { name: "Tesamorelin", spec: "5mg por frasco, caixa com 10 frascos", code: "TSM5", boxCost: 808, cat: "Gordura Visceral & GH" },
  { name: "Tesamorelin", spec: "10mg por frasco, caixa com 10 frascos", code: "TSM10", boxCost: 1209, cat: "Gordura Visceral & GH" },
  { name: "Tesamorelin", spec: "20mg por frasco, caixa com 10 frascos", code: "TSM20", boxCost: 1602, cat: "Gordura Visceral & GH" },

  // Page 2
  { name: "IGF-1 LR3", spec: "100mcg por frasco, caixa com 10 frascos", code: "IG01", boxCost: 408, cat: "Hipertrofia Celular" },
  { name: "IGF-1 LR3", spec: "1mg por frasco, caixa com 10 frascos", code: "IG1-1", boxCost: 1313, cat: "Hipertrofia Celular" },
  { name: "Tirzepatide", spec: "5mg por frasco, caixa com 10 frascos", code: "TR5", boxCost: 331, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "10mg por frasco, caixa com 10 frascos", code: "TR10", boxCost: 408, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "15mg por frasco, caixa com 10 frascos", code: "TR15", boxCost: 500, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "20mg por frasco, caixa com 10 frascos", code: "TR20", boxCost: 608, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "30mg por frasco, caixa com 10 frascos", code: "TR30", boxCost: 808, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "40mg por frasco, caixa com 10 frascos", code: "TR40", boxCost: 901, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "50mg por frasco, caixa com 10 frascos", code: "TR50", boxCost: 1086, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "60mg por frasco, caixa com 10 frascos", code: "TR60", boxCost: 1286, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "80mg por frasco, caixa com 10 frascos", code: "TR80", boxCost: 1440, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Tirzepatide", spec: "100mg por frasco, caixa com 10 frascos", code: "TR100", boxCost: 1648, cat: "Emagrecimento & GLP-1/GIP" },
  { name: "Semaglutide", spec: "10mg por frasco, caixa com 10 frascos", code: "SM10", boxCost: 377, cat: "Emagrecimento & GLP-1" },
  { name: "Semaglutide", spec: "20mg por frasco, caixa com 10 frascos", code: "SM20", boxCost: 500, cat: "Emagrecimento & GLP-1" },
  { name: "Semaglutide", spec: "30mg por frasco, caixa com 10 frascos", code: "SM30", boxCost: 747, cat: "Emagrecimento & GLP-1" },
  { name: "Semaglutide", spec: "40mg por frasco, caixa com 10 frascos", code: "SM40", boxCost: 870, cat: "Emagrecimento & GLP-1" },
  { name: "Semaglutide", spec: "50mg por frasco, caixa com 10 frascos", code: "SM50", boxCost: 1147, cat: "Emagrecimento & GLP-1" },
  { name: "Retatrutide", spec: "5mg por frasco, caixa com 10 frascos", code: "RT5", boxCost: 346, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "10mg por frasco, caixa com 10 frascos", code: "RT10", boxCost: 470, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "15mg por frasco, caixa com 10 frascos", code: "RT15", boxCost: 716, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "20mg por frasco, caixa com 10 frascos", code: "RT20", boxCost: 808, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "30mg por frasco, caixa com 10 frascos", code: "RT30", boxCost: 1055, cat: "Emagrecimento Triplo Agonista" },

  // Page 3
  { name: "Retatrutide", spec: "40mg por frasco, caixa com 10 frascos", code: "RT40", boxCost: 1232, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "50mg por frasco, caixa com 10 frascos", code: "RT50", boxCost: 1255, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "60mg por frasco, caixa com 10 frascos", code: "RT60", boxCost: 1451, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "80mg por frasco, caixa com 10 frascos", code: "RT80", boxCost: 1532, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "100mg por frasco, caixa com 10 frascos", code: "RT100", boxCost: 2179, cat: "Emagrecimento Triplo Agonista" },
  { name: "Retatrutide", spec: "120mg por frasco, caixa com 10 frascos", code: "RT120", boxCost: 2872, cat: "Emagrecimento Triplo Agonista" },
  { name: "NAD+", spec: "100mg por frasco, caixa com 10 frascos", code: "NJ100", boxCost: 285, cat: "Longevidade & Mitocôndria" },
  { name: "NAD+", spec: "500mg por frasco, caixa com 10 frascos", code: "NJ500", boxCost: 346, cat: "Longevidade & Mitocôndria" },
  { name: "NAD+", spec: "1000mg por frasco, caixa com 10 frascos", code: "NJ1000", boxCost: 439, cat: "Longevidade & Mitocôndria" },
  { name: "GLOW70", spec: "70mg por frasco, caixa com 10 frascos", code: "GLOW", boxCost: 1178, cat: "Beleza & Rejuvenescimento" },
  { name: "Klow80", spec: "80mg por frasco, caixa com 10 frascos", code: "Klow", boxCost: 1286, cat: "Beleza & Rejuvenescimento" },
  { name: "DSIP", spec: "5mg por frasco, caixa com 10 frascos", code: "DS5", boxCost: 439, cat: "Sono Profundo & Regeneração" },
  { name: "DSIP", spec: "10mg por frasco, caixa com 10 frascos", code: "DS10", boxCost: 654, cat: "Sono Profundo & Regeneração" },
  { name: "Selank", spec: "5mg por frasco, caixa com 10 frascos", code: "SK5", boxCost: 362, cat: "Ansiedade & Humor" },
  { name: "Selank", spec: "10mg por frasco, caixa com 10 frascos", code: "SK10", boxCost: 500, cat: "Ansiedade & Humor" },
  { name: "Adamax", spec: "5mg por frasco, caixa com 10 frascos", code: "AX5", boxCost: 562, cat: "Super Nootrópico & Foco" },
  { name: "Adamax", spec: "10mg por frasco, caixa com 10 frascos", code: "AX10", boxCost: 932, cat: "Super Nootrópico & Foco" },
  { name: "Melanotan II", spec: "10mg por frasco, caixa com 10 frascos", code: "MT210", boxCost: 624, cat: "Bronzeamento & Libido" },
  { name: "MOTS-c", spec: "10mg por frasco, caixa com 10 frascos", code: "MS10", boxCost: 562, cat: "Metabolismo & Resistência" },
  { name: "MOTS-c", spec: "15mg por frasco, caixa com 10 frascos", code: "MS15", boxCost: 716, cat: "Metabolismo & Resistência" },
  { name: "MOTS-c", spec: "20mg por frasco, caixa com 10 frascos", code: "MS20", boxCost: 901, cat: "Metabolismo & Resistência" },
  { name: "MOTS-c", spec: "40mg por frasco, caixa com 10 frascos", code: "MS40", boxCost: 1259, cat: "Metabolismo & Resistência" },
  { name: "vitamin B12", spec: "10ml por frasco, caixa com 10 frascos", code: "B12", boxCost: 316, cat: "Energia & Hematopoiese" },

  // Page 4
  { name: "PT141", spec: "10mg por frasco, caixa com 10 frascos", code: "P41", boxCost: 624, cat: "Libido & Vitalidade Sexual" },
  { name: "KPV", spec: "2mg por frasco, caixa com 10 frascos", code: "KPV2", boxCost: 239, cat: "Anti-inflamatório Intestinal" },
  { name: "KPV", spec: "5mg por frasco, caixa com 10 frascos", code: "KPV5", boxCost: 300, cat: "Anti-inflamatório Intestinal" },
  { name: "KPV", spec: "10mg por frasco, caixa com 10 frascos", code: "KPV10", boxCost: 470, cat: "Anti-inflamatório Intestinal" },
  { name: "VIP", spec: "5mg por frasco, caixa com 10 frascos", code: "VP5", boxCost: 1209, cat: "Saúde Pulmonar & Imunomodulação" },
  { name: "VIP", spec: "10mg por frasco, caixa com 10 frascos", code: "VP10", boxCost: 1370, cat: "Saúde Pulmonar & Imunomodulação" },
  { name: "ARA290", spec: "10mg por frasco, caixa com 10 frascos", code: "RA10", boxCost: 624, cat: "Dor Neuropática & Reparo Nervoso" },
  { name: "ARA290", spec: "16mg por frasco, caixa com 10 frascos", code: "RA16", boxCost: 870, cat: "Dor Neuropática & Reparo Nervoso" },
  { name: "BPC 5mg+TB5mg", spec: "10mg por frasco, caixa com 10 frascos", code: "BB10", boxCost: 747, cat: "Combo Regeneração Completa" },
  { name: "BPC 10mg+TB10mg", spec: "20mg por frasco, caixa com 10 frascos", code: "BB20", boxCost: 1178, cat: "Combo Regeneração Completa" },
  { name: "BPC 15mg+TB15mg", spec: "30mg por frasco, caixa com 10 frascos", code: "BB30", boxCost: 1301, cat: "Combo Regeneração Completa" },
  { name: "BPC 20mg+TB20mg", spec: "40mg por frasco, caixa com 10 frascos", code: "BB40", boxCost: 1717, cat: "Combo Regeneração Completa" },
  { name: "Semax 10mg+Selank 10mg", spec: "20mg por frasco, caixa com 10 frascos", code: "XS20", boxCost: 1178, cat: "Combo Foco & Anti-Ansiedade" },
  { name: "CJC1295+Ipamorelin", spec: "10mg por frasco, caixa com 10 frascos", code: "CP10", boxCost: 870, cat: "Combo GH & Massa Magra" },
  { name: "CJC1295+Ipamorelin", spec: "20mg por frasco, caixa com 10 frascos", code: "CP20", boxCost: 1205, cat: "Combo GH & Massa Magra" },
  { name: "Retatrutide 30mg+Tirzepatide 30mg", spec: "60mg por frasco, caixa com 10 frascos", code: "RET60", boxCost: 1178, cat: "Combo Super Metabólico" },
  { name: "Tesamorelin 5mg+Ipamorelin 5mg", spec: "10mg por frasco, caixa com 10 frascos", code: "TI10", boxCost: 901, cat: "Combo Gordura Visceral & GH" },
  { name: "Tesamorelin 10mg+Ipamorelin 5mg", spec: "15mg por frasco, caixa com 10 frascos", code: "TI15", boxCost: 1259, cat: "Combo Gordura Visceral & GH" },
  { name: "Cagrilintide", spec: "5mg por frasco, caixa com 10 frascos", code: "CGL5", boxCost: 932, cat: "Amilina & Saciedade Intensa" },
  { name: "Cagrilintide", spec: "10mg por frasco, caixa com 10 frascos", code: "CGL10", boxCost: 1178, cat: "Amilina & Saciedade Intensa" },
  { name: "AOD9604", spec: "5mg por frasco, caixa com 10 frascos", code: "AD5", boxCost: 716, cat: "Lipólise Seletiva sem pico de GH" },
  { name: "AOD9604", spec: "10mg por frasco, caixa com 10 frascos", code: "AD10", boxCost: 1147, cat: "Lipólise Seletiva sem pico de GH" },
  { name: "5-AMINO-1MQ", spec: "5mg por frasco, caixa com 10 frascos", code: "5AM", boxCost: 316, cat: "Inibidor NNMT & Queima Celular" },

  // Page 5
  { name: "5-AMINO-1MQ", spec: "10mg por frasco, caixa com 10 frascos", code: "10AM", boxCost: 408, cat: "Inibidor NNMT & Queima Celular" },
  { name: "5-AMINO-1MQ", spec: "50mg por frasco, caixa com 10 frascos", code: "50AM", boxCost: 562, cat: "Inibidor NNMT & Queima Celular" },
  { name: "Epithalon", spec: "10mg por frasco, caixa com 10 frascos", code: "ET10", boxCost: 470, cat: "Telômeros & Longevidade" },
  { name: "Epithalon", spec: "50mg por frasco, caixa com 10 frascos", code: "ET50", boxCost: 1086, cat: "Telômeros & Longevidade" },
  { name: "FOXO4-DRI", spec: "2mg por frasco, caixa com 10 frascos", code: "F42", boxCost: 870, cat: "Senolítico (Eliminação de Células Zumbis)" },
  { name: "FOXO4-DRI", spec: "10mg por frasco, caixa com 10 frascos", code: "FOX10", boxCost: 3450, cat: "Senolítico (Eliminação de Células Zumbis)" },
  { name: "Snap-8", spec: "10mg por frasco, caixa com 10 frascos", code: "NP810", boxCost: 562, cat: "Anti-Rugas (Efeito Botox-like)" },
  { name: "SS-31", spec: "10mg por frasco, caixa com 10 frascos", code: "2S10", boxCost: 778, cat: "Rejuvenescimento Mitocondrial" },
  { name: "SS-31", spec: "20mg por frasco, caixa com 10 frascos", code: "2S20", boxCost: 1259, cat: "Rejuvenescimento Mitocondrial" },
  { name: "SS-31", spec: "50mg por frasco, caixa com 10 frascos", code: "2S50", boxCost: 1671, cat: "Rejuvenescimento Mitocondrial" },
  { name: "Semax", spec: "5mg por frasco, caixa com 10 frascos", code: "SX5", boxCost: 377, cat: "BDNF & Nootrópico" },
  { name: "Semax", spec: "10mg por frasco, caixa com 10 frascos", code: "SX10", boxCost: 485, cat: "BDNF & Nootrópico" },
  { name: "Oxytocin", spec: "2mg por frasco, caixa com 10 frascos", code: "OT2", boxCost: 254, cat: "Vínculo, Humor & Calma" },
  { name: "Oxytocin", spec: "5mg por frasco, caixa com 10 frascos", code: "OT5", boxCost: 377, cat: "Vínculo, Humor & Calma" },
  { name: "Oxytocin", spec: "10mg por frasco, caixa com 10 frascos", code: "OT10", boxCost: 439, cat: "Vínculo, Humor & Calma" },
  { name: "Ipamorelin", spec: "5mg por frasco, caixa com 10 frascos", code: "IP5", boxCost: 346, cat: "Liberação de GH Seletivo" },
  { name: "Ipamorelin", spec: "10mg por frasco, caixa com 10 frascos", code: "IP10", boxCost: 531, cat: "Liberação de GH Seletivo" },
  { name: "CJC1295 with DAC", spec: "5mg por frasco, caixa com 10 frascos", code: "CD5", boxCost: 1178, cat: "GH de Longa Ação" },
  { name: "CJC1295 with DAC", spec: "10mg por frasco, caixa com 10 frascos", code: "CD10", boxCost: 1555, cat: "GH de Longa Ação" },
  { name: "CJC1295 no DAC", spec: "5mg por frasco, caixa com 10 frascos", code: "CND5", boxCost: 593, cat: "GH Pulsátil" },
  { name: "CJC1295 no DAC", spec: "10mg por frasco, caixa com 10 frascos", code: "CND10", boxCost: 962, cat: "GH Pulsátil" },
  { name: "Kisspeptin-10", spec: "5mg por frasco, caixa com 10 frascos", code: "KS5", boxCost: 593, cat: "Eixo Hormonal & LH/FSH" },

  // Page 6
  { name: "Kisspeptin-10", spec: "10mg por frasco, caixa com 10 frascos", code: "KS10", boxCost: 962, cat: "Eixo Hormonal & LH/FSH" },
  { name: "Thymalin/Thymulin", spec: "10mg por frasco, caixa com 10 frascos", code: "TY10", boxCost: 593, cat: "Regeneração Tímica & Imunidade" },
  { name: "Thymosin alpha 1", spec: "5mg por frasco, caixa com 10 frascos", code: "TA5", boxCost: 808, cat: "Super Imunomodulador T" },
  { name: "Thymosin alpha 1", spec: "10mg por frasco, caixa com 10 frascos", code: "TA10", boxCost: 1232, cat: "Super Imunomodulador T" },
  { name: "Glutathione", spec: "600mg por frasco, caixa com 10 frascos", code: "GTT600", boxCost: 377, cat: "Master Antioxidante & Detox" },
  { name: "Glutathione", spec: "1500mg por frasco, caixa com 10 frascos", code: "GTT1500", boxCost: 562, cat: "Master Antioxidante & Detox" }
];

// USER RULES:
// Custos adicionais por frasco para B2C:
// 30 água bacteriostática + 5 frete + 2 embalagem + 1 etiqueta + 3 caixa = R$ 41,00
const ADDED_COST_B2C = 30 + 5 + 2 + 1 + 3; // R$ 41,00

// Regra de preço cliente final: no MINIMO o dobro do custo total (Custo Total * 2)
const rows = [
  [
    "Codigo",
    "Produto",
    "Especificacao",
    "Categoria",
    "Custo Po Frasco (R$)",
    "Insumos Extras B2C (Agua+Frete+Emb+Etq+Cx)",
    "CUSTO TOTAL UNITARIO B2C (R$)",
    "PRECO MINIMO O DOBRO (2x Custo)",
    "PRECO FINAL SUGERIDO B2C (R$)",
    "LUCRO LIQUIDO UNITARIO B2C (R$)",
    "MARGEM DE LUCRO B2C (%)",
    "ATACADO B2B CAIXA C/ 10 (R$)"
  ]
];

const structuredList = [];

rawData.forEach(item => {
  const powderCostPerVial = item.boxCost / 10;
  const totalCostB2C = powderCostPerVial + ADDED_COST_B2C;
  const minPriceB2C = totalCostB2C * 2;

  // Regra de Margem Líquida B2C de 75%:
  // Preço = CustoTotal / (1 - 0.75) = CustoTotal / 0.25 = CustoTotal * 4
  const target75Price = totalCostB2C / 0.25;
  let suggestedPriceB2C = Math.ceil(target75Price / 10) * 10 - 1;
  if (suggestedPriceB2C < target75Price) {
    suggestedPriceB2C += 10;
  }

  const profitUnitB2C = suggestedPriceB2C - totalCostB2C;
  const marginPercent = Math.round((profitUnitB2C / suggestedPriceB2C) * 100);

  // Atacado B2B para revendedores (caixa com 10 frascos liofilizados):
  // Custo base caixa + R$ 80 de frete/insumos da caixa, vendido com margem de atacado
  const b2bBoxCost = item.boxCost + 83;
  let b2bBoxPrice = Math.round((b2bBoxCost * 1.65) / 10) * 10;
  if (b2bBoxPrice < item.boxCost + 250) b2bBoxPrice = item.boxCost + 300;

  rows.push([
    item.code,
    `"${item.name}"`,
    `"${item.spec}"`,
    `"${item.cat}"`,
    powderCostPerVial.toFixed(2),
    ADDED_COST_B2C.toFixed(2),
    totalCostB2C.toFixed(2),
    minPriceB2C.toFixed(2),
    suggestedPriceB2C.toFixed(2),
    profitUnitB2C.toFixed(2),
    `${marginPercent}%`,
    b2bBoxPrice.toFixed(2)
  ]);

  structuredList.push({
    code: item.code,
    name: item.name,
    spec: item.spec,
    category: item.cat,
    powderCostPerVial: Number(powderCostPerVial.toFixed(2)),
    addedInsumosCost: ADDED_COST_B2C,
    totalCostB2C: Number(totalCostB2C.toFixed(2)),
    minPrice2x: Number(minPriceB2C.toFixed(2)),
    suggestedPriceB2C: Number(suggestedPriceB2C.toFixed(2)),
    profitUnitB2C: Number(profitUnitB2C.toFixed(2)),
    marginPercent: marginPercent,
    b2bBoxPrice: Number(b2bBoxPrice.toFixed(2))
  });
});

const csvContent = rows.map(r => r.join(";")).join("\n");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/catalog/tabela_completa_precos.csv", "\ufeff" + csvContent, "utf8");
fs.writeFileSync("C:/Users/biagg/.gemini/antigravity/scratch/psl-labs/catalog/psl_products.json", JSON.stringify(structuredList, null, 2), "utf8");

console.log(`Recalculated catalog for ${rawData.length} products with R$ 41 addition and minimum 2x markup.`);
