<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin — HOGALALLA</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="logo">HOGA<span>LALLA</span></a>
    <ul class="nav-links"><li><a href="index.html">Back to Site</a></li></ul>
    <div class="nav-actions"></div>
  </div>
</nav>

<div id="gate" class="wrap auth-shell">
  <div class="auth-head">
    <h1>Admin Access</h1>
    <p>This page is private — enter your admin password</p>
  </div>
  <div class="form-card">
    <div class="field"><label>Password</label><input type="password" id="pwInput" placeholder="••••••••"></div>
    <button class="btn btn-primary btn-block" id="pwSubmit">Unlock</button>
  </div>
</div>

<div id="panel" class="wrap" style="display:none; padding-bottom:100px;">
  <div class="page-head" style="padding-top:32px; display:flex; justify-content:space-between; align-items:flex-end;">
    <div>
      <h1 class="page-title">Admin</h1>
      <p style="color:var(--muted); margin-top:8px;" id="dbStatus"></p>
    </div>
    <button class="btn btn-outline" id="logoutBtn">Log Out</button>
  </div>

  <div class="chip-row" style="margin-bottom:28px;">
    <button class="chip active" data-tab="products">Products</button>
    <button class="chip" data-tab="api">API &amp; Database</button>
  </div>

  <!-- ================= PRODUCTS TAB ================= -->
  <div id="tab-products">
    <div class="cart-layout" style="grid-template-columns: 420px 1fr;">
      <div class="form-card">
        <h3>Add New Product</h3>
        <form id="productForm">
          <div class="field"><label>Product Name</label><input type="text" id="pName" required></div>

          <div class="field-row">
            <div class="field">
              <label>Category</label>
              <select id="pCategory" required>
                <option value="anime">Anime</option>
                <option value="tees">Tees</option>
                <option value="hoodies">Hoodies</option>
                <option value="sweatshirts">Sweatshirts</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <div class="field">
              <label>Garment Type</label>
              <select id="pKind">
                <option value="tee">Tee</option>
                <option value="hoodie">Hoodie</option>
                <option value="tote">Tote</option>
                <option value="cap">Cap</option>
              </select>
            </div>
          </div>

          <div class="field-row">
            <div class="field"><label>Price (₹)</label><input type="number" id="pPrice" required min="0"></div>
            <div class="field"><label>Old Price (optional)</label><input type="number" id="pOldPrice" min="0"></div>
          </div>

          <div class="field">
            <label>Badge (optional)</label>
            <select id="pBadge">
              <option value="">None</option>
              <option value="New Drop">New Drop</option>
              <option value="Bestseller">Bestseller</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <div class="field">
            <label>Sizes (comma separated)</label>
            <input type="text" id="pSizes" value="S,M,L,XL" required>
          </div>

          <div class="field">
            <label>Product Photo</label>
            <input type="file" id="pImageFile" accept="image/*">
          </div>
          <div class="field">
            <label>Or paste an image URL instead</label>
            <input type="text" id="pImageUrl" placeholder="https://...">
          </div>
          <div id="imgPreviewWrap" style="display:none; margin-bottom:16px;">
            <div class="pd-thumb" style="width:76px;height:76px;"><img id="imgPreview" style="width:100%;height:100%;object-fit:cover;"></div>
          </div>

          <div class="field"><label>Description</label><input type="text" id="pDesc" placeholder="Fabric, fit, print details..."></div>

          <button type="submit" class="btn btn-primary btn-block btn-lg" id="submitProductBtn">Add Product</button>
        </form>
      </div>

      <div>
        <div class="filter-bar" style="border-bottom:none; padding-top:0;">
          <h3 style="font-family:var(--font-display); text-transform:uppercase; font-size:16px;">Products (<span id="countLabel">0</span>)</h3>
        </div>
        <div class="product-grid" id="adminGrid"></div>
      </div>
    </div>
  </div>

  <!-- ================= API & DATABASE TAB ================= -->
  <div id="tab-api" style="display:none; max-width:600px;">
    <div class="form-card" style="margin-bottom:20px;">
      <h3>Database (Supabase)</h3>
      <p style="color:var(--muted); font-size:13px; margin-bottom:18px;">
        This makes products, images, and reviews visible to <strong>every visitor</strong>, not just this browser.
        Create a free project at <a href="https://supabase.com" target="_blank" style="color:var(--sky);">supabase.com</a>,
        run the SQL in <code>supabase-setup.sql</code> (included in your project files) once in their SQL Editor,
        then paste your keys below — find them under Project → Settings → API.
      </p>
      <div class="field"><label>Supabase Project URL</label><input type="text" id="sbUrl" placeholder="https://xxxx.supabase.co"></div>
      <div class="field"><label>Supabase Anon Public Key</label><input type="text" id="sbKey" placeholder="eyJhbGciOi..."></div>
      <button class="btn btn-primary btn-block" id="saveDbBtn">Save & Reconnect</button>
    </div>

    <div class="form-card">
      <h3>Printify API (for order fulfilment)</h3>
      <p style="color:var(--muted); font-size:13px; margin-bottom:18px;">
        ⚠️ <strong>This is saved only in this browser</strong> — never sent to the shared database or anywhere
        online. That's intentional: an API key that any visitor's browser could read is a key that can be
        stolen. Real order-forwarding to Printify needs a small server-side function using this key — ask
        for help wiring that up once you're ready to take live orders.
      </p>
      <div class="field"><label>Printify API Key</label><input type="password" id="printifyKey" placeholder="Paste your Printify API key"></div>
      <div class="field"><label>Printify Shop ID</label><input type="text" id="printifyShop" placeholder="e.g. 12345678"></div>
      <button class="btn btn-outline btn-block" id="savePrintifyBtn">Save Locally</button>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="config.js"></script>
