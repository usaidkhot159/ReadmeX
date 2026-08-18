import { state, getFormData } from './state.js';

const CHECKS = [
  { id: 'name',         label: 'Project name',    fn: d => !!d.projectName },
  { id: 'desc',         label: 'Description',      fn: d => !!d.projectDesc },
  { id: 'demo',         label: 'Live demo',        fn: d => !!d.demoUrl },
  { id: 'features',     label: 'Features',         fn: () => state.features.some(f => f.text.trim()) },
  { id: 'tech',         label: 'Tech stack',       fn: () => state.selectedTech.size > 0 },
  { id: 'installation', label: 'Installation',     fn: () => state.activeSections.has('installation') },
  { id: 'usage',        label: 'Usage guide',      fn: d => !!d.usageContent },
  { id: 'screenshots',  label: 'Screenshots',      fn: () => state.screenshots.some(s => s.path.trim()) },
  { id: 'license',      label: 'License',          fn: d => d.licenseType && d.licenseType !== 'None' },
  { id: 'author',       label: 'Author info',      fn: d => !!d.ghUsername || !!d.authorName },
  { id: 'badges',       label: 'Badges',           fn: () => state.selectedBadges.size > 0 && !!getFormData().ghUsername },
  { id: 'contributing', label: 'Contributing',     fn: () => state.activeSections.has('contributing') },
];

export function initScore() {}

export function updateScore() {
  const d = getFormData();
  const results = CHECKS.map(c => ({ ...c, pass: c.fn(d) }));
  const passed = results.filter(r => r.pass).length;
  const pct = Math.round((passed / results.length) * 100);

  const fill = document.getElementById('scoreBarFill');
  const pctEl = document.getElementById('scorePercent');
  const pillVal = document.getElementById('scorePillValue');
  const list = document.getElementById('scoreChecklist');

  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
  if (pillVal) pillVal.textContent = pct + '%';

  if (list) {
    list.innerHTML = results.map(r => `
      <li class="score-item ${r.pass ? 'pass' : (r.id === 'contributing' ? 'warn' : '')}">${r.label}</li>
    `).join('');
  }
}
