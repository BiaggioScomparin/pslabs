// Application State
let currentTier = 'b2c';
let currentCategory = 'TODOS';
let currentShipping = 'uber';
let selectedDoses = {}; // { compoundId: doseIndex }
let cart = {}; // { productCode: qty }
let sellerWhatsapp = localStorage.getItem('psl_seller_wa') || '5511999999999';

// Default Seed Data matching user's real business inventory
const defaultCompras = [
  { id: "CMP-001", date: "2026-11-10", category: "peptide", compoundId: "ghk-cu", code: "CU50", name: "GHK-Cu", dosage: "50mg", qty: 40, unitCost: 25.40, totalCost: 1016.00, supplier: "Fábrica Chinesa / SinoPept", notes: "Lote de 40 frascos registrado" }
];
const defaultVendas = []; // ZERO vendas iniciais
const defaultPerdas = [
  { id: "PRD-001", date: "2026-11-11", category: "peptide", compoundId: "ghk-cu", code: "CU50", name: "GHK-Cu", dosage: "50mg", qty: 10, unitCost: 25.40, lossTotal: 254.00, reason: "Fornecedor não enviou", notes: "Faltaram 10 frascos na remessa do fornecedor" },
  { id: "PRD-002", date: "2026-11-12", category: "peptide", compoundId: "ghk-cu", code: "CU50", name: "GHK-Cu", dosage: "50mg", qty: 1, unitCost: 25.40, lossTotal: 25.40, reason: "Uso próprio", notes: "Retirado 1 frasco para protocolo pessoal" }
];

// Load live physical data from localStorage
let rawCompras = localStorage.getItem('psl_compras');
let pslCompras = rawCompras ? JSON.parse(rawCompras) : defaultCompras;
let rawVendas = localStorage.getItem('psl_vendas');
let pslVendas = rawVendas ? JSON.parse(rawVendas) : defaultVendas;
let rawPerdas = localStorage.getItem('psl_perdas');
let pslPerdas = rawPerdas ? JSON.parse(rawPerdas) : defaultPerdas;

// Auto-purge old demo mock sales (VND-001..VND-004)
const demoVendasIds = ['VND-001', 'VND-002', 'VND-003', 'VND-004'];
if (pslVendas && pslVendas.some(v => demoVendasIds.includes(v.id))) {
  pslVendas = pslVendas.filter(v => !demoVendasIds.includes(v.id));
  localStorage.setItem('psl_vendas', JSON.stringify(pslVendas));
}

// Auto-purge old mock compras so ONLY real user purchases remain
const demoComprasIds = ['CMP-001', 'CMP-002', 'CMP-003', 'CMP-004', 'CMP-005', 'CMP-006', 'CMP-007', 'CMP-008', 'CMP-009', 'CMP-010'];
if (pslCompras && pslCompras.some(c => demoComprasIds.includes(c.id) && c.compoundId !== 'ghk-cu')) {
  pslCompras = pslCompras.filter(c => !(demoComprasIds.includes(c.id) && c.compoundId !== 'ghk-cu'));
  if (pslCompras.length === 0) pslCompras = defaultCompras;
  localStorage.setItem('psl_compras', JSON.stringify(pslCompras));
}

// Auto-purge old mock perdas (Retatrutide/Água quebradas do demo)
const demoPerdasIds = ['PRD-001', 'PRD-002'];
if (pslPerdas && pslPerdas.some(p => demoPerdasIds.includes(p.id) && (p.compoundId === 'retatrutide' || p.compoundId === 'water'))) {
  pslPerdas = pslPerdas.filter(p => !(demoPerdasIds.includes(p.id) && (p.compoundId === 'retatrutide' || p.compoundId === 'water')));
  if (pslPerdas.length === 0) pslPerdas = defaultPerdas;
  localStorage.setItem('psl_perdas', JSON.stringify(pslPerdas));
}

// Persist initial data if empty
if (!rawCompras) localStorage.setItem('psl_compras', JSON.stringify(pslCompras));
if (!rawVendas) localStorage.setItem('psl_vendas', JSON.stringify(pslVendas));
if (!rawPerdas) localStorage.setItem('psl_perdas', JSON.stringify(pslPerdas));

