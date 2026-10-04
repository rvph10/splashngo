// Scroll-triggered animations replacing Framer Motion.
//
//   [data-reveal]      fade + slide up once when it enters the viewport (CSS in global.css)
//   [data-words]       heading words blur in one by one once ≥50 % visible
//   [data-zoom]        image scales 1.1 → 1 while in view (reverses when it leaves)
//   [data-count]       number counts up from 0 once visible, e.g. data-count="1.2" data-suffix="k+"
//   [data-parallax]    moves at half the scroll speed

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function observe(selector: string, options: IntersectionObserverInit, once: boolean, onEnter: (el: HTMLElement) => void = (el) => el.classList.add('is-in')) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        onEnter(el);
        if (once) io.unobserve(el);
      } else if (!once) {
        el.classList.remove('is-in');
      }
    }
  }, options);
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => io.observe(el));
}

observe('[data-reveal]', { threshold: 0 }, true);
observe('[data-words]', { threshold: 0.5 }, true);
observe('[data-zoom]', { threshold: 0 }, false);
if (!reduceMotion) {
  // Markup holds the final value (works without JS); start the counters from zero.
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const decimals = (el.dataset.count!.split('.')[1] ?? '').length;
    el.textContent = (0).toFixed(decimals) + (el.dataset.suffix ?? '');
  });
  observe('[data-count]', { threshold: 0.5 }, true, countUp);
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = (el.dataset.count!.split('.')[1] ?? '').length;
  const suffix = el.dataset.suffix ?? '';
  const duration = 2000;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const parallax = document.querySelectorAll<HTMLElement>('[data-parallax]');
if (parallax.length && !reduceMotion) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    parallax.forEach((el) => {
      if (y < el.offsetHeight * 1.5) el.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
    });
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
}
