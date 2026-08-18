import { state } from './state.js';
import { updatePreview } from './preview.js';

const SECTIONS = [
  { id: 'title',        label: '# Title' },
  { id: 'description',  label: '📝 Desc' },
  { id: 'demo',         label: '🔗 Demo' },
  { id: 'features',     label: '✨ Features' },
  { id: 'techstack',    label: '⚙ Tech' },
  { id: 'installation', label: '📦 Install' },
  { id: 'usage',        label: '💡 Usage' },
  { id: 'screenshots',  label: '📸 Screens' },
  { id: 'roadmap',      label: '🗺 Roadmap' },
  { id: 'contributing', label: '🤝 Contrib' },
  { id: 'license',      label: '📄 License' },
  { id: 'author',       label: '👤 Author' },
];

export function initSectionsToggle() {
  const grid = document.getElementById('sectionsToggleGrid');

  SECTIONS.forEach(({ id, label }) => {
    const el = document.createElement('label');
    el.className = 'section-toggle' + (state.activeSections.has(id) ? ' active' : '');
    el.innerHTML = `<input type="checkbox" ${state.activeSections.has(id) ? 'checked' : ''} /><span class="toggle-dot"></span><span>${label}</span>`;
    el.addEventListener('click', () => {
      if (state.activeSections.has(id)) {
        state.activeSections.delete(id);
        el.classList.remove('active');
      } else {
        state.activeSections.add(id);
        el.classList.add('active');
      }
      updatePreview();
    });
    grid.appendChild(el);
  });
}

export { SECTIONS };
