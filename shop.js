/* ============================================================
   EESCENTS — SHOP PAGE JAVASCRIPT
   ============================================================ */

'use strict';

// ============================================================
// CART STATE (shared with main)
// ============================================================
let cart = JSON.parse(localStorage.getItem('eescents_cart') || '[]');

function saveCart() { localStorage.setItem('eescents_cart', JSON.stringify(cart)); }
function formatNaira(n) { return '₦' + Number(n).toLocaleString('en-NG'); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

// ============================================================
// ALL PRODUCTS
// ============================================================
const ALL_PRODUCTS = [
  {
    id: 'noir-absolu', name: 'Noir Absolu', category: 'For Him',
    collection: 'signature',
    size: '100ml EDP', price: 38500, oldPrice: 52000,
    img: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80',
    desc: 'A commanding presence of dark oud and black rose. Reserved for those who wear confidence as naturally as they breathe.',
    notes: ['Black Pepper', 'Dark Rose', 'Oud', 'Amber'],
    badge: 'sale', rating: 5, reviews: 128, inStock: true,
    longevity: '10-12 hrs', sillage: 'Heavy'
  },

   {
    id: 'noir-absolu', name: 'Noir Absolu', category: 'For Him',
    collection: 'signature',
    size: '100ml EDP', price: 38500, oldPrice: 52000,
    img: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80',
    desc: 'A commanding presence of dark oud and black rose. Reserved for those who wear confidence as naturally as they breathe.',
    notes: ['Black Pepper', 'Dark Rose', 'Oud', 'Amber'],
    badge: 'sale', rating: 5, reviews: 128, inStock: true,
    longevity: '10-12 hrs', sillage: 'Heavy'
  },

   {
    id: 'noir-absolu', name: 'Noir Absolu', category: 'For Him',
    collection: 'signature',
    size: '100ml EDP', price: 38500, oldPrice: 52000,
    img: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&q=80',
    desc: 'A commanding presence of dark oud and black rose. Reserved for those who wear confidence as naturally as they breathe.',
    notes: ['Black Pepper', 'Dark Rose', 'Oud', 'Amber'],
    badge: 'sale', rating: 5, reviews: 128, inStock: true,
    longevity: '10-12 hrs', sillage: 'Heavy'
  },
  {
    id: 'rose-imperiale', name: 'Rose Imperiale', category: 'For Her',
    collection: 'new',
    size: '100ml EDP', price: 42000, oldPrice: 58000,
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    desc: 'The finest Bulgarian rose hearts meet a velvety musky base. Feminine power distilled into a single masterpiece.',
    notes: ['Bergamot', 'Bulgarian Rose', 'Peony', 'Musk'],
    badge: 'new', rating: 5, reviews: 94, inStock: true,
    longevity: '8-10 hrs', sillage: 'Moderate'
  },
  {
    id: 'saffron-gold', name: 'Saffron & Gold', category: 'Unisex',
    collection: 'signature',
    size: '75ml EDP', price: 35000, oldPrice: 48000,
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
    desc: 'Arabian saffron meets warm gold accord in this bold, opulent unisex fragrance that demands to be noticed.',
    notes: ['Saffron', 'Cinnamon', 'Gold Accord', 'Leather'],
    badge: 'sale', rating: 5, reviews: 76, inStock: true,
    longevity: '10-14 hrs', sillage: 'Very Heavy'
  },
  {
    id: 'velvet-oud', name: 'Velvet Oud', category: 'For Him',
    collection: 'limited',
    size: '50ml Extrait', price: 55000, oldPrice: 75000,
    img: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80',
    desc: 'A rare concentration of pure oud wrapped in velvety violet and plum. 12-hour longevity guaranteed.',
    notes: ['Violet', 'Plum', 'Oud', 'Vanilla'],
    badge: 'limited', rating: 5, reviews: 52, inStock: true,
    longevity: '12+ hrs', sillage: 'Heavy'
  },
  {
    id: 'lor-noir', name: "L'Or Noir Extrait", category: 'Unisex',
    collection: 'signature',
    size: '50ml Extrait', price: 85000, oldPrice: 120000,
    img: 'https://images.unsplash.com/photo-1590156206657-aec9b6258aef?w=600&q=80',
    desc: 'The crown jewel of Eescents. Aged oud from Assam, rare black rose, and pure gold accord. Our most extraordinary creation.',
    notes: ['Aged Oud', 'Black Rose', 'Gold Accord', 'Sandalwood'],
    badge: 'limited', rating: 5, reviews: 41, inStock: true,
    longevity: '24 hrs', sillage: 'Legendary'
  },
  {
    id: 'amber-elixir', name: 'Amber Elixir', category: 'For Her',
    collection: 'bestsellers',
    size: '100ml EDP', price: 32000, oldPrice: 44000,
    img: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=600&q=80',
    desc: 'Warm, sensual amber meets delicate jasmine in this irresistibly feminine fragrance. Perfect for evenings and special occasions.',
    notes: ['Jasmine', 'Amber', 'Vanilla', 'Cedarwood'],
    badge: 'sale', rating: 5, reviews: 183, inStock: true,
    longevity: '8-10 hrs', sillage: 'Moderate'
  },
  {
    id: 'midnight-orchid', name: 'Midnight Orchid', category: 'For Her',
    collection: 'new',
    size: '75ml EDP', price: 29500, oldPrice: 40000,
    img: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&q=80',
    desc: 'Dark orchid and midnight musk create a mysterious, captivating aura. The scent of a woman who lives by her own rules.',
    notes: ['Dark Orchid', 'Black Musk', 'Patchouli', 'Oakmoss'],
    badge: 'new', rating: 4, reviews: 67, inStock: true,
    longevity: '8-12 hrs', sillage: 'Moderate'
  },
  {
    id: 'cedar-smoke', name: 'Cedar & Smoke', category: 'For Him',
    collection: 'bestsellers',
    size: '100ml EDP', price: 36000, oldPrice: 50000,
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
    desc: 'Raw cedarwood and smoky vetiver define this rugged, unapologetically masculine fragrance. Worn by those who own every room.',
    notes: ['Cedarwood', 'Smoked Vetiver', 'Leather', 'Black Pepper'],
    badge: 'sale', rating: 5, reviews: 97, inStock: true,
    longevity: '10-12 hrs', sillage: 'Heavy'
  },
  {
    id: 'imperial-iris', name: 'Imperial Iris', category: 'For Her',
    collection: 'signature',
    size: '75ml EDP', price: 44000, oldPrice: 60000,
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    desc: 'The rare Orris root iris is the heart of this ultra-refined creation. Powdery, pristine, and utterly unforgettable.',
    notes: ['Iris Root', 'Violet Leaf', 'White Musk', 'Ambrette'],
    badge: null, rating: 5, reviews: 58, inStock: true,
    longevity: '8-10 hrs', sillage: 'Moderate'
  },
  {
    id: 'sandalwood-royale', name: 'Sandalwood Royale', category: 'Unisex',
    collection: 'bestsellers',
    size: '100ml EDP', price: 33000, oldPrice: 45000,
    img: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80',
    desc: 'Mysore sandalwood at its purest — creamy, rich, and meditative. A timeless unisex fragrance built for every occasion.',
    notes: ['Mysore Sandalwood', 'Cardamom', 'Rose', 'Tonka Bean'],
    badge: 'sale', rating: 5, reviews: 142, inStock: true,
    longevity: '8-12 hrs', sillage: 'Moderate'
  },
  {
    id: 'gold-bergamot', name: 'Gold Bergamot', category: 'Unisex',
    collection: 'new',
    size: '100ml EDT', price: 24000, oldPrice: 32000,
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80',
    desc: 'A bright, energising citrus fragrance anchored by bergamot and white cedar. The perfect daytime companion for any season.',
    notes: ['Bergamot', 'Neroli', 'White Cedar', 'Musk'],
    badge: 'new', rating: 4, reviews: 44, inStock: true,
    longevity: '4-6 hrs', sillage: 'Light'
  },
  {
    id: 'black-saffron', name: 'Black Saffron', category: 'For Him',
    collection: 'limited',
    size: '50ml Extrait', price: 65000, oldPrice: 90000,
    img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
    desc: 'Ultra-rare black saffron from Kashmir aged for one year before blending. A perfume of extraordinary complexity and depth.',
    notes: ['Black Saffron', 'Aged Oud', 'Leather', 'Frankincense'],
    badge: 'limited', rating: 5, reviews: 29, inStock: false,
    longevity: '16+ hrs', sillage: 'Intense'
  }
];

// ============================================================
// STATE
// ============================================================
let filteredProducts = [...ALL_PRODUCTS];
let activeCategory = 'all';
let activeCollection = 'all';
let sortOrder = 'featured';
let viewMode = 'grid';
let priceMax = 120000;
let wishlist = JSON.parse(localStorage.getItem('eescents_wishlist') || '[]');
let quickViewProduct = null;
let currentPage = 1;
const ITEMS_PER_PAGE = 6;

// ============================================================
// RENDER PRODUCTS + PAGINATION
// ============================================================
function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn arrow" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled style="opacity:0.3;pointer-events:none;"' : ''}>
    <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
  </button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7 && i > 3 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
      if (i === 4 || i === totalPages - 2) html += `<span style="color:var(--white-dim);padding:0 0.3rem;">...</span>`;
      continue;
    }
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  html += `<button class="page-btn arrow" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled style="opacity:0.3;pointer-events:none;"' : ''}>
    <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
  </button>`;

  container.innerHTML = html;
}

