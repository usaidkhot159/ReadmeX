import { state, getFormData } from './state.js';
import { showToast } from './actions.js';

const STORAGE_KEY = 'readmex-history';

function getHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveHistory(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff/60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff/3600000)}h ago`;
  return `${Math.floor(diff/86400000)}d ago`;
}

export function initHistory() {
  const toggle = document.getElementById('historyToggle');
  const drawer = document.getElementById('historyDrawer');
  const close  = document.getElementById('historyClose');
  const overlay = document.getElementById('drawerOverlay');
  const clearBtn = document.getElementById('clearHistory');

  const open  = () => { drawer.classList.add('open'); overlay.classList.add('active'); };
  const close_ = () => { drawer.classList.remove('open'); overlay.classList.remove('active'); };

  toggle.addEventListener('click', open);
  close.addEventListener('click', close_);
  overlay.addEventListener('click', close_);

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all saved projects?')) {
      saveHistory([]);
      renderHistory();
      showToast('History cleared');
    }
  });

  renderHistory();
}

export function saveProject() {
  const d = getFormData();
  if (!d.projectName) { showToast('Add a project name first'); return; }

  const history = getHistory();
  const entry = {
    id: Date.now().toString(),
    ts: Date.now(),
    name: d.projectName,
    data: d,
    features: state.features,
    screenshots: state.screenshots,
    roadmap: state.roadmap,
    selectedTech: [...state.selectedTech],
    selectedBadges: [...state.selectedBadges],
    activeSections: [...state.activeSections],
  };

  // Remove existing entry with same name
  const filtered = history.filter(h => h.name !== d.projectName);
  filtered.unshift(entry);
  saveHistory(filtered.slice(0, 20));
  renderHistory();
  showToast('Project saved!');
}

function loadEntry(entry) {
  const d = entry.data;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

  setVal('projectName', d.projectName);
  setVal('projectDesc', d.projectDesc);
  setVal('ghUsername', d.ghUsername);
  setVal('projectType', d.projectType);
  setVal('demoUrl', d.demoUrl);
  setVal('licenseType', d.licenseType);
  setVal('installType', d.installType);
  setVal('usageContent', d.usageContent);
  setVal('contributingContent', d.contributingContent);
  setVal('authorName', d.authorName);
  setVal('authorTwitter', d.authorTwitter);
  setVal('authorPortfolio', d.authorPortfolio);

  state.features = entry.features || [];
  state.screenshots = entry.screenshots || [];
  state.roadmap = entry.roadmap || [];
  state.selectedTech = new Set(entry.selectedTech || []);
  state.selectedBadges = new Set(entry.selectedBadges || []);
  state.activeSections = new Set(entry.activeSections || []);

  // Trigger full re-render
  window.location.reload();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  const history = getHistory();

  if (!history.length) {
    list.innerHTML = `<div class="history-empty"><div class="empty-icon">📂</div><p>No saved projects yet.<br>Hit save to store your README.</p></div>`;
    return;
  }

  list.innerHTML = history.map(entry => `
    <div class="history-entry" data-id="${entry.id}">
      <span class="history-entry__icon">📁</span>
      <div class="history-entry__body">
        <div class="history-entry__name">${entry.name}</div>
        <div class="history-entry__time">${timeAgo(entry.ts)}</div>
      </div>
      <button class="history-entry__del" data-del="${entry.id}" title="Delete">✕</button>
    </div>
  `).join('');

  list.querySelectorAll('.history-entry').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-del]')) {
        const id = e.target.closest('[data-del]').dataset.del;
        const filtered = getHistory().filter(h => h.id !== id);
        saveHistory(filtered);
        renderHistory();
        return;
      }
      const id = el.dataset.id;
      const entry = getHistory().find(h => h.id === id);
      if (entry) loadEntry(entry);
    });
  });
}
