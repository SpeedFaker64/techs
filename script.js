/* ===== Datos ===== */
/* Compañías ordenadas por el año de su primera consola */
const combatientes = [
  { nombre:'Atari',       anio:1977, color:'var(--atari)',   t:'#fff', mascota:'🕹️', personaje:'Pong y Pac-Man',  consola:'Atari 2600',
    dato:'Fundada en 1972. Su Atari 2600 (1977) popularizó los cartuchos intercambiables.', ir:'atari2600' },
  { nombre:'Nintendo',    anio:1983, color:'var(--nintendo)',t:'#fff', mascota:'🍄', personaje:'Mario',           consola:'Famicom · NES · SNES · N64 · Switch',
    dato:'Fundada en 1889 como fabricante de cartas. Entró en las consolas con la Famicom (1983).', ir:'nes' },
  { nombre:'Sega',        anio:1983, color:'var(--sega)',    t:'#fff', mascota:'🦔', personaje:'Sonic',           consola:'SG-1000 · Mega Drive · Saturn · Dreamcast',
    dato:'Fabricó consolas de 1983 (SG-1000) a 2001 y hoy desarrolla juegos para varias plataformas.', ir:'genesis' },
  { nombre:'NEC',         anio:1987, color:'var(--nec)',     t:'#fff', mascota:'🦴', personaje:'Bonk',            consola:'PC Engine / TurboGrafx-16',
    dato:'Su PC Engine salió en Japón en 1987 y se vendió como TurboGrafx-16 en EE. UU.', ir:'pcengine' },
  { nombre:'SNK',         anio:1990, color:'var(--snk)',     t:'#fff', mascota:'🥊', personaje:'Terry Bogard',    consola:'Neo Geo',
    dato:'Su Neo Geo salió en 1990 como sistema arcade y doméstico.', ir:'neogeo' },
  { nombre:'PlayStation', anio:1994, color:'var(--sony)',    t:'#fff', mascota:'🦊', personaje:'Crash Bandicoot', consola:'PS1 a PS5',
    dato:'Sony lanzó la primera PlayStation en Japón en diciembre de 1994.', ir:'ps1' },
  { nombre:'Xbox',        anio:2001, color:'var(--xbox)',    t:'#fff', mascota:'🛡️', personaje:'Master Chief',    consola:'Xbox · 360 · One · Series',
    dato:'Microsoft lanzó la primera Xbox en 2001.', ir:'xbox' }
];

/* [nombre, millones, color, etiqueta opcional]
   Switch, Switch 2 y PS5: datos oficiales de Nintendo y Sony a 30 de junio de 2026.
   El resto son cifras históricas aproximadas. */
const ventas = [
  ['PlayStation 2', 160, 'var(--sony)', '155–160 M'], ['Nintendo Switch', 156.6, 'var(--nintendo)'],
  ['PlayStation 4', 117, 'var(--sony)'], ['PlayStation', 102, 'var(--sony)'], ['Wii', 101, 'var(--nintendo)'],
  ['PlayStation 5', 95.3, 'var(--sony)'], ['PlayStation 3', 87, 'var(--sony)'], ['Xbox 360', 84, 'var(--xbox)'],
  ['NES', 62, 'var(--nintendo)'], ['SNES', 49, 'var(--nintendo)'], ['Nintendo 64', 33, 'var(--nintendo)'],
  ['Mega Drive', 30, 'var(--sega)'], ['Xbox', 24, 'var(--xbox)'], ['Switch 2', 23.7, 'var(--nintendo)'],
  ['GameCube', 22, 'var(--nintendo)'], ['Saturn', 9, 'var(--sega)'], ['Dreamcast', 9, 'var(--sega)']
].sort((a, b) => b[1] - a[1]);

