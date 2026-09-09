// Northwold Hotel - Consolidated Scripts
// This file merges data, booking, and testimonials to work without modules for local file access.

const amenities = [
  { icon: 'waves', title: '24/7 Pool', desc: 'An azure oasis available around the clock with a dedicated kid-friendly safe zone, perfect for a midnight dip or sunny afternoon.' },
  { icon: 'sparkles', title: 'Events & Weddings', desc: 'Versatile, sophisticated event spaces—the perfect backdrop for corporate conferences, gala dinners, and unforgettable weddings.' },
  { icon: 'utensils', title: 'Restaurant & Bar', desc: 'A fusion of local Ghanaian flavors and international cuisine. Our chefs deliver a world-class dining experience with the freshest ingredients.' },
  { icon: 'wifi', title: 'High-Speed Fiber', desc: 'Stay seamlessly connected with enterprise-grade internet throughout the entire property—designed for business and leisure travelers alike.' },
  { icon: 'cpu', title: 'High-Tech Suites', desc: 'Smart climate control, ergonomic workspaces, and premium technology in every spacious, tastefully decorated suite.' },
  { icon: 'shield-check', title: '24/7 Security', desc: 'Your safety is paramount. Around-the-clock CCTV surveillance and a professional security team provide complete peace of mind.' }
];

const suites = [
  { name: 'Standard Suite', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', desc: 'Cozy and impeccably clean, ideal for the solo traveler.', features: ['Queen Bed','Smart TV','Workspace'] },
  { name: 'Executive Suite', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', desc: 'Spacious comfort meets sophisticated design.', features: ['King Bed','Lounge Area','Fast Wi-Fi'] },
  { name: 'Luxury Suite', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', desc: 'The pinnacle of Northwold elegance and serenity.', features: ['King Bed','Pool View','Premium Bath'] }
];

const testimonials = [
  { name: 'Owusu Kenneth', role: 'Business Traveler', rating: 5, text: 'The rooms are spacious, tastefully decorated, and impeccably clean. The attention to detail is evident in every aspect, from the plush bedding to the modern amenities provided.' },
  { name: 'Felix Owusu Agyei', role: 'Couple', rating: 5, text: 'The staff members are the epitome of professionalism and genuine hospitality. From the moment I walked in, I felt welcomed and cared for. They went above and beyond.' },
  { name: 'Harriet Yeboah', role: 'Wedding Guest', rating: 5, text: 'Best hotel for a wedding. You made my day memorable. Thank you so much—every detail was simply perfect.' },
  { name: 'Edward Brefo', role: 'Holiday', rating: 5, text: 'The place is serene and calm. The rooms are spacious and the beds are comfortable. A cool place to enjoy your holidays and relax.' },
  { name: 'Sampson Kudalor', role: 'International Guest', rating: 5, text: 'I was amazed by how the staff treat people and how clean and comfortable the rooms are. I will recommend this place to anyone wanting an amazing rest.' },
  { name: 'Bervelyn Asantewaa', role: 'Solo Business', rating: 5, text: 'The location is perfect for both leisure and business travelers. Conveniently situated near attractions, yet tucked away enough to provide a peaceful atmosphere.' },
  { name: 'Faustina Gail Thompson', role: 'Friends', rating: 5, text: 'It\'s always a great luxurious feeling anytime I visit Northwold hotel. Very safe environment with affordable food and drinks.' }
];

function renderAmenities() {
  const grid = document.getElementById('amenitiesGrid');
  if (!grid) return;
  grid.innerHTML = amenities.map(a => `
    <div class="amenity-card reveal">
      <div class="amenity-icon"><i data-lucide="${a.icon}" class="w-7 h-7 text-gold"></i></div>
      <h3 class="font-serif text-2xl text-navy mb-3">${a.title}</h3>
      <p class="text-navy/70 leading-relaxed">${a.desc}</p>
    </div>
  `).join('');
}

function renderSuites() {
  const grid = document.getElementById('suitesGrid');
  if (!grid) return;
  grid.innerHTML = suites.map(s => `
    <div class="suite-card reveal">
      <div class="overflow-hidden h-64"><img src="${s.img}" class="w-full h-full object-cover" alt="${s.name}"></div>
      <div class="p-6">
        <h3 class="font-serif text-2xl text-navy mb-2">${s.name}</h3>
        <p class="text-navy/70 text-sm mb-4">${s.desc}</p>
        <div class="flex flex-wrap gap-2 mb-5">
          ${s.features.map(f => `<span class="text-xs bg-cream px-3 py-1 rounded-full text-navy/80">${f}</span>`).join('')}
        </div>
        <button onclick="document.getElementById('openBooking').click()" class="w-full bg-navy text-gold py-3 rounded-full text-sm font-semibold hover:bg-gold hover:text-navy transition">Reserve</button>
      </div>
    </div>
  `).join('');
}

function initBooking() {
  const modal = document.getElementById('bookingModal');
  const openBtns = [document.getElementById('openBooking'), document.getElementById('floatingBook')];
  const closeBtn = document.getElementById('closeBooking');
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');

  if (!modal || !form) return;

  const open = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      form.classList.remove('hidden');
      success.classList.add('hidden');
      form.reset();
    }, 300);
  };

  openBtns.forEach(b => b && b.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  
  const overlay = modal.querySelector('.modal-overlay');
  if (overlay) overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log('Booking submitted:', data);
    form.classList.add('hidden');
    success.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
    setTimeout(close, 4000);
  });

  const checkinInput = form.querySelector('[name="checkin"]');
  const checkoutInput = form.querySelector('[name="checkout"]');
  const today = new Date().toISOString().split('T')[0];
  if (checkinInput) checkinInput.min = today;
  if (checkoutInput) checkoutInput.min = today;
}

function initTestimonials() {
  const slidesEl = document.getElementById('testimonialSlides');
  const dotsEl = document.getElementById('testimonialDots');
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');

  if (!slidesEl || !dotsEl) return;

  let current = 0;
  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  slidesEl.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <div class="text-gold text-2xl mb-4">${stars(t.rating)}</div>
        <p class="font-serif text-2xl md:text-3xl italic font-light leading-relaxed text-white/90">"${t.text}"</p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <div class="w-14 h-14 rounded-full bg-gold flex items-center justify-center font-serif text-navy text-xl font-bold">
            ${t.name.charAt(0)}
          </div>
          <div class="text-left">
            <div class="font-semibold text-gold">${t.name}</div>
            <div class="text-sm text-white/60">${t.role}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dotsEl.innerHTML = testimonials.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" data-i="${i}"></div>`).join('');

  const update = () => {
    slidesEl.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
  };

  if (prev) prev.addEventListener('click', () => { current = (current - 1 + testimonials.length) % testimonials.length; update(); });
  if (next) next.addEventListener('click', () => { current = (current + 1) % testimonials.length; update(); });
  
  dotsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      current = parseInt(e.target.dataset.i);
      update();
    }
  });

  setInterval(() => { current = (current + 1) % testimonials.length; update(); }, 6000);
}

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  // Safety fallback: if some elements aren't visible after 2 seconds, force them
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 2000);
}

function initHeroAnimations() {
  if (!window.gsap) return;
  const tl = gsap.timeline();
  tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8 })
    .from('.hero-title', { opacity: 0, y: 40, duration: 1 }, '-=0.4')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');
}

// Initialize everything
window.addEventListener('load', () => {
  renderAmenities();
  renderSuites();
  initNavbar();
  initReveal();
  initBooking();
  initTestimonials();
  initHeroAnimations();
  if (window.lucide) window.lucide.createIcons();
});