// Synchronize Custom Prices and Stock Overrides from Admin Panel
const customPrices = JSON.parse(localStorage.getItem('psl_custom_prices') || '{}');
const stockData = JSON.parse(localStorage.getItem('psl_stock_data') || '{}');

// Helper: Calculate live physical stock balance for any dose code
// saldo = Compras - Vendas - Perdas
function getDosePhysicalStock(code) {
  const bought = pslCompras.filter(c => c.code === code).reduce((acc, c) => acc + (Number(c.qty) || 0), 0);
  const sold = pslVendas.filter(v => v.code === code).reduce((acc, v) => acc + (Number(v.qty) || 0), 0);
  const lost = pslPerdas.filter(p => p.code === code).reduce((acc, p) => acc + (Number(p.qty) || 0), 0);
  return Math.max(0, bought - sold - lost);
}

// Initialize Compounds with Dynamic Stock Status
function updateAllCompoundsStock() {
  PSL_COMPOUNDS.forEach(comp => {
    let compoundTotalPhysicalStock = 0;
    let firstStockDoseIdx = -1;

    comp.doses.forEach((dose, idx) => {
      // Custom price overrides
      if (customPrices[dose.code + '_b2c']) {
        dose.suggestedPriceB2C = customPrices[dose.code + '_b2c'];
      }
      if (customPrices[dose.code + '_b2b']) {
        dose.b2bBoxPrice = customPrices[dose.code + '_b2b'];
      }

      // Physical inventory calculation: Compras - Vendas - Perdas
      dose.stockQty = getDosePhysicalStock(dose.code);
      dose.stockStatus = dose.stockQty > 0 ? 'in_stock' : 'pre_order';
      compoundTotalPhysicalStock += dose.stockQty;

      if (dose.stockQty > 0 && firstStockDoseIdx === -1) {
        firstStockDoseIdx = idx;
      }
    });

    // Compound-level stock status
    const manualStock = stockData[comp.id];
    const manualStatus = typeof manualStock === 'string' ? manualStock : (manualStock ? manualStock.status : null);

    if (manualStatus === 'out_of_stock') {
      comp.stockStatus = 'out_of_stock';
    } else if (manualStatus === 'pre_order') {
      comp.stockStatus = 'pre_order';
    } else if (manualStatus === 'in_stock') {
      comp.stockStatus = 'in_stock';
    } else {
      // STRICT RULE: ONLY compounds with recorded purchases and remaining stock > 0 are in_stock (Pronta Entrega SP); ALL others are pre_order (Sob Encomenda)!
      comp.stockStatus = compoundTotalPhysicalStock > 0 ? 'in_stock' : 'pre_order';
    }

    comp.totalPhysicalStock = compoundTotalPhysicalStock;

    // Auto-select the dose that has positive physical stock if available
    if (firstStockDoseIdx !== -1) {
      comp.defaultDoseIndex = firstStockDoseIdx;
      selectedDoses[comp.id] = firstStockDoseIdx;
    } else {
      selectedDoses[comp.id] = comp.defaultDoseIndex || 0;
    }
  });
}
updateAllCompoundsStock();

function promptWhatsappNumber() {
  const num = prompt("Digite o número do WhatsApp com DDD (apenas números, ex: 5511999999999):", sellerWhatsapp);
  if (num && num.trim()) {
    sellerWhatsapp = num.replace(/\D/g, '');
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
    if (cat === 'PRONTA_ENTREGA') {
      btn.classList.toggle('active', btn.textContent.includes('Pronta Entrega'));
    } else if (cat === 'TODOS') {
      btn.classList.toggle('active', btn.textContent.includes('Todos'));
    } else {
      btn.classList.toggle('active', btn.textContent.includes(cat));
    }
  });
  filterCompounds();
}

