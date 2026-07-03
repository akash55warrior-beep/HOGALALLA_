/* ============================================
   HOGALALLA — Design tokens
   ============================================ */
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --black: #0B0D12;
  --black-soft: #12151C;
  --panel: #171B24;
  --line: #262B36;
  --sky: #38BDF8;
  --sky-deep: #1D4ED8;
  --ink: #F1F5F9;
  --muted: #8B93A3;
  --danger: #F87171;
  --radius: 2px;
  --font-display: 'Anton', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--black);
  color: var(--ink);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { font-family: inherit; cursor: pointer; }
input, select { font-family: inherit; }

img { max-width: 100%; display: block; }

.wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ============================================
   Tag / stitched-badge signature motif
   ============================================ */
.tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1.5px dashed var(--sky);
  border-radius: 3px;
  padding: 4px 10px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sky);
  font-weight: 600;
}
.tag::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--sky);
}

/* ============================================
   Navbar
   ============================================ */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11,13,18,0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: 24px;
}
.logo {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: 0.02em;
  color: var(--ink);
  white-space: nowrap;
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.logo span { color: var(--sky); }
.nav-links {
  display: flex;
  gap: 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
}
.nav-links a { transition: color .15s ease; position: relative; }
.nav-links a:hover, .nav-links a.active { color: var(--ink); }
.nav-links a.active::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -22px;
  height: 2px;
  background: var(--sky);
}
.nav-actions { display: flex; align-items: center; gap: 18px; }
.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--ink);
  transition: border-color .15s ease, background .15s ease;
}
.icon-btn:hover { border-color: var(--sky); background: rgba(56,189,248,0.08); }
.cart-count {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--sky);
  color: var(--black);
  font-size: 10px;
  font-weight: 700;
  width: 17px; height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-toggle { display: none; }

/* ============================================
   Buttons
   ============================================ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: transform .15s ease, background .15s ease, border-color .15s ease;
}
.btn:active { transform: scale(0.97); }
.btn-primary { background: var(--sky); color: var(--black); }
.btn-primary:hover { background: #5ecdfa; }
.btn-outline { border-color: var(--line); color: var(--ink); background: transparent; }
.btn-outline:hover { border-color: var(--sky); color: var(--sky); }
.btn-block { width: 100%; }
.btn-lg { padding: 16px 28px; font-size: 15px; }

/* ============================================
   Hero
   ============================================ */
.hero {
  position: relative;
  padding: 90px 0 70px;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}
.hero::before {
  content: '';
  position: absolute;
  top: -200px; right: -150px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%);
  pointer-events: none;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
  position: relative;
}
.hero-eyebrow { margin-bottom: 20px; }
.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(42px, 6vw, 76px);
  line-height: 0.96;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}
.hero h1 .outline {
  -webkit-text-stroke: 1.5px var(--sky);
  color: transparent;
}
.hero p {
  color: var(--muted);
  font-size: 16px;
  max-width: 440px;
  margin: 22px 0 32px;
}
.hero-actions { display: flex; gap: 14px; }
.hero-visual {
  aspect-ratio: 4/5;
  background: linear-gradient(155deg, var(--panel), var(--black-soft));
  border: 1px solid var(--line);
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-visual::before {
  content: 'HGL';
  font-family: var(--font-display);
  font-size: 180px;
  color: rgba(56,189,248,0.08);
  position: absolute;
  letter-spacing: -8px;
}
.hero-visual img { position: relative; z-index: 1; width: 78%; }

/* ============================================
   Section headers
   ============================================ */
.section { padding: 64px 0; }
.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 20px;
}
.section-head h2 {
  font-family: var(--font-display);
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}
.section-head p { color: var(--muted); font-size: 14px; max-width: 380px; }

/* ============================================
   Category tiles
   ============================================ */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.cat-tile {
  position: relative;
  aspect-ratio: 3/3.6;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 18px;
  transition: border-color .2s ease, transform .2s ease;
}
.cat-tile:hover { border-color: var(--sky); transform: translateY(-4px); }
.cat-tile::before {
  content: attr(data-glyph);
  position: absolute;
  top: 10px; right: 14px;
  font-family: var(--font-display);
  font-size: 54px;
  color: rgba(56,189,248,0.1);
}
.cat-tile h3 {
  font-family: var(--font-display);
  font-size: 20px;
  text-transform: uppercase;
  position: relative; z-index: 1;
}
.cat-tile span {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
  position: relative; z-index: 1;
}

