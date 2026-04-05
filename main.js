/* ============================================================
   EESCENTS — MAIN JAVASCRIPT
   Cart, Slider, Animations, Nav, Cursor, Checkout
   ============================================================ */

'use strict';

// ============================================================
// CART STATE
// ============================================================
let cart = JSON.parse(localStorage.getItem('eescents_cart') || '[]');

function saveCart() {
  localStorage.setItem('eescents_cart', JSON.stringify(cart));
}

function formatNaira(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

// ============================================================
// CART UI
// ============================================================
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

  cart.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.name}">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatNaira(item.price * item.qty)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(el);
  });

  const total = getCartTotal();
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const totalEl = document.getElementById('cart-total-val');
  const freeDelivery = document.getElementById('free-delivery-note');

  if (subtotalEl) subtotalEl.textContent = formatNaira(total);
  if (totalEl) totalEl.textContent = formatNaira(total);
  if (freeDelivery) {
    freeDelivery.style.display = total >= 50000 ? 'block' : 'none';
  }
}

function addToCart(id, name, price, img, size) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, img, size, qty: 1 });
  }
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast(`${name} added to cart`);
  setTimeout(() => openCart(), 400);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCartItems();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartCount();
  renderCartItems();
}

function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// CHECKOUT MODAL
// ============================================================
function openCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  closeCart();
  renderCheckoutModal();
  document.getElementById('checkout-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('show');
  document.body.style.overflow = '';
}

function renderCheckoutModal() {
  const orderList = document.getElementById('modal-order-list');
  const total = getCartTotal();
  const deliveryFree = total >= 50000;

  if (orderList) {
    orderList.innerHTML = cart.map(item => `
      <div class="modal-order-item">
        <span class="modal-order-item-name">${item.name} x${item.qty}</span>
        <span class="modal-order-item-price">${formatNaira(item.price * item.qty)}</span>
      </div>
    `).join('');
    orderList.innerHTML += `
      <div class="modal-order-item" style="border-top: 1px solid var(--border); margin-top: 0.5rem; padding-top: 0.8rem;">
        <span style="font-weight:600;">Delivery</span>
        <span style="color:${deliveryFree ? 'var(--gold)' : 'var(--white-dim)'};">${deliveryFree ? 'FREE' : formatNaira(3000)}</span>
      </div>
      <div class="modal-order-item" style="font-size:1rem; font-weight:600;">
        <span>Total</span>
        <span style="color:var(--gold);">${formatNaira(total + (deliveryFree ? 0 : 3000))}</span>
      </div>
    `;
  }

  const totalVal = document.getElementById('modal-total-val');
  if (totalVal) totalVal.textContent = formatNaira(total + (deliveryFree ? 0 : 3000));
}

function submitOrder() {
  const fullname = document.getElementById('checkout-name')?.value?.trim();
  const phone = document.getElementById('checkout-phone')?.value?.trim();
  const location = document.getElementById('checkout-location')?.value?.trim();
  const address = document.getElementById('checkout-address')?.value?.trim();

  if (!fullname || !phone || !location || !address) {
    showToast('Please fill in all required fields');
    return;
  }

  const total = getCartTotal();
  const deliveryFree = total >= 50000;
  const grandTotal = total + (deliveryFree ? 0 : 3000);

  const orderText = cart.map(i => `• ${i.name} x${i.qty} — ${formatNaira(i.price * i.qty)}`).join('\n');
  const message = `*NEW ORDER — EESCENTS*\n\n` +
    `*Customer Details*\n` +
    `Name: ${fullname}\n` +
    `Phone: ${phone}\n` +
    `Location: ${location}\n` +
    `Address: ${address}\n\n` +
    `*Order Summary*\n${orderText}\n\n` +
    `Delivery: ${deliveryFree ? 'FREE' : formatNaira(3000)}\n` +
    `*TOTAL: ${formatNaira(grandTotal)}*\n\n` +
    `Payment sent to:\nMoniepoint — 9031538922 (David Isaac Akpan)`;

  const whatsappNum = '2349031538922';
  const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  // Clear cart after submission
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
  closeCheckout();
  showToast('Order submitted! We will contact you immediately.');
}

