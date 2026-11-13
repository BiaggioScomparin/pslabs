const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || "postgresql://postgres.your-tenant-id:dcad519bf34b193c9e81461b097fecf4@184.107.176.201:6543/postgres";
    pool = new Pool({
      connectionString,
      ssl: false,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    });
  }
  return pool;
}

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const p = getPool();

  try {
    if (req.method === 'GET') {
      const [comprasRes, vendasRes, perdasRes, stockRes, settingsRes] = await Promise.all([
        p.query("SELECT * FROM psl_compras ORDER BY date DESC, created_at DESC;"),
        p.query("SELECT * FROM psl_vendas ORDER BY date DESC, created_at DESC;"),
        p.query("SELECT * FROM psl_perdas ORDER BY date DESC, created_at DESC;"),
        p.query("SELECT * FROM psl_stock_overrides;"),
        p.query("SELECT * FROM psl_settings;")
      ]);

      const compras = comprasRes.rows.map(r => ({
        id: r.id,
        date: r.date ? new Date(r.date).toISOString().split('T')[0] : '',
        category: r.category,
        isGift: Boolean(r.is_gift),
        compoundId: r.compound_id,
        code: r.code,
        name: r.name,
        dosage: r.dosage,
        qty: Number(r.qty),
        unitCost: Number(r.unit_cost),
        totalCost: Number(r.total_cost),
        supplier: r.supplier || '',
        notes: r.notes || ''
      }));

      const vendas = vendasRes.rows.map(r => ({
        id: r.id,
        date: r.date ? new Date(r.date).toISOString().split('T')[0] : '',
        clientName: r.client_name,
        clientPhone: r.client_phone || '',
        compoundId: r.compound_id,
        code: r.code,
        name: r.name,
        dosage: r.dosage,
        qty: Number(r.qty),
        unitPrice: Number(r.unit_price),
        unitCost: Number(r.unit_cost),
        totalSale: Number(r.total_sale),
        totalCost: Number(r.total_cost),
        profit: Number(r.profit),
        margin: Number(r.margin),
        paymentMethod: r.payment_method,
        channel: r.channel,
        status: r.status,
        costsDetail: r.costs_detail
      }));

      const perdas = perdasRes.rows.map(r => ({
        id: r.id,
        date: r.date ? new Date(r.date).toISOString().split('T')[0] : '',
        category: r.category,
        compoundId: r.compound_id,
        code: r.code,
        name: r.name,
        dosage: r.dosage,
        qty: Number(r.qty),
        unitCost: Number(r.unit_cost),
        lossTotal: Number(r.loss_total),
        reason: r.reason,
        notes: r.notes || ''
      }));

      const stockOverrides = {};
      stockRes.rows.forEach(r => {
        stockOverrides[r.compound_id] = r.status;
      });

      const settings = {};
      settingsRes.rows.forEach(r => {
        settings[r.key] = r.value;
      });

      return res.status(200).json({
        ok: true,
        source: 'vps_postgres',
        compras,
        vendas,
        perdas,
        stockOverrides,
        settings
      });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { action, payload } = body || {};

      if (action === 'save_compra') {
        const c = payload;
        await p.query(`
          INSERT INTO psl_compras (id, date, category, is_gift, compound_id, code, name, dosage, qty, unit_cost, total_cost, supplier, notes, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
          ON CONFLICT (id) DO UPDATE SET
            date = EXCLUDED.date,
            category = EXCLUDED.category,
            is_gift = EXCLUDED.is_gift,
            compound_id = EXCLUDED.compound_id,
            code = EXCLUDED.code,
            name = EXCLUDED.name,
            dosage = EXCLUDED.dosage,
            qty = EXCLUDED.qty,
            unit_cost = EXCLUDED.unit_cost,
            total_cost = EXCLUDED.total_cost,
            supplier = EXCLUDED.supplier,
            notes = EXCLUDED.notes,
            updated_at = NOW();
        `, [c.id, c.date, c.category || 'peptide', Boolean(c.isGift), c.compoundId, c.code, c.name, c.dosage, c.qty, c.unitCost, c.totalCost, c.supplier || '', c.notes || '']);
        return res.status(200).json({ ok: true, id: c.id });
      }

      if (action === 'delete_compra') {
        const { id } = payload;
        await p.query("DELETE FROM psl_compras WHERE id = $1", [id]);
        return res.status(200).json({ ok: true, deleted: id });
      }

      if (action === 'save_venda') {
        const v = payload;
        await p.query(`
          INSERT INTO psl_vendas (id, date, client_name, client_phone, compound_id, code, name, dosage, qty, unit_price, unit_cost, total_sale, total_cost, profit, margin, payment_method, channel, status, costs_detail, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, NOW())
          ON CONFLICT (id) DO UPDATE SET
            date = EXCLUDED.date,
            client_name = EXCLUDED.client_name,
            client_phone = EXCLUDED.client_phone,
            compound_id = EXCLUDED.compound_id,
            code = EXCLUDED.code,
            name = EXCLUDED.name,
            dosage = EXCLUDED.dosage,
            qty = EXCLUDED.qty,
            unit_price = EXCLUDED.unit_price,
            unit_cost = EXCLUDED.unit_cost,
            total_sale = EXCLUDED.total_sale,
            total_cost = EXCLUDED.total_cost,
            profit = EXCLUDED.profit,
            margin = EXCLUDED.margin,
            payment_method = EXCLUDED.payment_method,
            channel = EXCLUDED.channel,
            status = EXCLUDED.status,
            costs_detail = EXCLUDED.costs_detail,
            updated_at = NOW();
        `, [v.id, v.date, v.clientName, v.clientPhone || '', v.compoundId, v.code, v.name, v.dosage, v.qty, v.unitPrice, v.unitCost, v.totalSale, v.totalCost, v.profit, v.margin, v.paymentMethod, v.channel, v.status || 'Pago', JSON.stringify(v.costsDetail || {})]);
        return res.status(200).json({ ok: true, id: v.id });
      }

      if (action === 'delete_venda') {
        const { id } = payload;
        await p.query("DELETE FROM psl_vendas WHERE id = $1", [id]);
        return res.status(200).json({ ok: true, deleted: id });
      }

      if (action === 'clear_vendas') {
        await p.query("DELETE FROM psl_vendas;");
        return res.status(200).json({ ok: true, cleared: true });
      }

      if (action === 'save_perda') {
        const pr = payload;
        await p.query(`
          INSERT INTO psl_perdas (id, date, category, compound_id, code, name, dosage, qty, unit_cost, loss_total, reason, notes, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
          ON CONFLICT (id) DO UPDATE SET
            date = EXCLUDED.date,
            category = EXCLUDED.category,
            compound_id = EXCLUDED.compound_id,
            code = EXCLUDED.code,
            name = EXCLUDED.name,
            dosage = EXCLUDED.dosage,
            qty = EXCLUDED.qty,
            unit_cost = EXCLUDED.unit_cost,
            loss_total = EXCLUDED.loss_total,
            reason = EXCLUDED.reason,
            notes = EXCLUDED.notes,
            updated_at = NOW();
        `, [pr.id, pr.date, pr.category || 'peptide', pr.compoundId, pr.code, pr.name, pr.dosage, pr.qty, pr.unitCost, pr.lossTotal, pr.reason, pr.notes || '']);
        return res.status(200).json({ ok: true, id: pr.id });
      }

      if (action === 'delete_perda') {
        const { id } = payload;
        await p.query("DELETE FROM psl_perdas WHERE id = $1", [id]);
        return res.status(200).json({ ok: true, deleted: id });
      }

      if (action === 'update_stock') {
        const { compoundId, status } = payload;
        await p.query(`
          INSERT INTO psl_stock_overrides (compound_id, status, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (compound_id) DO UPDATE SET
            status = EXCLUDED.status,
            updated_at = NOW();
        `, [compoundId, status]);
        return res.status(200).json({ ok: true, compoundId, status });
      }

      if (action === 'save_setting') {
        const { key, value } = payload;
        await p.query(`
          INSERT INTO psl_settings (key, value, updated_at)
          VALUES ($1, $2, NOW())
          ON CONFLICT (key) DO UPDATE SET
            value = EXCLUDED.value,
            updated_at = NOW();
        `, [key, JSON.stringify(value)]);
        return res.status(200).json({ ok: true, key });
      }

      return res.status(400).json({ error: "Unknown action" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message });
  }
};
