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
}
if (config.instagramUrl) {
  document.querySelectorAll('[data-instagram-link], [data-instagram-footer]').forEach(link => {
    link.hidden = false; link.href = config.instagramUrl; link.target = '_blank'; link.rel = 'noopener';
  });
  document.querySelector('[data-access-note]').textContent = 'Acompanhe os bastidores, conteúdos e a abertura dos primeiros acessos.';
}
document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details[open]').forEach(other => { if (other !== detail) other.open = false; });
}));