<script src="data.js"></script>
<script src="supabase-client.js"></script>
<script src="app.js"></script>
<script>
  const gate = document.getElementById('gate');
  const panel = document.getElementById('panel');

  function showPanel() {
    gate.style.display = 'none';
    panel.style.display = 'block';
    document.getElementById('dbStatus').textContent = isDBConnected()
      ? '🟢 Connected to shared database — products are visible to everyone'
      : '🟡 Not connected — products only visible in this browser (see API & Database tab)';
    renderAdminGrid();
    document.getElementById('sbUrl').value = localStorage.getItem('hogalalla_supabase_url') || '';
    document.getElementById('sbKey').value = localStorage.getItem('hogalalla_supabase_key') || '';
    document.getElementById('printifyKey').value = localStorage.getItem('hogalalla_printify_key') || '';
    document.getElementById('printifyShop').value = localStorage.getItem('hogalalla_printify_shop') || '';
  }

  if (isAdmin()) showPanel();

  document.getElementById('pwSubmit').addEventListener('click', tryLogin);
  document.getElementById('pwInput').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  function tryLogin() {
    const pass = document.getElementById('pwInput').value;
    if (adminLogin(pass)) showPanel();
    else showToast('Wrong password');
  }
  document.getElementById('logoutBtn').addEventListener('click', () => { adminLogout(); location.reload(); });

  // Tabs
  document.querySelectorAll('.chip[data-tab]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip[data-tab]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      document.getElementById('tab-products').style.display = chip.dataset.tab === 'products' ? 'block' : 'none';
      document.getElementById('tab-api').style.display = chip.dataset.tab === 'api' ? 'block' : 'none';
    });
  });

  document.getElementById('saveDbBtn').addEventListener('click', () => {
    localStorage.setItem('hogalalla_supabase_url', document.getElementById('sbUrl').value.trim());
    localStorage.setItem('hogalalla_supabase_key', document.getElementById('sbKey').value.trim());
    showToast('Saved — reconnecting...');
    setTimeout(() => location.reload(), 600);
  });
  document.getElementById('savePrintifyBtn').addEventListener('click', () => {
    localStorage.setItem('hogalalla_printify_key', document.getElementById('printifyKey').value.trim());
    localStorage.setItem('hogalalla_printify_shop', document.getElementById('printifyShop').value.trim());
    showToast('Saved locally in this browser');
  });

  // Image handling
  let uploadedFile = null;
  document.getElementById('pImageFile').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    uploadedFile = file;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('pImageUrl').value = '';
      document.getElementById('imgPreview').src = ev.target.result;
      document.getElementById('imgPreviewWrap').style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
  document.getElementById('pImageUrl').addEventListener('input', e => {
    if (e.target.value) {
      uploadedFile = null;
      document.getElementById('imgPreview').src = e.target.value;
      document.getElementById('imgPreviewWrap').style.display = 'block';
    }
  });

  document.getElementById('productForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitProductBtn');
    btn.textContent = 'Saving...'; btn.disabled = true;

    let image = document.getElementById('pImageUrl').value || '';
    if (uploadedFile && isDBConnected()) {
      const url = await uploadProductImage(uploadedFile);
      if (url) image = url;
    } else if (uploadedFile && !isDBConnected()) {
      image = document.getElementById('imgPreview').src;
    }

    const product = {
      id: 'custom-' + Date.now(),
      name: document.getElementById('pName').value,
      category: document.getElementById('pCategory').value,
      kind: document.getElementById('pKind').value,
      price: Number(document.getElementById('pPrice').value),
      oldPrice: document.getElementById('pOldPrice').value ? Number(document.getElementById('pOldPrice').value) : null,
      badge: document.getElementById('pBadge').value || null,
      sizes: document.getElementById('pSizes').value.split(',').map(s => s.trim()).filter(Boolean),
      colors: ['#0B0D12'], accent: '#38BDF8', graphic: 'circle',
      desc: document.getElementById('pDesc').value || 'No description added yet.',
      image, images: image ? [image] : []
    };

    if (isDBConnected()) {
      const saved = await addProductToDB(product);
      if (saved) showToast('Product added — visible to everyone');
    } else {
      addCustomProduct(product);
      showToast('Product added (this browser only — connect a database to share it)');
    }

    e.target.reset();
    document.getElementById('imgPreviewWrap').style.display = 'none';
    uploadedFile = null;
    btn.textContent = 'Add Product'; btn.disabled = false;
    renderAdminGrid();
  });

  async function renderAdminGrid() {
    const grid = document.getElementById('adminGrid');
    let list = [];
    if (isDBConnected()) list = await fetchProductsFromDB();
    else list = getCustomProducts();

    document.getElementById('countLabel').textContent = list.length;
    if (list.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><h3>No products yet</h3><p>Add your first one using the form.</p></div>`;
      return;
    }
    grid.innerHTML = list.map(p => `
      <div class="card">
        <div class="card-media">
          ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="card-body">
          <span class="card-cat">${p.category}</span>
          <h4>${p.name}</h4>
          <div class="card-price-row"><span class="price">${formatINR(p.price)}</span></div>
        </div>
        <div class="card-actions">
          <a href="product.html?id=${p.id}" class="btn btn-outline">Preview</a>
          <button class="btn btn-primary" style="background:var(--danger); color:#fff;" data-del="${p.id}">Delete</button>
        </div>
      </div>`).join('');

    grid.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', async () => {
      if (isDBConnected()) await deleteProductFromDB(btn.dataset.del);
      else deleteCustomProduct(btn.dataset.del);
      showToast('Product removed');
      renderAdminGrid();
    }));
  }
</script>
</body>
</html>
