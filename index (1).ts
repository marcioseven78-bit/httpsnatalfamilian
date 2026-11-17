import express from "express";
import QRCode from "qrcode";
import { randomBytes } from "node:crypto";
import { db } from "../../db/index.js";
import { orders } from "../../db/schema.js";
import { PRODUCTS, BLACK_FRIDAY_DISCOUNT, salePrice } from "./catalog.js";
import { buildPixPayload, PIX_MERCHANT_NAME } from "./pix.js";

const app = express();
app.use(express.json({ limit: "50kb" }));

app.get("/api/products", (_req, res) => {
  res.json({
    discount: BLACK_FRIDAY_DISCOUNT,
    products: PRODUCTS.map((p) => ({ ...p, saleCents: salePrice(p.priceCents) })),
  });
});

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

app.post("/api/orders", async (req, res) => {
  const body = req.body ?? {};
  const customer = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 30),
    address: clean(body.address, 400),
  };
  if (!customer.name || !customer.phone || !customer.address || !/^\S+@\S+\.\S+$/.test(customer.email)) {
    return res.status(400).json({ error: "Preencha nome, e-mail, telefone e endereço corretamente." });
  }

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  const items = [];
  for (const it of rawItems) {
    const product = PRODUCTS.find((p) => p.id === it?.id);
    const qty = Math.floor(Number(it?.qty));
    if (!product || !Number.isFinite(qty) || qty < 1 || qty > 99) continue;
    items.push({
      id: product.id,
      name: product.name,
      qty,
      unitCents: product.priceCents,
      saleCents: salePrice(product.priceCents),
    });
  }
  if (items.length === 0) return res.status(400).json({ error: "Seu carrinho está vazio." });

  const subtotalCents = items.reduce((s, i) => s + i.unitCents * i.qty, 0);
  const totalCents = items.reduce((s, i) => s + i.saleCents * i.qty, 0);
  const code = "NF" + Date.now().toString(36).toUpperCase() + randomBytes(3).toString("hex").toUpperCase();
  const pixPayload = buildPixPayload(totalCents, code);

  try {
    await db.insert(orders).values({
      code,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      address: customer.address,
      items,
      subtotalCents,
      discountCents: subtotalCents - totalCents,
      totalCents,
      pixPayload,
    });
  } catch (err) {
    console.error("Erro ao salvar pedido", err);
    return res.status(500).json({ error: "Não foi possível registrar o pedido. Tente novamente." });
  }

  const qrCode = await QRCode.toDataURL(pixPayload, { margin: 1, width: 320 });
  res.status(201).json({
    code,
    subtotalCents,
    discountCents: subtotalCents - totalCents,
    totalCents,
    pixPayload,
    qrCode,
    merchant: PIX_MERCHANT_NAME,
  });
});

app.use("/api", (_req, res) => res.status(404).json({ error: "Não encontrado" }));

app.listen(process.env.PORT);
