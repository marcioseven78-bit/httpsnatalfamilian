const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const $ = (s) => document.querySelector(s);

// Ilustrações SVG dos produtos
const ART = {
  "ball-red": `<svg viewBox="0 0 100 110"><rect x="42" y="4" width="16" height="12" rx="2" fill="#d4a64a"/><circle cx="50" cy="62" r="42" fill="#b3122e"/><path d="M14 56q36 14 72 0" stroke="#f3d792" stroke-width="4" fill="none"/><path d="M12 70q38 14 76 0" stroke="#f3d792" stroke-width="2" stroke-dasharray="2 5" fill="none"/><circle cx="34" cy="44" r="8" fill="#fff" opacity=".35"/></svg>`,
  "ball-gold": `<svg viewBox="0 0 100 110"><rect x="42" y="4" width="16" height="12" rx="2" fill="#8a6a26"/><circle cx="50" cy="62" r="42" fill="#d4a64a"/><path d="M50 30l6 14 15 1-11 10 4 15-14-8-14 8 4-15-11-10 15-1z" fill="#f3d792"/><circle cx="32" cy="44" r="7" fill="#fff" opacity=".35"/></svg>`,
  star: `<svg viewBox="0 0 100 110"><path d="M50 6l13 30 33 3-25 22 8 32-29-17-29 17 8-32L4 39l33-3z" fill="#d4a64a" stroke="#8a6a26" stroke-width="2"/><path d="M50 22l7 18 18 2-14 12 5 18-16-10-16 10 5-18-14-12 18-2z" fill="#f3d792"/><rect x="44" y="92" width="12" height="16" fill="#0d3b2a"/></svg>`,
  tree: `<svg viewBox="0 0 100 120"><path d="M50 4 82 44H66l24 32H72l22 30H6l22-30H10l24-32H18z" fill="#0d3b2a"/><path d="M30 40l40 2M20 72l60 2M12 102l76 0" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/><circle cx="40" cy="58" r="5" fill="#b3122e"/><circle cx="62" cy="88" r="5" fill="#d4a64a"/><circle cx="34" cy="92" r="5" fill="#b3122e"/><circle cx="58" cy="30" r="4" fill="#d4a64a"/><rect x="42" y="106" width="16" height="12" fill="#6e5640"/></svg>`,
  "tree-small": `<svg viewBox="0 0 100 120"><path d="M50 16 78 56H64l22 34H14l22-34H22z" fill="#14513a"/><circle cx="44" cy="48" r="5" fill="#d4a64a"/><circle cx="60" cy="72" r="5" fill="#b3122e"/><circle cx="36" cy="80" r="5" fill="#d4a64a"/><path d="M50 4l4 8 8 1-6 5 2 8-8-4-8 4 2-8-6-5 8-1z" fill="#d4a64a"/><rect x="38" y="90" width="24" height="22" rx="3" fill="#b3122e"/></svg>`,
  lights: `<svg viewBox="0 0 100 100"><path d="M4 30q24 26 46 0t46 0" stroke="#1d1a16" stroke-width="2" fill="none"/><path d="M4 66q24 26 46 0t46 0" stroke="#1d1a16" stroke-width="2" fill="none"/>${[[14,40,"#ffd34d"],[34,44,"#b3122e"],[54,30,"#32bcad"],[74,38,"#ffd34d"],[90,32,"#b3122e"],[14,76,"#32bcad"],[34,80,"#ffd34d"],[54,66,"#b3122e"],[74,74,"#32bcad"],[90,68,"#ffd34d"]].map(([x,y,c])=>`<ellipse cx="${x}" cy="${y+6}" rx="5" ry="8" fill="${c}"/><circle cx="${x}" cy="${y+6}" r="11" fill="${c}" opacity=".25"/>`).join("")}</svg>`,
  cascade: `<svg viewBox="0 0 100 100"><rect x="4" y="6" width="92" height="4" rx="2" fill="#1d1a16"/>${Array.from({length:10},(_,i)=>`<line x1="${9+i*9.2}" y1="10" x2="${9+i*9.2}" y2="${50+(i%3)*16}" stroke="#3a3328" stroke-width="1"/>${Array.from({length:4},(_,j)=>`<circle cx="${9+i*9.2}" cy="${18+j*(10+(i%3)*4)}" r="2.6" fill="#ffe08a"/>`).join("")}`).join("")}</svg>`,
  "kit-classic": `<svg viewBox="0 0 100 100"><rect x="14" y="40" width="72" height="54" rx="4" fill="#b3122e"/><rect x="10" y="30" width="80" height="16" rx="3" fill="#7d0b20"/><rect x="44" y="30" width="12" height="64" fill="#d4a64a"/><path d="M50 30c-14-22-30-10-18 0zM50 30c14-22 30-10 18 0z" fill="#d4a64a"/><circle cx="26" cy="66" r="7" fill="#f3d792"/><circle cx="74" cy="78" r="7" fill="#f3d792"/></svg>`,
  "kit-nordic": `<svg viewBox="0 0 100 100"><rect x="14" y="40" width="72" height="54" rx="4" fill="#efe9df" stroke="#a8896b" stroke-width="2"/><rect x="10" y="30" width="80" height="16" rx="3" fill="#a8896b"/><rect x="44" y="30" width="12" height="64" fill="#6e5640"/><path d="M26 58l8 14h-16zM74 58l8 14h-16z" fill="#6e5640"/><path d="M50 30c-14-22-30-10-18 0zM50 30c14-22 30-10 18 0z" fill="#6e5640"/></svg>`,
  wreath: `<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="34" fill="none" stroke="#0d3b2a" stroke-width="18"/><circle cx="50" cy="52" r="34" fill="none" stroke="#14513a" stroke-width="6" stroke-dasharray="6 8"/>${[[22,40],[78,40],[30,78],[70,78],[50,18]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#b3122e"/>`).join("")}<path d="M50 84l-14 12 4-16zM50 84l14 12-4-16z" fill="#b3122e"/><circle cx="50" cy="84" r="6" fill="#7d0b20"/></svg>`,
  santa: `<svg viewBox="0 0 100 110"><path d="M22 46Q50 0 80 30l10 20-8 2-6-12Q60 30 30 50z" fill="#b3122e"/><circle cx="90" cy="52" r="7" fill="#fff"/><rect x="18" y="44" width="64" height="12" rx="6" fill="#fff"/><circle cx="50" cy="66" r="18" fill="#f1c7a3"/><circle cx="43" cy="64" r="2.5" fill="#1d1a16"/><circle cx="57" cy="64" r="2.5" fill="#1d1a16"/><path d="M28 72q22 44 44 0q-22 10-44 0z" fill="#fff"/><circle cx="50" cy="72" r="4" fill="#e89a8a"/></svg>`,
  table: `<svg viewBox="0 0 100 100"><path d="M6 46h88l-8 40H14z" fill="#b3122e"/><path d="M6 46h88v8H6z" fill="#7d0b20"/><path d="M14 86l4-32M86 86l-4-32" stroke="#d4a64a" stroke-width="2"/><ellipse cx="50" cy="40" rx="26" ry="6" fill="#fff"/><circle cx="38" cy="30" r="9" fill="#d4a64a"/><rect x="58" y="14" width="5" height="22" fill="#f3d792"/><path d="M60.5 8q4 4 0 7q-4-3 0-7z" fill="#ffb347"/></svg>`,
};

const state = { products: [], filter: "Todos", cart: JSON.parse(localStorage.getItem("nf-cart") || "{}") };

function saveCart() {
  localStorage.setItem("nf-cart", JSON.stringify(state.cart));
  const count = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const el = $("#cartCount");
  el.textContent = count;
  el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
}

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("show"), 2200);
}

function renderFilters() {
  const cats = ["Todos", ...new Set(state.products.map((p) => p.category))];
  $("#filters").innerHTML = cats
    .map((c) => `<button class="chip" role="tab" aria-selected="${c === state.filter}" data-cat="${c}">${c}</button>`)
    .join("");
}

function renderGrid() {
  const list = state.products.filter((p) => state.filter === "Todos" || p.category === state.filter);
  $("#grid").innerHTML = list
    .map(
      (p) => `
    <article class="card">
      <div class="card-art">${ART[p.art] || ""}<span class="off-badge">-45%</span>${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}</div>
      <div class="card-body">
        <span class="card-cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">
          <span class="price-old">${brl(p.priceCents)}</span>
          <span class="price-new">${brl(p.saleCents)}</span>
          <span class="price-pix">◆ à vista no PIX</span>
        </div>
        <button class="btn" data-add="${p.id}">Adicionar ao carrinho</button>
      </div>
    </article>`
    )
    .join("");
}

function cartLines() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ p: state.products.find((x) => x.id === id), qty }))
    .filter((l) => l.p && l.qty > 0);
}

function totalsHtml(lines) {
  const sub = lines.reduce((s, l) => s + l.p.priceCents * l.qty, 0);
  const tot = lines.reduce((s, l) => s + l.p.saleCents * l.qty, 0);
  return `<div><span>Subtotal</span><span>${brl(sub)}</span></div>
    <div class="disc"><span>Black Friday (-45%)</span><span>− ${brl(sub - tot)}</span></div>
    <div><span>Pagamento</span><span>◆ PIX</span></div>
    <div class="grand"><span>Total</span><span>${brl(tot)}</span></div>`;
}

function renderCart() {
  const lines = cartLines();
  $("#cartItems").innerHTML = lines.length
    ? lines
        .map(
          ({ p, qty }) => `
      <li class="cart-item">
        <div class="mini">${ART[p.art] || ""}</div>
        <div><h4>${p.name}</h4><span class="ci-price">${brl(p.saleCents)}</span></div>
        <div class="qty"><button data-dec="${p.id}" aria-label="Diminuir">−</button><span>${qty}</span><button data-inc="${p.id}" aria-label="Aumentar">+</button></div>
      </li>`
        )
        .join("")
    : `<li class="empty">Seu carrinho está vazio. 🎄</li>`;
  $("#totals").innerHTML = lines.length ? totalsHtml(lines) : "";
  $("#totals2").innerHTML = lines.length ? totalsHtml(lines) : "";
  $("#toCheckout").disabled = !lines.length;
}

function showStep(step) {
  for (const id of ["stepCart", "stepCheckout", "stepPix"]) $("#" + id).hidden = id !== step;
  $("#drawerTitle").textContent = { stepCart: "Seu carrinho", stepCheckout: "Dados de entrega", stepPix: "Pagamento PIX" }[step];
}

function openCart() {
  renderCart();
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
}
function closeCart() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
}

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.add) {
    state.cart[t.dataset.add] = (state.cart[t.dataset.add] || 0) + 1;
    saveCart();
    toast("Adicionado ao carrinho 🎁");
  } else if (t.dataset.inc) {
    state.cart[t.dataset.inc] = Math.min(99, (state.cart[t.dataset.inc] || 0) + 1);
    saveCart(); renderCart();
  } else if (t.dataset.dec) {
    state.cart[t.dataset.dec] = (state.cart[t.dataset.dec] || 0) - 1;
    if (state.cart[t.dataset.dec] <= 0) delete state.cart[t.dataset.dec];
    saveCart(); renderCart();
  } else if (t.dataset.cat) {
    state.filter = t.dataset.cat;
    renderFilters(); renderGrid();
  } else if (t.dataset.filter) {
    state.filter = t.dataset.filter;
    renderFilters(); renderGrid();
    $("#produtos").scrollIntoView();
  }
});

$("#openCart").onclick = () => { showStep("stepCart"); openCart(); };
$("#closeCart").onclick = closeCart;
$("#overlay").onclick = closeCart;
$("#toCheckout").onclick = () => showStep("stepCheckout");
$("#backToCart").onclick = () => showStep("stepCart");
$("#newOrder").onclick = () => { showStep("stepCart"); closeCart(); };
$("#copyPix").onclick = async () => {
  const code = $("#pixCode").value;
  try { await navigator.clipboard.writeText(code); } catch { $("#pixCode").select(); document.execCommand("copy"); }
  toast("Código PIX copiado ✔");
};

$("#stepCheckout").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = $("#placeOrder");
  $("#formError").textContent = "";
  btn.disabled = true;
  btn.textContent = "Gerando PIX…";
  try {
    const data = Object.fromEntries(new FormData(form));
    const items = cartLines().map(({ p, qty }) => ({ id: p.id, qty }));
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, items }),
    });
    const out = await res.json();
    if (!res.ok) throw new Error(out.error || "Erro ao gerar o PIX.");
    $("#orderCode").textContent = out.code;
    $("#pixQr").src = out.qrCode;
    $("#pixAmount").textContent = brl(out.totalCents);
    $("#pixCode").value = out.pixPayload;
    state.cart = {};
    saveCart();
    form.reset();
    showStep("stepPix");
  } catch (err) {
    $("#formError").textContent = err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = "Gerar PIX";
  }
});

// Contagem regressiva da Black Friday (até o fim de 30/11)
function tick() {
  const end = new Date(new Date().getFullYear(), 10, 30, 23, 59, 59);
  const ms = end - Date.now();
  if (ms <= 0) { $("#countdown").textContent = ""; return; }
  const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
  $("#countdown").textContent = `Termina em ${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}
tick(); setInterval(tick, 1000);
$("#year").textContent = new Date().getFullYear();

async function init() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    state.products = data.products;
    renderFilters(); renderGrid(); saveCart();
  } catch {
    $("#grid").innerHTML = `<p class="loading">Não foi possível carregar os produtos. Atualize a página.</p>`;
  }
}
init();
