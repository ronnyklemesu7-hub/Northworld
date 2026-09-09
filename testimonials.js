import { testimonials } from './data.js';

export function initTestimonials() {
  const slidesEl = document.getElementById('testimonialSlides');
  const dotsEl = document.getElementById('testimonialDots');
  const prev = document.getElementById('prevTestimonial');
  const next = document.getElementById('nextTestimonial');

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

  prev.addEventListener('click', () => { current = (current - 1 + testimonials.length) % testimonials.length; update(); });
  next.addEventListener('click', () => { current = (current + 1) % testimonials.length; update(); });
  dotsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      current = parseInt(e.target.dataset.i);
      update();
    }
  });

  setInterval(() => { current = (current + 1) % testimonials.length; update(); }, 6000);
}