/* ============================================
   Product grid + cards
   ============================================ */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color .2s ease, transform .2s ease;
  display: flex;
  flex-direction: column;
}
.card:hover { border-color: var(--sky); transform: translateY(-3px); }
.card-media {
  aspect-ratio: 1/1.15;
  background: var(--black-soft);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-media img { width: 68%; transition: transform .3s ease; }
.card:hover .card-media img { transform: scale(1.06); }
.card-badge {
  position: absolute;
  top: 10px; left: 10px;
  background: var(--black);
  border: 1px dashed var(--sky);
  color: var(--sky);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
  font-weight: 600;
}
.card-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.card-cat { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
.card h4 { font-size: 15px; font-weight: 600; line-height: 1.3; }
.card-price-row { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.price { font-family: var(--font-display); font-size: 20px; color: var(--sky); }
.price-old { font-size: 12px; color: var(--muted); text-decoration: line-through; margin-left: 6px; }
.card-actions { display: flex; gap: 8px; padding: 0 16px 16px; }
.card-actions .btn { flex: 1; padding: 10px; font-size: 12px; }

/* ============================================
   Footer
   ============================================ */
.footer {
  border-top: 1px solid var(--line);
  padding: 56px 0 28px;
  margin-top: 40px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
}
.footer h5 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 16px;
}
.footer-links { display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
.footer-links a:hover { color: var(--sky); }
.footer p.desc { color: var(--muted); font-size: 14px; max-width: 300px; }
.footer-bottom {
  border-top: 1px solid var(--line);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
}

/* ============================================
   Breadcrumb / page header
   ============================================ */
.page-head { padding: 40px 0 8px; }
.breadcrumb { font-size: 13px; color: var(--muted); margin-bottom: 14px; }
.breadcrumb a:hover { color: var(--sky); }
.page-title {
  font-family: var(--font-display);
  font-size: 34px;
  text-transform: uppercase;
}

/* ============================================
   Filter bar
   ============================================ */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 0 32px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 32px;
}
.chip-row { display: flex; gap: 10px; flex-wrap: wrap; }
.chip {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all .15s ease;
}
.chip:hover { border-color: var(--sky); color: var(--ink); }
.chip.active { background: var(--sky); border-color: var(--sky); color: var(--black); }
.sort-select {
  background: var(--panel);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 9px 14px;
  border-radius: 4px;
  font-size: 13px;
}

/* ============================================
   Product detail
   ============================================ */
.pd-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  padding: 40px 0 80px;
}
.pd-gallery-main {
  aspect-ratio: 1/1;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 12px;
}
.pd-gallery-main img { width: 65%; }
.pd-thumbs { display: flex; gap: 10px; }
.pd-thumb {
  width: 76px; height: 76px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: border-color .15s ease;
}
.pd-thumb.active, .pd-thumb:hover { border-color: var(--sky); }
.pd-thumb img { width: 60%; }
.pd-info .card-cat { margin-bottom: 8px; }
.pd-info h1 {
  font-family: var(--font-display);
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.pd-price { display: flex; align-items: baseline; gap: 10px; margin-bottom: 22px; }
.pd-price .price { font-size: 30px; }
.pd-desc { color: var(--muted); font-size: 14px; line-height: 1.7; margin-bottom: 28px; }
.option-group { margin-bottom: 24px; }
.option-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.option-row { display: flex; gap: 10px; flex-wrap: wrap; }
.opt-btn {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  transition: all .15s ease;
  min-width: 44px;
  text-align: center;
}
.opt-btn:hover { border-color: var(--sky); }
.opt-btn.active { border-color: var(--sky); background: rgba(56,189,248,0.1); color: var(--sky); }
.qty-row { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
.qty-control { display: flex; align-items: center; border: 1px solid var(--line); border-radius: 4px; }
.qty-control button { width: 38px; height: 40px; background: transparent; color: var(--ink); font-size: 16px; border: none; }
.qty-control button:hover { color: var(--sky); }
.qty-control span { width: 36px; text-align: center; font-weight: 600; }
.pd-buy-row { display: flex; gap: 12px; margin-bottom: 24px; }
.pd-meta { border-top: 1px solid var(--line); padding-top: 20px; display: flex; flex-direction: column; gap: 10px; font-size: 13px; color: var(--muted); }
.pd-meta strong { color: var(--ink); }

/* ============================================
   Cart page
   ============================================ */
.cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 40px; padding: 40px 0 80px; align-items: start; }
.cart-item {
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.cart-item-media {
  width: 90px; height: 90px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
}
.cart-item-media img { width: 65%; }
.cart-item-info h4 { font-size: 15px; margin-bottom: 4px; }
.cart-item-info .meta { font-size: 12px; color: var(--muted); margin-bottom: 8px; }
.cart-item-right { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.remove-link { font-size: 12px; color: var(--danger); }
.summary-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 24px;
  position: sticky;
  top: 96px;
}
.summary-card h3 { font-family: var(--font-display); font-size: 18px; text-transform: uppercase; margin-bottom: 18px; }
.summary-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--muted); margin-bottom: 12px; }
.summary-row.total { color: var(--ink); font-weight: 700; font-size: 16px; border-top: 1px solid var(--line); padding-top: 14px; margin-top: 14px; }
.empty-state { text-align: center; padding: 80px 0; color: var(--muted); }
.empty-state h3 { font-family: var(--font-display); font-size: 24px; color: var(--ink); text-transform: uppercase; margin-bottom: 10px; }

/* ============================================
   Forms (checkout / login / account)
   ============================================ */
.form-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 28px;
}
.form-card h3 { font-family: var(--font-display); font-size: 18px; text-transform: uppercase; margin-bottom: 20px; }
.field { margin-bottom: 16px; }
.field label { display: block; font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
.field input, .field select {
  width: 100%;
  background: var(--black-soft);
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 12px 14px;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color .15s ease;
}
.field input:focus, .field select:focus { outline: none; border-color: var(--sky); }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.auth-shell {
  max-width: 420px;
  margin: 0 auto;
  padding: 80px 0 100px;
}
.auth-shell .form-card { padding: 36px 30px; }
.auth-head { text-align: center; margin-bottom: 28px; }
.auth-head h1 { font-family: var(--font-display); font-size: 26px; text-transform: uppercase; margin-bottom: 8px; }
.auth-head p { color: var(--muted); font-size: 13px; }
.oauth-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  border: 1px solid var(--line);
  background: var(--black-soft);
  color: var(--ink);
  padding: 13px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  transition: border-color .15s ease;
}
.oauth-btn:hover { border-color: var(--sky); }
.divider { display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 12px; margin: 20px 0; text-transform: uppercase; letter-spacing: 0.08em; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--line); }
.auth-switch { text-align: center; margin-top: 18px; font-size: 13px; color: var(--muted); }
.auth-switch a { color: var(--sky); font-weight: 600; }

.checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 40px; padding: 40px 0 80px; align-items: start; }
.checkout-steps { display: flex; gap: 24px; margin-bottom: 28px; font-size: 13px; color: var(--muted); }
.checkout-steps .step.active { color: var(--sky); font-weight: 600; }
.pay-options { display: flex; flex-direction: column; gap: 10px; }
.pay-opt {
  display: flex; align-items: center; gap: 12px;
  border: 1px solid var(--line);
  padding: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color .15s ease;
}
.pay-opt:hover, .pay-opt.active { border-color: var(--sky); }
.mini-order-item { display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); margin-bottom: 10px; }

/* ============================================
   Toast
   ============================================ */
.toast {
  position: fixed;
  bottom: 24px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--sky);
  color: var(--black);
  padding: 13px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transition: all .25s ease;
  z-index: 999;
  white-space: nowrap;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* ============================================
   Misc content pages
   ============================================ */
.content-block { max-width: 720px; padding: 20px 0 80px; }
.content-block h2 { font-family: var(--font-display); font-size: 26px; text-transform: uppercase; margin: 32px 0 12px; }
.content-block p { color: var(--muted); margin-bottom: 14px; line-height: 1.75; }

/* ============================================
   Responsive
   ============================================ */
@media (max-width: 980px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { order: -1; max-width: 340px; margin: 0 auto; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .pd-grid { grid-template-columns: 1fr; gap: 32px; }
  .cart-layout, .checkout-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .nav-links { display: none; }
  .nav-toggle { display: flex; }
  .cat-grid, .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .footer-grid { grid-template-columns: 1fr; gap: 28px; }
  .field-row { grid-template-columns: 1fr; }
  .hero { padding: 60px 0 40px; }
}