function goToPage(page) {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderProducts();
  window.scrollTo({ top: document.getElementById('shop-grid')?.offsetTop - 120 || 0, behavior: 'smooth' });
}

function renderProducts() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageProducts = filteredProducts.slice(start, end);

  document.getElementById('results-count').innerHTML =
    `Showing <strong>${start + 1}–${Math.min(end, filteredProducts.length)}</strong> of <strong>${filteredProducts.length}</strong> fragrances`;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `<div class="no-results">
      <h3>No fragrances found</h3>
      <p>Try adjusting your filters or browse all collections.</p>
      <button onclick="resetFilters()" class="btn btn-outline" style="margin-top:1.5rem;"><span>Clear All Filters</span></button>
    </div>`;
    renderPagination();
    return;
  }

  grid.innerHTML = pageProducts.map(p => {
    const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    const inWishlist = wishlist.includes(p.id);
    const stars = Array.from({length: 5}, (_, i) =>
      `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" ${i < p.rating ? 'fill="#FFB800"' : 'fill="none" stroke="#FFB800" stroke-width="1"'}/></svg>`
    ).join('');

    const badgeMap = {
      sale: '<span class="shop-badge badge-sale">Sale</span>',
      new: '<span class="shop-badge badge-new-in">New In</span>',
      limited: '<span class="shop-badge badge-limited">Limited</span>',
      soldout: '<span class="shop-badge badge-soldout">Sold Out</span>'
    };

    return `
      <div class="shop-product-card" data-id="${p.id}">
        <div class="shop-card-badges">
          ${!p.inStock ? badgeMap.soldout : (p.badge ? badgeMap[p.badge] : '')}
        </div>
        <button class="wishlist-btn ${inWishlist ? 'liked' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Add to wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="shop-card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <button class="quick-view-btn" onclick="openQuickView('${p.id}', event)">Quick View</button>
        </div>
        <div class="shop-card-info">
          <div class="shop-card-category">${p.category}</div>
          <h3 class="shop-card-name">${p.name}</h3>
          <div class="shop-card-size">${p.size}</div>
          <p class="shop-card-desc">${p.desc}</p>
          <div class="shop-card-notes">
            ${p.notes.slice(0,3).map(n => `<span class="note-tag">${n}</span>`).join('')}
          </div>
          <div class="shop-card-rating">
            ${stars}
            <span class="rating-score">${p.rating}.0 (${p.reviews})</span>
          </div>
          <div class="shop-card-price-row">
            <span class="shop-card-price">${formatNaira(p.price)}</span>
            ${p.oldPrice ? `<span class="shop-card-old-price">${formatNaira(p.oldPrice)}</span>` : ''}
            ${discount ? `<span class="shop-card-discount">${discount}% off</span>` : ''}
          </div>
        </div>
        <div class="shop-card-actions">
          <button class="shop-add-cart ${!p.inStock ? 'sold-out' : ''}"
            onclick="handleAddToCart('${p.id}', event)">
            <span>${p.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  renderPagination();
}

// ============================================================
// FILTER + SORT
// ============================================================
function applyFilters() {
  currentPage = 1;
  filteredProducts = ALL_PRODUCTS.filter(p => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const colMatch = activeCollection === 'all' || p.collection === activeCollection;
    const priceMatch = p.price <= priceMax;
    const inStockEl = document.getElementById('filter-instock');
    const stockMatch = !inStockEl?.checked || p.inStock;
    return catMatch && colMatch && priceMatch && stockMatch;
  });

  if (sortOrder === 'price-asc') filteredProducts.sort((a,b) => a.price - b.price);
  else if (sortOrder === 'price-desc') filteredProducts.sort((a,b) => b.price - a.price);
  else if (sortOrder === 'rating') filteredProducts.sort((a,b) => b.rating - a.rating);
  else if (sortOrder === 'newest') filteredProducts.sort((a,b) => (b.badge === 'new') - (a.badge === 'new'));

  renderProducts();
  updateActiveStates();
}

function updateActiveStates() {
  document.querySelectorAll('.filter-tag[data-cat]').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === activeCategory);
  });
  document.querySelectorAll('.collection-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.col === activeCollection);
  });
}

function setCategory(cat) {
  activeCategory = cat;
  applyFilters();
}

function setCollection(col) {
  activeCollection = col;
  applyFilters();
}

function resetFilters() {
  activeCategory = 'all';
  activeCollection = 'all';
  sortOrder = 'featured';
  priceMax = 120000;
  const priceSlider = document.getElementById('price-range');
  if (priceSlider) { priceSlider.value = 120000; updatePriceLabel(120000); }
  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.value = 'featured';
  const inStockEl = document.getElementById('filter-instock');
  if (inStockEl) inStockEl.checked = false;
  applyFilters();
}

function updatePriceLabel(val) {
  const label = document.getElementById('price-max-label');
  if (label) label.textContent = formatNaira(val);
}

// ============================================================
// CART
// ============================================================
function handleAddToCart(id, e) {
  if (e) e.stopPropagation();
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (!p || !p.inStock) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size: p.size, qty: 1 });
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast(`${p.name} added to cart`);
  setTimeout(openCart, 300);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.classList.toggle('show', count > 0);
  });
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  if (!container) return;
  container.innerHTML = '';
  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (footerEl) footerEl.style.display = 'block';
  cart.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatNaira(item.price * item.qty)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">Remove</button>`;
    container.appendChild(el);
  });
  const total = getCartTotal();
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const totalEl = document.getElementById('cart-total-val');
  const freeNote = document.getElementById('free-delivery-note');
  if (subtotalEl) subtotalEl.textContent = formatNaira(total);
  if (totalEl) totalEl.textContent = formatNaira(total);
  if (freeNote) freeNote.style.display = total >= 50000 ? 'block' : 'none';
}

