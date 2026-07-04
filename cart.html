/* ============================================
   HOGALALLA — Shared app logic
   Cart + mock auth run on localStorage for now.
   Replace CART/AUTH sections with real Supabase +
   Printify + Razorpay calls when you connect keys.
   ============================================ */

const CART_KEY = 'hogalalla_cart';
const AUTH_KEY = 'hogalalla_user';
const ADDR_KEY = 'hogalalla_address';

/* ---------- Cart ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, size, color, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.size === size && i.color === color);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, size, color, qty });
  saveCart(cart);
  showToast('Added to cart');
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}
function updateQty(index, qty) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, qty);
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((sum, item) => {
    const p = getProduct(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartBadge() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const c = cartCount();
    el.textContent = c;
    el.style.display = c > 0 ? 'flex' : 'none';
  });
}

/* ---------- Mock auth ----------
   Swap this for supabase.auth.signInWithOAuth({ provider: 'google' })
   and supabase.auth.signInWithOtp({ phone }) once Supabase is connected. */
function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); }
  catch (e) { return null; }
}
function setUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}
function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}
function requireAuthUI() {
  const user = getUser();
  const loginLink = document.querySelector('[data-nav="account"]');
  if (loginLink && user) loginLink.href = 'account.html';
}

/* ---------- Address ---------- */
function saveAddress(addr) { localStorage.setItem(ADDR_KEY, JSON.stringify(addr)); }
function getAddress() {
  try { return JSON.parse(localStorage.getItem(ADDR_KEY)); }
  catch (e) { return null; }
}

/* ---------- Toast ---------- */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- Currency ---------- */
function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.cssText += open ? '' : 'position:absolute;top:72px;left:0;right:0;background:#0B0D12;flex-direction:column;padding:20px 24px;border-bottom:1px solid #262B36;';
  });
}

/* ---------- Custom products (added via admin.html) ----------
   Stored in this browser's localStorage only. Runs immediately
   (not on DOMContentLoaded) so PRODUCTS is ready before each
   page's own render script runs.
   Later: replace this with products fetched from a real database
   (e.g. Supabase) so new products show up for ALL visitors, not
   just in your own browser. */
const CUSTOM_PRODUCTS_KEY = 'hogalalla_custom_products';
function getCustomProducts() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_PRODUCTS_KEY)) || []; }
  catch (e) { return []; }
}
function saveCustomProducts(list) { localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(list)); }
function addCustomProduct(product) {
  const list = getCustomProducts();
  list.push(product);
  saveCustomProducts(list);
  mergeCustomProducts();
}
function deleteCustomProduct(id) {
  saveCustomProducts(getCustomProducts().filter(p => p.id !== id));
  mergeCustomProducts();
}
function mergeCustomProducts() {
  for (let i = PRODUCTS.length - 1; i >= 0; i--) {
    if (PRODUCTS[i]._custom) PRODUCTS.splice(i, 1);
  }
  getCustomProducts().forEach(p => {
    p._custom = true;
    if (!p.image) p.image = mockupSVG(p.kind || 'tee', (p.colors && p.colors[0]) || '#0B0D12', p.accent || '#38BDF8', p.graphic || 'circle');
    if (!p.images || !p.images.length) p.images = [p.image];
    PRODUCTS.push(p);
  });
}
mergeCustomProducts();

/* ---------- Admin auth ----------
   Client-side only — fine for keeping casual visitors out of a
   page nobody else has the link to, but not real security. Don't
   reuse this password for anything sensitive. */
const ADMIN_PASSWORD = 'hogalalla2026';
const ADMIN_SESSION_KEY = 'hogalalla_admin_ok';
function isAdmin() { return sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'; }
function adminLogin(pass) {
  if (pass === ADMIN_PASSWORD) { sessionStorage.setItem(ADMIN_SESSION_KEY, '1'); return true; }
  return false;
}
function adminLogout() { sessionStorage.removeItem(ADMIN_SESSION_KEY); }

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  requireAuthUI();
  initMobileNav();
});