function filterCompounds() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  const filtered = PSL_COMPOUNDS.filter(c => {
    let matchesCategory = false;
    if (currentCategory === 'TODOS') {
      matchesCategory = true;
    } else if (currentCategory === 'PRONTA_ENTREGA') {
      matchesCategory = c.stockStatus === 'in_stock';
    } else {
      matchesCategory = c.line === currentCategory;
    }
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

  // Real physical stock status for the selected dose
  const isOutOfStock = compound.stockStatus === 'out_of_stock';
  const doseStock = dose.stockQty || 0;
  const isDoseInStock = doseStock > 0 && !isOutOfStock;

  const badgeWrap = card.querySelector('.stock-badge-container');
  if (badgeWrap) {
    if (isOutOfStock) {
      badgeWrap.innerHTML = '<span class="badge" style="background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;">❌ Esgotado</span>';
    } else if (isDoseInStock) {
      badgeWrap.innerHTML = '<span class="badge" style="background:#D1FAE5;color:#065F46;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#059669;"></span> ⚡ Pronta Entrega SP (' + doseStock + ' un)</span>';
    } else {
      badgeWrap.innerHTML = '<span class="badge" style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">⏳ Sob Encomenda (3-5d)</span>';
    }
  }

  const actionWrap = card.querySelector('.card-actions');
  if (actionWrap) {
    const btnAdd = actionWrap.querySelector('.btn-add');
    if (btnAdd) {
      if (isOutOfStock) {
        btnAdd.outerHTML = '<button class="btn-add" style="background:#94A3B8;cursor:not-allowed;" disabled><span>Esgotado</span></button>';
      } else if (isDoseInStock) {
        btnAdd.outerHTML = '<button class="btn-add" onclick="addCurrentCompoundToCart(\'' + compound.id + '\')" style="background: linear-gradient(135deg, #059669, #047857);"><span>Adicionar</span> +</button>';
      } else {
        btnAdd.outerHTML = '<button class="btn-add" onclick="addCurrentCompoundToCart(\'' + compound.id + '\')" style="background: linear-gradient(135deg, #D97706, #B45309);"><span>Encomendar</span> +</button>';
      }
    }
  }

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

    const topBadge = item.isTopSeller ? '<span class="badge-top">⭐ Top</span>' : '';
    const isOutOfStock = item.stockStatus === 'out_of_stock';
    const doseStock = currentDose.stockQty || 0;
    const isDoseInStock = doseStock > 0 && !isOutOfStock;

    let stockBadge = '';
    if (isOutOfStock) {
      stockBadge = '<span class="badge" style="background:#FEE2E2;color:#991B1B;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;">❌ Esgotado</span>';
    } else if (isDoseInStock) {
      stockBadge = '<span class="badge" style="background:#D1FAE5;color:#065F46;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#059669;"></span> ⚡ Pronta Entrega SP (' + doseStock + ' un)</span>';
    } else {
      stockBadge = '<span class="badge" style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:2px 8px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;">⏳ Sob Encomenda (3-5d)</span>';
    }

    let doseSelectorHtml = '';
    if (item.doses.length > 1) {
      if (item.doses.length <= 5) {
        let pillsHtml = item.doses.map((d, idx) => {
          const activeCls = idx === doseIdx ? ' active' : '';
          const dQty = d.stockQty || 0;
          const dotHtml = dQty > 0 ? '<span style="color:#059669;font-weight:900;font-size:11px;margin-left:2px;">●</span>' : '';
          return '<button class="dose-pill' + activeCls + '" onclick="onSelectDose(\'' + item.id + '\', ' + idx + ')" title="' + (dQty > 0 ? '⚡ Pronta Entrega SP (' + dQty + ' un)' : '⏳ Sob Encomenda (3-5d)') + '">' + d.label + dotHtml + '</button>';
        }).join('');
        doseSelectorHtml = `
          <div class="dose-selector-box">
            <div class="dose-header">
              <span>Dosagem (${isB2B ? 'Caixa c/ 10' : '1 Frasco'}):</span>
              <span style="color: var(--primary); font-weight: 800;">${item.doses.length} opções</span>
            </div>
            <div class="dose-pills-wrap">${pillsHtml}</div>
          </div>
        `;
      } else {
        let optionsHtml = item.doses.map((d, idx) => {
          const selected = idx === doseIdx ? ' selected' : '';
          const doseSub = isB2B ? "Caixa c/ 10 frascos" : "1 Frasco";
          const dQty = d.stockQty || 0;
          const statusNote = dQty > 0 ? ('⚡ Pronta Entrega (' + dQty + ' un)') : '⏳ Sob Encomenda (3-5d)';
          return '<option value="' + idx + '"' + selected + '>' + d.label + ' (' + doseSub + ') — ' + statusNote + '</option>';
        }).join('');
        doseSelectorHtml = `
          <div class="dose-selector-box">
            <div class="dose-header">
              <span>Dosagem (${isB2B ? 'Caixa c/ 10' : '1 Frasco'}):</span>
              <span style="color: var(--primary); font-weight: 800;">${item.doses.length} opções</span>
            </div>
            <select class="dose-select-dropdown" onchange="onSelectDose('${item.id}', this.value)">
              ${optionsHtml}
            </select>
          </div>
        `;
      }
    } else {
      const singleStock = item.doses[0].stockQty || 0;
      const singleStockBadge = singleStock > 0 ? ('<span style="color: #059669; font-weight: 800; font-size: 11px;">⚡ Pronta Entrega (' + singleStock + ' un)</span>') : '<span style="color: #D97706; font-weight: 700; font-size: 11px;">⏳ Sob Encomenda (3-5d)</span>';
      doseSelectorHtml = `
        <div class="dose-selector-box" style="padding: 6px 10px;">
          <div style="font-size: 11.5px; font-weight: 700; color: var(--gray-600); display: flex; justify-content: space-between; align-items: center;">
            <div>Dosagem: <span style="color: var(--primary); font-weight: 800;">${item.doses[0].label}</span> — <span style="color: var(--dark); font-weight: 600;">${isB2B ? "Caixa c/ 10" : "1 Frasco"}</span></div>
            <div>${singleStockBadge}</div>
          </div>
        </div>
      `;
    }

    const actionBtnHtml = isOutOfStock ? `
      <button class="btn-add" style="background:#94A3B8;cursor:not-allowed;" disabled>
        <span>Esgotado</span>
      </button>
    ` : (isDoseInStock ? `
      <button class="btn-add" onclick="addCurrentCompoundToCart('${item.id}')" style="background: linear-gradient(135deg, #059669, #047857);">
        <span>Adicionar</span> +
      </button>
    ` : `
      <button class="btn-add" onclick="addCurrentCompoundToCart('${item.id}')" style="background: linear-gradient(135deg, #D97706, #B45309);">
        <span>Encomendar</span> +
      </button>
    `);

    const card = document.createElement('div');
    card.className = 'product-card' + (item.isTopSeller ? ' top-featured' : '');
    card.id = 'card-' + item.id;
    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          <span class="line-tag">${item.line}</span>
          ${topBadge}
          <span class="stock-badge-container">${stockBadge}</span>
          <span class="purity-badge">&gt;99% HPLC</span>
        </div>
        <h3 class="product-title">${item.name}</h3>
        <p class="product-desc">${item.desc}</p>
        ${doseSelectorHtml}
      </div>

      <div>
        <div class="card-pricing">
          <div class="price-label">${priceLabel}</div>
          <div class="price-value">R$ ${price.toFixed(2).replace('.', ',')}</div>
          <div class="price-sub">${priceSub}</div>
        </div>

        <div class="card-actions">
          ${actionBtnHtml}
          <button class="btn-calc-shortcut" title="Calcular Diluição na Seringa" onclick="openCalcForCompound('${item.id}')">
            💉 Dose
          </button>
        </div>
      </div>
    `;
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

    const hasStock = (dose.stockQty || 0) > 0;
    const statusBadge = hasStock 
      ? '<span style="display:inline-block; font-size:10px; font-weight:800; background:#D1FAE5; color:#065F46; padding:2px 7px; border-radius:4px; margin-top:3px;">⚡ Pronta Entrega SP (' + dose.stockQty + ' un disp.)</span>'
      : '<span style="display:inline-block; font-size:10px; font-weight:800; background:#FEF3C7; color:#92400E; padding:2px 7px; border-radius:4px; margin-top:3px;">⏳ Sob Encomenda (Envio 3-5 dias)</span>';

    html += `
      <div class="cart-item">
        <div class="item-meta">
          <div class="item-name">${compound.name} (${dose.label})</div>
          <div class="item-sub">${isB2B ? 'Caixa fechada com 10 frascos' : '1 Frasco Liofilizado + Água'}</div>
          <div>${statusBadge}</div>
          <div class="item-price" style="margin-top: 4px;">R$ ${unitPrice.toFixed(2).replace('.', ',')}</div>
        </div>
        <div class="qty-controls">
          <button class="btn-qty" onclick="changeQty('${code}', -1)">-</button>
          <span style="font-weight: 700; font-size: 13.5px; width: 18px; text-align: center;">${qty}</span>
          <button class="btn-qty" onclick="changeQty('${code}', 1)">+</button>
        </div>
      </div>
    `;
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
  let hasPreOrderItems = false;
  let hasInStockItems = false;

  let msg = "*NOVO PEDIDO — PSL LABS (Premium Synthesis Line)*\n";
  msg += "*Modalidade:* " + (isB2B ? "Revendedor / Atacado (Caixa com 10 Frascos)" : "Consumidor Final (1 Frasco por item)") + "\n";
  msg += "-----------------------------------------\n";
  msg += "*ITENS SELECIONADOS:*\n";

  codes.forEach(code => {
    const itemInfo = findDoseByCode(code);
    if (!itemInfo) return;
    const { compound, dose } = itemInfo;
    const qty = cart[code];
    const unitPrice = isB2B ? dose.b2bBoxPrice : dose.suggestedPriceB2C;
    const sub = unitPrice * qty;
    total += sub;

    const inStock = (dose.stockQty || 0) > 0;
    if (inStock) hasInStockItems = true;
    else hasPreOrderItems = true;

    const stockTag = inStock ? "[⚡ Pronta Entrega SP]" : "[⏳ Sob Encomenda 3-5d]";
    msg += "• " + qty + "x " + compound.name + " " + dose.label + " (" + (isB2B ? "Caixa c/ 10 Frascos" : "1 Frasco") + ") " + stockTag + " = R$ " + sub.toFixed(2).replace('.', ',') + "\n";
  });

  msg += "-----------------------------------------\n";
  msg += "*TOTAL DO PEDIDO:* R$ " + total.toFixed(2).replace('.', ',') + "\n\n";

  if (hasPreOrderItems && hasInStockItems) {
    msg += "*DISPONIBILIDADE:* ⚠️ *Pedido Misto* (Contém itens Pronta Entrega SP e Sob Encomenda - Prazo 3 a 5 dias úteis)\n";
  } else if (hasPreOrderItems) {
    msg += "*DISPONIBILIDADE:* ⏳ *Sob Encomenda* (Prazo de preparação e envio: 3 a 5 dias úteis)\n";
  } else {
    msg += "*DISPONIBILIDADE:* ⚡ *Pronta Entrega SP* (Envio imediato hoje via Motoboy Express SP ou Sedex!)\n";
  }

  msg += "*FORMA DE ENTREGA:* " + (currentShipping === 'uber' ? "🛵 Uber Moto / Flash (São Paulo - até 2h para Pronta Entrega)" : "📦 Correios Sedex (Todo Brasil)") + "\n";
  msg += "*NOME:* " + clientName + "\n";
  msg += "*ENDEREÇO / CIDADE:* " + clientAddress + "\n\n";
  msg += "Gostaria de confirmar a disponibilidade e receber a chave Pix para pagamento!";

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

// Live Synchronization with VPS Database
async function syncFromDatabase() {
  try {
    const res = await fetch('/api/psl');
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.ok) {
      if (Array.isArray(data.compras)) {
        pslCompras = data.compras;
        localStorage.setItem('psl_compras', JSON.stringify(pslCompras));
      }
      if (Array.isArray(data.vendas)) {
        pslVendas = data.vendas;
        localStorage.setItem('psl_vendas', JSON.stringify(pslVendas));
      }
      if (Array.isArray(data.perdas)) {
        pslPerdas = data.perdas;
        localStorage.setItem('psl_perdas', JSON.stringify(pslPerdas));
      }
      if (data.stockOverrides) {
        Object.assign(stockData, data.stockOverrides);
        localStorage.setItem('psl_stock_data', JSON.stringify(stockData));
      }
      if (data.settings && data.settings.wa) {
        sellerWhatsapp = data.settings.wa;
        localStorage.setItem('psl_seller_wa', sellerWhatsapp);
      }
      updateAllCompoundsStock();
      filterCompounds();
    }
  } catch (e) {
    // Silently fallback to cached local data
  }
}
syncFromDatabase();