// ============================================================
// HERO SLIDER
// ============================================================
let currentSlide = 0;
let slideInterval;

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=1600&q=80',
    label: 'The Signature Collection',
    title: 'Crafted for Those<br>Who <em>Demand</em><br>Excellence',
    subtitle: 'Luxury perfumes designed to command attention and leave an unforgettable impression.',
    cta1: { text: 'Explore Collection', link: 'shop.html' },
    cta2: { text: 'Our Story', link: '#about' }
  },
  {
    img: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1600&q=80',
    label: 'New Arrivals 2025',
    title: 'Wear Your<br><em>Invisible</em><br>Crown',
    subtitle: 'Each bottle holds a story. Each spritz opens a world of rare, hand-selected ingredients.',
    cta1: { text: 'Shop New Arrivals', link: 'shop.html' },
    cta2: { text: 'View Bestsellers', link: '#collection' }
  },
  {
    img: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1600&q=80',
    label: 'Gift the Extraordinary',
    title: 'The Perfect<br>Gift of <em>Scent</em><br>and Soul',
    subtitle: 'Give someone they love a fragrance that speaks before words do. Luxurious gift packaging included.',
    cta1: { text: 'Shop Gift Sets', link: 'shop.html' },
    cta2: { text: 'Contact Us', link: '#contact' }
  }
];

function goToSlide(index) {
  const slideEls = document.querySelectorAll('.hero-slide');
  const dotEls = document.querySelectorAll('.hero-dot');

  if (!slideEls.length) return;

  slideEls[currentSlide].classList.remove('active');
  if (dotEls[currentSlide]) dotEls[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slideEls[currentSlide].classList.add('active');
  if (dotEls[currentSlide]) dotEls[currentSlide].classList.add('active');
}

function buildSlider() {
  const track = document.getElementById('hero-track');
  const dotsContainer = document.getElementById('hero-dots');
  if (!track) return;

  track.innerHTML = '';
  if (dotsContainer) dotsContainer.innerHTML = '';

  slides.forEach((slide, i) => {
    const el = document.createElement('div');
    el.className = 'hero-slide' + (i === 0 ? ' active' : '');
    el.innerHTML = `
      <div class="hero-slide-img" style="background-image:url('${slide.img}')"></div>
      <div class="hero-overlay"></div>
      <div class="hero-overlay-bottom"></div>
      <div class="hero-content">
        <div class="hero-label"><span class="label-text">${slide.label}</span></div>
        <h1 class="hero-title">${slide.title}</h1>
        <p class="hero-subtitle">${slide.subtitle}</p>
        <div class="hero-cta">
          <a href="${slide.cta1.link}" class="btn btn-gold btn-arrow"><span>${slide.cta1.text}</span></a>
          <a href="${slide.cta2.link}" class="btn btn-outline"><span>${slide.cta2.text}</span></a>
        </div>
      </div>
    `;
    track.appendChild(el);

    if (dotsContainer) {
      const dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { goToSlide(i); resetInterval(); });
      dotsContainer.appendChild(dot);
    }
  });
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

// ============================================================
// NAVBAR
// ============================================================
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileOverlay = document.getElementById('mobile-overlay');

  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('back-to-top')?.classList.toggle('show', window.scrollY > 500);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    mobileOverlay?.classList.toggle('show');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });

  mobileOverlay?.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    mobileOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
      mobileOverlay?.classList.remove('show');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .product-card, .cart-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expand'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expand'));
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================================
// REVIEW FORM
// ============================================================
function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('review-name')?.value?.trim();
  const location = document.getElementById('review-location')?.value?.trim();
  const rating = document.querySelector('input[name="rating"]:checked')?.value;
  const text = document.getElementById('review-text')?.value?.trim();

  if (!name || !location || !text || !rating) {
    showToast('Please fill in all review fields and select a rating');
    return;
  }

  showToast('Thank you for your review, ' + name + '! It will appear shortly.');
  e.target.reset();
}

// ============================================================
// NEWSLETTER
// ============================================================
function submitNewsletter(e) {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]')?.value?.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }
  showToast('Welcome to the Eescents world!');
  e.target.reset();
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================================
// STAR RATING INTERACTION
// ============================================================
function initStarRating() {
  const labels = document.querySelectorAll('.star-rating label');
  labels.forEach(label => {
    label.addEventListener('click', () => {
      labels.forEach(l => l.style.color = 'var(--white-dim)');
    });
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildSlider();
  resetInterval();
  initNav();
  initCursor();
  initReveal();
  initBackToTop();
  initStarRating();
  updateCartCount();
  renderCartItems();

  // Arrow controls
  document.getElementById('hero-next')?.addEventListener('click', () => { nextSlide(); resetInterval(); });
  document.getElementById('hero-prev')?.addEventListener('click', () => { prevSlide(); resetInterval(); });

  // Cart events
  document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', openCart));
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-checkout-btn')?.addEventListener('click', openCheckout);

  // Checkout events
  document.getElementById('modal-close')?.addEventListener('click', closeCheckout);
  document.getElementById('submit-order-btn')?.addEventListener('click', submitOrder);
  document.getElementById('checkout-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('checkout-modal')) closeCheckout();
  });

  // Review form
  document.getElementById('review-form')?.addEventListener('submit', submitReview);

  // Newsletter form
  document.getElementById('newsletter-form')?.addEventListener('submit', submitNewsletter);
});