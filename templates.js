import { state } from './state.js';
import { updatePreview } from './preview.js';
import { updateScore } from './score.js';
import { addFeature } from './features.js';
import { showToast } from './actions.js';

const TEMPLATES = [
  {
    id: 'modern',
    emoji: '🎨',
    name: 'Modern',
    desc: 'Clean, professional README with all sections.',
    sections: ['title','description','demo','features','techstack','installation','usage','screenshots','roadmap','contributing','license','author'],
    data: { projectName: 'My Awesome Project', projectDesc: 'A clean and powerful tool built for developers who care about quality.', demoUrl: '', authorName: '', ghUsername: '' },
    features: ['Blazing fast performance','Fully responsive design','Dark mode support','One-click deployment'],
    tech: ['JavaScript','React','Node.js','TailwindCSS'],
  },
  {
    id: 'developer',
    emoji: '⚡',
    name: 'Developer',
    desc: 'Technical README with installation focus and badges.',
    sections: ['title','description','techstack','installation','usage','contributing','license'],
    data: { projectName: 'dev-tool', projectDesc: 'A developer utility for automating repetitive tasks.', usageContent: '```bash\ndev-tool --help\ndev-tool run [command]\n```' },
    features: ['CLI interface','Plugin system','Zero dependencies','Cross-platform'],
    tech: ['TypeScript','Node.js','Go'],
  },
  {
    id: 'minimal',
    emoji: '🖤',
    name: 'Minimal',
    desc: 'Simple README with just the essentials.',
    sections: ['title','description','installation','license'],
    data: { projectName: 'project', projectDesc: 'A minimal, focused tool that does one thing well.' },
    features: [],
    tech: [],
  },
  {
    id: 'colorful',
    emoji: '🌈',
    name: 'Colorful',
    desc: 'Emoji-heavy, beginner-friendly README.',
    sections: ['title','description','demo','features','techstack','installation','usage','screenshots','roadmap','contributing','license','author'],
    data: { projectName: '✨ My Project', projectDesc: '🚀 A super cool project that makes your life easier and more fun!' },
    features: ['🎉 Easy to use','🔥 Super fast','💡 Smart features','🎨 Beautiful UI','📱 Mobile friendly'],
    tech: ['HTML','CSS','JavaScript'],
  },
  {
    id: 'professional',
    emoji: '💼',
    name: 'Professional',
    desc: 'Portfolio-focused README for recruiters.',
    sections: ['title','description','demo','features','techstack','installation','usage','license','author'],
    data: { projectName: 'Portfolio Project', projectDesc: 'A full-stack web application demonstrating modern development practices and scalable architecture.' },
    features: ['RESTful API design','JWT authentication','Responsive UI','CI/CD pipeline','Comprehensive test coverage'],
    tech: ['React','Node.js','PostgreSQL','Docker'],
  },
];

export function initTemplates() {
  const toggle = document.getElementById('templateToggle');
  const modal  = document.getElementById('templateModal');
  const close  = document.getElementById('templateClose');
  const grid   = document.getElementById('templateGrid');

  toggle.addEventListener('click', () => modal.classList.add('active'));
  close.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  TEMPLATES.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-card__emoji">${tpl.emoji}</div>
      <div class="template-card__name">${tpl.name}</div>
      <div class="template-card__desc">${tpl.desc}</div>
    `;
    card.addEventListener('click', () => applyTemplate(tpl));
    grid.appendChild(card);
  });
}

function applyTemplate(tpl) {
  // Set form fields
  Object.entries(tpl.data || {}).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  });

  // Set active sections
  state.activeSections = new Set(tpl.sections);

  // Set tech
  state.selectedTech = new Set(tpl.tech || []);
  document.querySelectorAll('.tech-chip').forEach(chip => {
    chip.classList.toggle('selected', state.selectedTech.has(chip.textContent.trim()));
  });

  // Set sections toggles
  document.querySelectorAll('.section-toggle').forEach(el => {
    const id = el.querySelector('input').getAttribute('data-id') ||
               [...el.querySelectorAll('span')].find(s => !s.classList.contains('toggle-dot'))?.textContent;
  });

  // Clear and re-add features
  state.features = [];
  document.getElementById('featureList').innerHTML = '';
  tpl.features.forEach(f => addFeature(f));

  document.getElementById('templateModal').classList.remove('active');
  updatePreview();
  updateScore();
  showToast(`Template "${tpl.name}" applied!`);
}
