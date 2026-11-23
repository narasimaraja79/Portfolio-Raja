const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });

// highlight current section in nav
const links = [...nav.querySelectorAll('a')];
const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting && map.has(en.target.id)) {
      links.forEach(l => l.classList.remove('active'));
      map.get(en.target.id).classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