function removeFromCart(i) { cart.splice(i,1); saveCart(); updateCartCount(); renderCartItems(); }
function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i,1);
  saveCart(); updateCartCount(); renderCartItems();
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// CHECKOUT
// ============================================================
function openCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty'); return; }
  closeCart();
  renderCheckoutModal();
  document.getElementById('checkout-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCheckout() {
  document.getElementById('checkout-modal')?.classList.remove('show');
  document.body.style.overflow = '';
}
function renderCheckoutModal() {
  const list = document.getElementById('modal-order-list');
  const total = getCartTotal();
  const freeDelivery = total >= 50000;
  if (!list) return;
  list.innerHTML = cart.map(i => `
    <div class="modal-order-item">
      <span class="modal-order-item-name">${i.name} x${i.qty}</span>
      <span class="modal-order-item-price">${formatNaira(i.price * i.qty)}</span>
    </div>`).join('') + `
    <div class="modal-order-item" style="border-top:1px solid var(--border);margin-top:0.5rem;padding-top:0.8rem;">
      <span style="font-weight:600;">Delivery</span>
      <span style="color:${freeDelivery ? 'var(--gold)' : 'var(--white-dim)'};">${freeDelivery ? 'FREE' : formatNaira(3000)}</span>
    </div>
    <div class="modal-order-item" style="font-size:1rem;font-weight:600;">
      <span>Total</span>
      <span style="color:var(--gold);">${formatNaira(total + (freeDelivery ? 0 : 3000))}</span>
    </div>`;
}
function submitOrder() {
  const name = document.getElementById('checkout-name')?.value?.trim();
  const phone = document.getElementById('checkout-phone')?.value?.trim();
  const location = document.getElementById('checkout-location')?.value?.trim();
  const address = document.getElementById('checkout-address')?.value?.trim();
  if (!name || !phone || !location || !address) { showToast('Please fill in all required fields'); return; }
  const total = getCartTotal();
  const freeDelivery = total >= 50000;
  const grand = total + (freeDelivery ? 0 : 3000);
  const orderText = cart.map(i => `• ${i.name} x${i.qty} — ${formatNaira(i.price * i.qty)}`).join('\n');
  const msg = `*NEW ORDER — EESCENTS*\n\n*Customer Details*\nName: ${name}\nPhone: ${phone}\nLocation: ${location}\nAddress: ${address}\n\n*Order Summary*\n${orderText}\n\nDelivery: ${freeDelivery ? 'FREE' : formatNaira(3000)}\n*TOTAL: ${formatNaira(grand)}*\n\nPayment sent to:\nMoniepoint — 9031538922 (David Isaac Akpan)`;
  window.open(`https://wa.me/2349031538922?text=${encodeURIComponent(msg)}`, '_blank');
  cart = []; saveCart(); updateCartCount(); renderCartItems(); closeCheckout();
  showToast('Order submitted! We will contact you immediately.');
}

