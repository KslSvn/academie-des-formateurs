
function initCatalogue() {
  const cards = Array.from(document.querySelectorAll('.card-formation'));
  const search = document.getElementById('f-search');
  const cat = document.getElementById('f-cat');
  const format = document.getElementById('f-format');
  const duree = document.getElementById('f-duree');
  const certOnly = document.getElementById('f-cert');
  const count = document.getElementById('results-count');

  function apply() {
    const q = (search.value || '').toLowerCase().trim();
    const c = cat.value;
    const fo = format.value;
    const d = duree.value;
    const certifiantOnly = certOnly.checked;
    let visible = 0;
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const cats = card.dataset.categories.split('|');
      const cardFormat = card.dataset.format;
      const heures = card.dataset.heures;
      const certifiant = card.dataset.certifiant === '1';
      let ok = true;
      if (q && !title.includes(q)) ok = false;
      if (c && !cats.includes(c)) ok = false;
      if (fo && cardFormat !== fo) ok = false;
      if (d === '7' && heures !== '7') ok = false;
      if (d === '14' && heures !== '14') ok = false;
      if (certifiantOnly && !certifiant) ok = false;
      card.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    if (count) count.textContent = visible + (visible === 1 ? ' module disponible' : ' modules disponibles');
  }

  [search, cat, format, duree, certOnly].forEach(el => {
    if (!el) return;
    el.addEventListener('input', apply);
    el.addEventListener('change', apply);
  });
  apply();
}
document.addEventListener('DOMContentLoaded', initCatalogue);
