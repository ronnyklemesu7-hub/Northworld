export function initBooking() {
  const modal = document.getElementById('bookingModal');
  const openBtns = [document.getElementById('openBooking'), document.getElementById('floatingBook')];
  const closeBtn = document.getElementById('closeBooking');
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');

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
  closeBtn.addEventListener('click', close);
  modal.querySelector('.modal-overlay').addEventListener('click', close);

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

  const today = new Date().toISOString().split('T')[0];
  form.querySelector('[name="checkin"]').min = today;
  form.querySelector('[name="checkout"]').min = today;
}
