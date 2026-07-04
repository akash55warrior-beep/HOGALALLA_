/* ============================================
   HOGALALLA — Supabase data layer
   All product + review reads/writes go through here.
   If SUPABASE_URL / SUPABASE_ANON_KEY (config.js) are empty,
   every function below quietly no-ops and the site falls back
   to the local demo catalog in data.js.
   ============================================ */

/* Config priority: values saved via Admin → API & Database (localStorage)
   override the SUPABASE_URL / SUPABASE_ANON_KEY constants in config.js.
   Either method works — the admin panel is just faster since it needs
   no file editing or redeploy. */
function getActiveSupabaseUrl() { return localStorage.getItem('hogalalla_supabase_url') || (typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : ''); }
function getActiveSupabaseKey() { return localStorage.getItem('hogalalla_supabase_key') || (typeof SUPABASE_ANON_KEY !== 'undefined' ? SUPABASE_ANON_KEY : ''); }

let sb = null;
const _sbUrl = getActiveSupabaseUrl();
const _sbKey = getActiveSupabaseKey();
if (_sbUrl && _sbKey) {
  try { sb = supabase.createClient(_sbUrl, _sbKey); }
  catch (e) { console.error('Supabase init failed', e); }
}
function isDBConnected() { return !!sb; }

/* ---------- Products ---------- */
function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    oldPrice: row.old_price,
    badge: row.badge,
    sizes: row.sizes || ['S', 'M', 'L', 'XL'],
    colors: ['#0B0D12'],
    accent: '#38BDF8',
    graphic: row.graphic || 'circle',
    kind: row.kind || 'tee',
    desc: row.description || '',
    image: row.image_url || '',
    images: row.image_url ? [row.image_url] : [],
    _db: true
  };
}

async function fetchProductsFromDB() {
  if (!sb) return [];
  const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchProductsFromDB', error); return []; }
  return data.map(rowToProduct);
}

async function addProductToDB(product) {
  if (!sb) { showToast('Connect your database first — see Admin → API & Database'); return null; }
  const { data, error } = await sb.from('products').insert([{
    name: product.name,
    category: product.category,
    price: product.price,
    old_price: product.oldPrice,
    badge: product.badge,
    sizes: product.sizes,
    image_url: product.image,
    description: product.desc,
    kind: product.kind,
    graphic: product.graphic
  }]).select();
  if (error) { console.error('addProductToDB', error); showToast('Could not save product'); return null; }
  return data[0];
}

async function deleteProductFromDB(id) {
  if (!sb) return;
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) console.error('deleteProductFromDB', error);
}

async function uploadProductImage(file) {
  if (!sb) return null;
  const fileName = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const { error } = await sb.storage.from('product-images').upload(fileName, file);
  if (error) { console.error('uploadProductImage', error); showToast('Image upload failed'); return null; }
  const { data } = sb.storage.from('product-images').getPublicUrl(fileName);
  return data.publicUrl;
}

/* ---------- Reviews ---------- */
async function fetchReviews(productId) {
  if (!sb) return [];
  const { data, error } = await sb.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false });
  if (error) { console.error('fetchReviews', error); return []; }
  return data;
}

async function addReview(productId, review) {
  if (!sb) { showToast('Reviews need the database connected — see Admin → API & Database'); return null; }
  const { data, error } = await sb.from('reviews').insert([{
    product_id: productId, name: review.name, rating: review.rating, comment: review.comment
  }]).select();
  if (error) { console.error('addReview', error); showToast('Could not submit review'); return null; }
  return data[0];
}

function averageRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

/* ---------- Master product loader ----------
   Call this once per page, before rendering anything that
   reads PRODUCTS. Falls back to the built-in demo catalog +
   any locally-added admin products if no database is connected. */
async function loadAllProducts() {
  if (typeof mergeCustomProducts === 'function') mergeCustomProducts();
  if (isDBConnected()) {
    const dbProducts = await fetchProductsFromDB();
    if (dbProducts.length) {
      PRODUCTS.length = 0;
      dbProducts.forEach(p => PRODUCTS.push(p));
    }
  }
  return PRODUCTS;
}