/* Colores de cada compañía para la franja de cada momento (sobrios, salvo Sega azul, Nintendo rojo y Xbox verde) */
const empresas = {
  atari:['Atari','#c8651b'], nintendo:['Nintendo','#d71920'], sega:['Sega','#0b5ed7'], sony:['Sony','#6a4cc4'],
  microsoft:['Microsoft','#16912a'], nec:['NEC','#c9971c'], snk:['SNK','#8a5a2b'], magnavox:['Magnavox','#6b7a99'],
  fairchild:['Fairchild','#7d8591'], mattel:['Mattel','#a8326a'], coleco:['Coleco','#1f8a8a'],
  philips:['Philips','#3d8fb5'], '3do':['3DO','#8f8a2f']
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ===== Tarjetas de compañías ===== */
$('#grid').innerHTML = combatientes.map(c => `
  <article class="card" style="--c:${c.color}">
    <div class="mascot" role="img" aria-label="Mascota de ${c.nombre}">${c.mascota}</div>
    <h3>${c.nombre}</h3>
    <span class="tag" style="color:${c.t}">${c.personaje}</span>
    <div class="meta">${c.consola}</div>
    <p><strong>Primera consola: ${c.anio}.</strong> ${c.dato}</p>
    <a class="btn" style="color:${c.t}" href="#${c.ir}">Ver en la historia</a>
  </article>`).join('');

/* ===== Franja de colores y etiquetas de compañías en cada momento ===== */
$$('.evento[data-cos]').forEach(ev => {
  const lista = ev.dataset.cos.split(',').map(k => empresas[k]).filter(Boolean);
  if (!lista.length) return;
  const n = lista.length;
  const trozos = n === 1
    ? `${lista[0][1]} 0 100%`
    : lista.map(([, c], i) => `${c} ${(i * 100) / n}% ${((i + 1) * 100) / n}%`).join(',');
  ev.style.setProperty('--gv', `linear-gradient(to bottom,${trozos})`);
  const chips = lista.map(([nombre, c]) => `<span style="--c:${c}">${nombre}</span>`).join('');
  $('.ev-top', ev).insertAdjacentHTML('afterend', `<div class="cos">${chips}</div>`);
});

/* ===== Gráfico de ventas ===== */
const maxVentas = Math.max(...ventas.map(v => v[1]));
$('#chart').innerHTML = ventas.map(([n, v, c, etiqueta]) => `
  <div class="row" style="--c:${c}">
    <span>${n}</span>
    <div class="bar"><i data-w="${(v / maxVentas) * 100}"></i></div>
    <em>${etiqueta || String(v).replace('.', ',') + ' M'}</em>
  </div>`).join('');

new IntersectionObserver((entradas, obs) => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    $$('.bar i', e.target).forEach(i => { i.style.width = i.dataset.w + '%'; });
    obs.unobserve(e.target);
  });
}, { threshold: .2 }).observe($('#chart'));

/* ===== Flechas de la fila de botones ===== */
const franja = $('#strip');
$('#stripPrev').addEventListener('click', () => franja.scrollBy({ left: -420, behavior: 'smooth' }));
$('#stripNext').addEventListener('click', () => franja.scrollBy({ left: 420, behavior: 'smooth' }));

/* ===== Botones y enlaces: bajan hasta el momento indicado ===== */
function destacar(id) {
  const el = document.getElementById(id);
  if (!el || !el.classList.contains('evento')) return;
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const destino = document.getElementById(id);
  if (!destino) return;
  e.preventDefault();
  destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  try { history.replaceState(null, '', '#' + id); } catch (_) { /* vista previa sin historial */ }
  destacar(id);
});
if (location.hash) destacar(location.hash.slice(1));

/* ===== Navegación activa, barra de progreso y botón de subir ===== */
const enlaces = $$('#navlinks a');
const destinos = enlaces.map(l => document.getElementById(l.getAttribute('href').slice(1)));
const barra = $('#progress'), arriba = $('#toTop');

function alDesplazar() {
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  barra.style.width = (total > 0 ? (h.scrollTop / total) * 100 : 0) + '%';
  arriba.classList.toggle('show', h.scrollTop > 600);

  const linea = innerHeight * 0.35;
  let activo = -1;
  destinos.forEach((d, i) => { if (d && d.getBoundingClientRect().top <= linea) activo = i; });
  enlaces.forEach((l, i) => l.classList.toggle('active', i === activo));
}
addEventListener('scroll', alDesplazar, { passive: true });
alDesplazar();