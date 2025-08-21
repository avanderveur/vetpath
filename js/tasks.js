(function () {
  const list = document.querySelector('#tasks');
  if (!list) return;

  const storageKey = 'tsb_' + (list.dataset.key || location.pathname.split('/').pop().replace('.html',''));
  const boxes = [...document.querySelectorAll('input[type=checkbox][data-id]')];
  const pctEl = document.getElementById('progressPct');
  const fillEl = document.getElementById('progressFill');
  const resetBtn = document.getElementById('resetProgress');
  const printBtn = document.getElementById('printPlan');

  function load() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
  }
  function save(state) { localStorage.setItem(storageKey, JSON.stringify(state)); }

  const state = load();
  boxes.forEach(b => { b.checked = !!state[b.dataset.id]; });

  function updateProgress() {
    const done = boxes.filter(b => b.checked).length;
    const total = boxes.length || 1;
    const pct = Math.round((done / total) * 100);
    if (pctEl) pctEl.textContent = pct + '% complete';
    if (fillEl) fillEl.style.width = pct + '%';
  }

  boxes.forEach(b => b.addEventListener('change', () => {
    state[b.dataset.id] = b.checked;
    save(state);
    updateProgress();
  }));

  resetBtn?.addEventListener('click', () => {
    boxes.forEach(b => (b.checked = false));
    save({});
    updateProgress();
  });

  printBtn?.addEventListener('click', () => window.print());

  updateProgress();
})();