// ============================================================
// QUICK VIEW
// ============================================================
function openQuickView(id, e) {
  if (e) e.stopPropagation();
  const p = ALL_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  quickViewProduct = p;
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stars = Array.from({length: 5}, (_, i) =>
    `<svg viewBox="0 0 24 24" style="width:13px;height:13px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" ${i < p.rating ? 'fill="#FFB800"' : 'fill="none" stroke="#FFB800" stroke-width="1"'}/></svg>`
  ).join('');

  document.getElementById('qv-img').src = p.img;
  document.getElementById('qv-img').alt = p.name;
  document.getElementById('qv-category').textContent = p.category;
  document.getElementById('qv-name').textContent = p.name;
  document.getElementById('qv-size').textContent = p.size;
  document.getElementById('qv-desc').textContent = p.desc;
  document.getElementById('qv-notes').innerHTML = p.notes.map(n => `<span class="quickview-note">${n}</span>`).join('');
  document.getElementById('qv-rating').innerHTML = stars + `<span style="font-size:0.72rem;color:var(--white-dim);margin-left:4px;">${p.rating}.0 (${p.reviews} reviews)</span>`;
  document.getElementById('qv-price').textContent = formatNaira(p.price);
  document.getElementById('qv-old-price').textContent = p.oldPrice ? formatNaira(p.oldPrice) : '';
  document.getElementById('qv-discount').textContent = discount ? `-${discount}%` : '';
  document.getElementById('qv-longevity').textContent = p.longevity;
  document.getElementById('qv-sillage').textContent = p.sillage;

  const addBtn = document.getElementById('qv-add-btn');
  if (p.inStock) {
    addBtn.textContent = 'Add to Cart';
    addBtn.className = 'btn btn-gold btn-arrow';
    addBtn.onclick = () => { handleAddToCart(p.id); closeQuickView(); };
  } else {
    addBtn.textContent = 'Out of Stock';
    addBtn.className = 'btn btn-ghost';
    addBtn.onclick = null;
  }

  document.getElementById('quickview-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeQuickView() {
  document.getElementById('quickview-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// WISHLIST
// ============================================================
function toggleWishlist(id, e) {
  if (e) e.stopPropagation();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    showToast('Added to wishlist');
  }
  localStorage.setItem('eescents_wishlist', JSON.stringify(wishlist));
  const btn = document.querySelector(`.shop-product-card[data-id="${id}"] .wishlist-btn`);
  if (btn) btn.classList.toggle('liked', wishlist.includes(id));
}

// ============================================================
// VIEW MODE
// ============================================================
function setViewMode(mode) {
  viewMode = mode;
  const grid = document.getElementById('shop-grid');
  grid.className = 'shop-grid';
  if (mode === 'list') grid.classList.add('list-view');
  else if (mode === 'two') grid.classList.add('two-col');
  document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === mode));
}

