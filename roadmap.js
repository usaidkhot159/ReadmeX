import { state } from './state.js';
import { updatePreview } from './preview.js';

export function initRoadmap() {
  document.getElementById('addRoadmap').addEventListener('click', () => {
    addRoadmapItem({ text: '', done: false });
    updatePreview();
  });
}

export function addRoadmapItem(data) {
  const id = Date.now().toString();
  state.roadmap.push({ id, ...data });
  renderRoadmapItem(id, data);
}

function renderRoadmapItem(id, data) {
  const list = document.getElementById('roadmapList');
  const el = document.createElement('div');
  el.className = 'roadmap-item';
  el.dataset.id = id;
  el.innerHTML = `
    <div class="roadmap-status ${data.done ? 'done' : ''}" title="Toggle done"></div>
    <input class="input" type="text" placeholder="e.g. Add dark mode" value="${data.text || ''}" style="flex:1"/>
    <button class="remove-btn" title="Remove">✕</button>
  `;

  const status = el.querySelector('.roadmap-status');
  status.addEventListener('click', () => {
    const item = state.roadmap.find(r => r.id === id);
    if (item) { item.done = !item.done; status.classList.toggle('done', item.done); }
    updatePreview();
  });

  el.querySelector('input').addEventListener('input', e => {
    const item = state.roadmap.find(r => r.id === id);
    if (item) item.text = e.target.value;
    updatePreview();
  });

  el.querySelector('.remove-btn').addEventListener('click', () => {
    state.roadmap = state.roadmap.filter(r => r.id !== id);
    el.remove();
    updatePreview();
  });

  list.appendChild(el);
}
