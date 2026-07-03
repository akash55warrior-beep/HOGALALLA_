/* ============================================
   HOGALALLA — Mock product catalog
   Swap this out later for a live fetch from your
   Printify shop: GET /shops/{shop_id}/products.json
   ============================================ */

// Generates a simple placeholder garment mockup as an inline SVG data URI.
// Replace product.image with real Printify mockup URLs once connected.
function mockupSVG(kind, base, accent, graphic) {
  const shapes = {
    tee: `<path d="M70 40 L40 55 L20 90 L45 105 L55 90 L55 220 L165 220 L165 90 L175 105 L200 90 L180 55 L150 40 C150 55 130 65 110 65 C90 65 70 55 70 40 Z"/>`,
    hoodie: `<path d="M70 45 L38 60 L15 95 L42 112 L55 95 L55 100 C40 108 32 125 32 150 L32 225 L188 225 L188 150 C188 125 180 108 165 100 L165 95 L178 112 L205 95 L182 60 L150 45 C150 60 132 70 110 70 C88 70 70 60 70 45 Z"/><circle cx="110" cy="95" r="9" fill="none" stroke="${accent}" stroke-width="2"/>`,
    tote: `<path d="M55 85 L165 85 L175 220 L45 220 Z"/><path d="M75 85 C75 60 90 45 110 45 C130 45 145 60 145 85" fill="none" stroke="${base}" stroke-width="6"/>`,
    cap: `<path d="M40 130 C40 90 72 65 110 65 C148 65 180 90 180 130 L180 140 L40 140 Z"/><path d="M40 140 L10 155 L45 158 Z"/>`
  };
  const graphics = {
    circle: `<circle cx="110" cy="130" r="26" fill="${accent}" opacity="0.9"/>`,
    bolt: `<path d="M118 105 L96 140 L112 140 L104 165 L130 128 L112 128 Z" fill="${accent}"/>`,
    wave: `<path d="M75 130 Q95 110 110 130 T145 130" stroke="${accent}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    star: `<path d="M110 105 L116 122 L134 122 L120 133 L125 150 L110 140 L95 150 L100 133 L86 122 L104 122 Z" fill="${accent}"/>`,
    eye: `<ellipse cx="110" cy="130" rx="24" ry="14" fill="none" stroke="${accent}" stroke-width="4"/><circle cx="110" cy="130" r="6" fill="${accent}"/>`,
    grid: `<g stroke="${accent}" stroke-width="2" opacity="0.85">
      <line x1="90" y1="108" x2="90" y2="152"/><line x1="110" y1="108" x2="110" y2="152"/><line x1="130" y1="108" x2="130" y2="152"/>
      <line x1="90" y1="115" x2="130" y2="115"/><line x1="90" y1="130" x2="130" y2="130"/><line x1="90" y1="145" x2="130" y2="145"/>
    </g>`
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 240">
    <rect width="220" height="240" fill="none"/>
    <g fill="${base}" stroke="${accent}" stroke-width="2.5">${shapes[kind]}</g>
    ${graphics[graphic] || ''}
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const PRODUCTS = [
  {
    id: 'p1', name: 'Ronin Drift Tee', category: 'anime',
    price: 799, oldPrice: 999, badge: 'New Drop',
    colors: ['#0B0D12', '#1D4ED8'], sizes: ['S','M','L','XL','XXL'],
    kind: 'tee', graphic: 'bolt', accent: '#38BDF8',
    desc: 'Heavyweight 220 GSM cotton tee with a high-density front print inspired by night-city drift culture. Oversized boxy fit.'
  },
  {
    id: 'p2', name: 'Neon Katana Hoodie', category: 'hoodies',
    price: 1799, oldPrice: 2199, badge: 'Bestseller',
    colors: ['#0B0D12'], sizes: ['S','M','L','XL','XXL'],
    kind: 'hoodie', graphic: 'star', accent: '#38BDF8',
    desc: 'Fleece-lined 380 GSM hoodie, kangaroo pocket, ribbed cuffs. Back and front print, brushed interior for winter wear.'
  },
  {
    id: 'p3', name: 'Spirit Eye Oversized Tee', category: 'anime',
    price: 849, oldPrice: null, badge: null,
    colors: ['#0B0D12', '#171B24'], sizes: ['M','L','XL'],
    kind: 'tee', graphic: 'eye', accent: '#38BDF8',
    desc: 'Drop-shoulder oversized fit with a minimal single-eye motif front and center. Soft-hand water-based ink.'
  },
  {
    id: 'p4', name: 'Circuit Wave Tee', category: 'tees',
    price: 699, oldPrice: 899, badge: 'Sale',
    colors: ['#1D4ED8', '#0B0D12'], sizes: ['S','M','L','XL'],
    kind: 'tee', graphic: 'wave', accent: '#38BDF8',
    desc: 'Regular fit essential tee with a subtle chest-level wave graphic. Everyday staple, 100% combed cotton.'
  },
  {
    id: 'p5', name: 'Blackout Grid Hoodie', category: 'hoodies',
    price: 1899, oldPrice: null, badge: 'New Drop',
    colors: ['#0B0D12'], sizes: ['S','M','L','XL','XXL'],
    kind: 'hoodie', graphic: 'grid', accent: '#38BDF8',
    desc: 'Structured heavyweight hoodie with a minimal grid print. Dropped shoulder, boxy silhouette.'
  },
  {
    id: 'p6', name: 'Aura Orb Sweatshirt', category: 'sweatshirts',
    price: 1499, oldPrice: 1699, badge: null,
    colors: ['#171B24', '#1D4ED8'], sizes: ['S','M','L','XL'],
    kind: 'hoodie', graphic: 'circle', accent: '#38BDF8',
    desc: 'Crewneck sweatshirt, mid-weight fleece, single orb graphic. Layers clean under a jacket.'
  },
  {
    id: 'p7', name: 'Ronin Star Tee', category: 'anime',
    price: 799, oldPrice: null, badge: null,
    colors: ['#0B0D12'], sizes: ['S','M','L','XL','XXL'],
    kind: 'tee', graphic: 'star', accent: '#38BDF8',
    desc: 'Front-and-back print oversized tee, inspired by shonen title cards. Garment-dyed for a worn-in look.'
  },
  {
    id: 'p8', name: 'Signal Tote', category: 'accessories',
    price: 449, oldPrice: null, badge: null,
    colors: ['#0B0D12'], sizes: ['One Size'],
    kind: 'tote', graphic: 'bolt', accent: '#38BDF8',
    desc: 'Heavy canvas tote, reinforced handles, printed front graphic. Fits a 15" laptop easily.'
  },
  {
    id: 'p9', name: 'Static Grid Cap', category: 'accessories',
    price: 599, oldPrice: 699, badge: 'Sale',
    colors: ['#0B0D12', '#1D4ED8'], sizes: ['One Size'],
    kind: 'cap', graphic: 'grid', accent: '#38BDF8',
    desc: 'Structured 6-panel cap with embroidered front logo and adjustable strap back.'
  },
  {
    id: 'p10', name: 'Drift Wave Oversized Tee', category: 'tees',
    price: 749, oldPrice: null, badge: 'New Drop',
    colors: ['#0B0D12', '#171B24'], sizes: ['S','M','L','XL'],
    kind: 'tee', graphic: 'wave', accent: '#38BDF8',
    desc: 'Oversized fit tee with a wave-line graphic across the chest. Pre-shrunk heavyweight cotton.'
  },
  {
    id: 'p11', name: 'Nightfall Zip Hoodie', category: 'hoodies',
    price: 2099, oldPrice: 2399, badge: 'Bestseller',
    colors: ['#0B0D12'], sizes: ['M','L','XL','XXL'],
    kind: 'hoodie', graphic: 'eye', accent: '#38BDF8',
    desc: 'Full-zip heavyweight hoodie with embroidered sleeve detail and a minimal front graphic.'
  },
  {
    id: 'p12', name: 'Orb Crew Sweatshirt', category: 'sweatshirts',
    price: 1399, oldPrice: null, badge: null,
    colors: ['#171B24'], sizes: ['S','M','L','XL'],
    kind: 'hoodie', graphic: 'circle', accent: '#38BDF8',
    desc: 'Relaxed-fit crewneck with a soft brushed interior. Clean orb print, minimal branding.'
  }
];

PRODUCTS.forEach(p => {
  p.image = mockupSVG(p.kind, p.colors[0], p.accent, p.graphic);
  p.images = p.colors.map(c => mockupSVG(p.kind, c, p.accent, p.graphic));
});

const CATEGORIES = [
  { id: 'anime', label: 'Anime', glyph: 'A', desc: 'Graphic prints inspired by anime & manga culture' },
  { id: 'tees', label: 'Tees', glyph: 'T', desc: 'Everyday essential and oversized tees' },
  { id: 'hoodies', label: 'Hoodies', glyph: 'H', desc: 'Heavyweight fleece, built for layering' },
  { id: 'sweatshirts', label: 'Sweatshirts', glyph: 'S', desc: 'Crewnecks for clean, minimal fits' },
  { id: 'accessories', label: 'Accessories', glyph: 'X', desc: 'Totes, caps & the small stuff' }
];

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function getProductsByCategory(cat) { return cat && cat !== 'all' ? PRODUCTS.filter(p => p.category === cat) : PRODUCTS; }