// ============================================================
// MOBILE FILTER
// ============================================================
function openMobileFilter() {
  document.getElementById('mobile-filter-drawer').classList.add('open');
  document.getElementById('mobile-filter-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMobileFilter() {
  document.getElementById('mobile-filter-drawer').classList.remove('open');
  document.getElementById('mobile-filter-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast'; toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================================
// REVEAL ANIMATIONS
// ============================================================
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  renderCartItems();
  initReveal();

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', e => {
    sortOrder = e.target.value; applyFilters();
  });

  // Price range
  document.getElementById('price-range')?.addEventListener('input', e => {
    priceMax = +e.target.value; updatePriceLabel(priceMax); applyFilters();
  });

  // In stock filter
  document.getElementById('filter-instock')?.addEventListener('change', applyFilters);

  // Cart
  document.querySelectorAll('.cart-btn').forEach(b => b.addEventListener('click', openCart));
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-checkout-btn')?.addEventListener('click', openCheckout);

  // Checkout
  document.getElementById('modal-close')?.addEventListener('click', closeCheckout);
  document.getElementById('submit-order-btn')?.addEventListener('click', submitOrder);
  document.getElementById('checkout-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('checkout-modal')) closeCheckout();
  });

  // Quick view close
  document.getElementById('quickview-close')?.addEventListener('click', closeQuickView);
  document.getElementById('quickview-overlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('quickview-overlay')) closeQuickView();
  });

  // Back to top
  window.addEventListener('scroll', () => {
    document.getElementById('back-to-top')?.classList.toggle('show', window.scrollY > 400);
  });
  document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Mobile filter
  document.getElementById('filter-toggle-btn')?.addEventListener('click', openMobileFilter);
  document.getElementById('mobile-filter-close')?.addEventListener('click', closeMobileFilter);
  document.getElementById('mobile-filter-overlay')?.addEventListener('click', closeMobileFilter);
});