import { state } from './state.js';
import { updatePreview } from './preview.js';

export function initScreenshots() {
  document.getElementById('addScreenshot').addEventListener('click', () => {
    addScreenshot({ caption: '', path: '' });
    updatePreview();
  });
}

export function addScreenshot(data) {
  const id = Date.now().toString();
  state.screenshots.push({ id, ...data });
  renderScreenshot(id, data);
}

function renderScreenshot(id, data) {
  const list = document.getElementById('screenshotList');
  const el = document.createElement('div');
  el.className = 'screenshot-item';
  el.dataset.id = id;
  el.innerHTML = `
    <span style="font-size:1.1rem;flex-shrink:0">📸</span>
    <input class="input" type="text" placeholder="Caption (e.g. Dashboard)" value="${data.caption || ''}" data-field="caption" style="flex:1" />
    <input class="input" type="text" placeholder="Path (e.g. screenshots/dash.png)" value="${data.path || ''}" data-field="path" style="flex:1.5" />
    <button class="remove-btn" title="Remove">✕</button>
  `;

  el.querySelectorAll('input[data-field]').forEach(inp => {
    inp.addEventListener('input', e => {
      const item = state.screenshots.find(s => s.id === id);
      if (item) item[e.target.dataset.field] = e.target.value;
      updatePreview();
    });
  });

  el.querySelector('.remove-btn').addEventListener('click', () => {
    state.screenshots = state.screenshots.filter(s => s.id !== id);
    el.remove();
    updatePreview();
  });

  list.appendChild(el);
}
