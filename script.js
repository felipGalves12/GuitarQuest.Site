const config = window.GUITARQUEST_SITE || {};
const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');

menu?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open'); menu?.setAttribute('aria-expanded', 'false');
}));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 24), { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
  const title = carousel.querySelector('[data-carousel-title]');
  const description = carousel.querySelector('[data-carousel-description]');
  const number = carousel.querySelector('[data-slide-number]');
  let current = 0, timer, startX = 0;

  const showSlide = (index, userInitiated = false) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
      dot.tabIndex = active ? 0 : -1;
    });
    number.textContent = String(current + 1).padStart(2, '0');
    title.textContent = slides[current].dataset.title;
    description.textContent = slides[current].dataset.description;
    if (userInitiated) restartCarousel();
  };
  const restartCarousel = () => {
    clearInterval(timer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => showSlide(current + 1), 7000);
  };

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => showSlide(current - 1, true));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => showSlide(current + 1, true));
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.carouselDot), true)));
  viewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1, true); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1, true); }
  });
  viewport.addEventListener('pointerdown', event => { startX = event.clientX; });
  viewport.addEventListener('pointerup', event => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 55) showSlide(current + (distance < 0 ? 1 : -1), true);
  });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restartCarousel);
  carousel.addEventListener('focusin', () => clearInterval(timer));
  carousel.addEventListener('focusout', restartCarousel);
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : restartCarousel());
  showSlide(0);
  restartCarousel();
}

const demoStates = [
  { badge: 'CONTEÚDO ATUAL', title: 'Quais notas formam o acorde de C maior?', mastery: 72, note: 'Bom progresso. Uma revisão será agendada.' },
  { badge: 'ANÁLISE DE APRENDIZADO', title: 'Precisão, tempo e erros recentes entram no cálculo.', mastery: 58, note: 'A habilidade precisa de mais contato.' },
  { badge: 'REPESCAGEM PERSONALIZADA', title: 'Encontre a terça de C maior no instrumento.', mastery: 66, note: 'Revisão inserida entre conteúdos novos.' }
];
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.step), state = demoStates[index];
  document.querySelectorAll('[data-step]').forEach((item, i) => { item.classList.toggle('active', i === index); item.setAttribute('aria-selected', String(i === index)); });
  const card = document.querySelector('[data-demo-card]');
  card.classList.add('switching');
  setTimeout(() => {
    card.querySelector('.demo-badge').textContent = state.badge;
    card.querySelector('h3').textContent = state.title;
    document.querySelector('[data-mastery]').style.width = `${state.mastery}%`;
    document.querySelector('[data-mastery-label]').textContent = `${state.mastery}%`;
    document.querySelector('[data-master-note]').textContent = state.note;
    card.classList.remove('switching');
  }, 180);
}));

if (config.productUrl) {
  const product = document.querySelector('[data-product-link]');
  product.href = config.productUrl; product.target = '_blank'; product.rel = 'noopener'; product.firstChild.textContent = 'Testar o MVP ';
  document.querySelectorAll('[data-plan-link]').forEach(link => {
    const url = new URL(config.productUrl);
    url.searchParams.set('plan', link.dataset.planLink);
    link.href = url.toString();
  });
}
if (config.proPrice) document.querySelector('[data-pro-price]').textContent = config.proPrice;
if (config.instagramUrl) {
  document.querySelectorAll('[data-instagram-link], [data-instagram-footer]').forEach(link => {
    link.hidden = false; link.href = config.instagramUrl; link.target = '_blank'; link.rel = 'noopener';
  });
}
if (config.productUrl && config.instagramUrl) document.querySelector('[data-access-note]').textContent = 'Teste o MVP e acompanhe conteúdos, bastidores e as próximas evoluções.';
else if (config.productUrl) document.querySelector('[data-access-note]').textContent = 'O MVP já está disponível em acesso antecipado.';
else if (config.instagramUrl) document.querySelector('[data-access-note]').textContent = 'Acompanhe conteúdos, bastidores e a abertura dos próximos acessos.';
document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details[open]').forEach(other => { if (other !== detail) other.open = false; });
}));
