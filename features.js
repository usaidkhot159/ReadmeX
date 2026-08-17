import { state } from './state.js';
import { updatePreview } from './preview.js';

export function initFeatures() {
  document.getElementById('addFeature').addEventListener('click', () => {
    addFeature('');
    updatePreview();
  });
}

export function addFeature(text) {
  const id = Date.now().toString();
  state.features.push({ id, text });
  renderFeature(id, text);
}

function renderFeature(id, text) {
  const list = document.getElementById('featureList');
  const el = document.createElement('div');
  el.className = 'feature-item';
  el.dataset.id = id;
  el.draggable = true;
  el.innerHTML = `
    <span class="drag-handle" title="Drag to reorder">⠿</span>
    <input class="input" type="text" placeholder="e.g. Dark mode support" value="${escHtml(text)}" />
    <button class="remove-btn" title="Remove">✕</button>
  `;

  el.querySelector('input').addEventListener('input', e => {
    const feat = state.features.find(f => f.id === id);
    if (feat) feat.text = e.target.value;
    updatePreview();
  });

  el.querySelector('.remove-btn').addEventListener('click', () => {
    state.features = state.features.filter(f => f.id !== id);
    el.remove();
    updatePreview();
  });

  setupDrag(el, list, state.features);
  list.appendChild(el);
}

function setupDrag(el, list, arr) {
  let dragging = null;
  el.addEventListener('dragstart', () => { dragging = el; el.style.opacity = '0.4'; });
  el.addEventListener('dragend', () => { dragging = null; el.style.opacity = '1'; updatePreview(); });
  el.addEventListener('dragover', e => {
    e.preventDefault();
    if (!dragging || dragging === el) return;
    const rect = el.getBoundingClientRect();
    const after = e.clientY > rect.top + rect.height / 2;
    list.insertBefore(dragging, after ? el.nextSibling : el);
    // reorder state
    const ids = [...list.querySelectorAll('.feature-item')].map(i => i.dataset.id);
    arr.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  });
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
