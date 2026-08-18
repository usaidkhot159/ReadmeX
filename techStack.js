import { state } from './state.js';
import { updatePreview } from './preview.js';

const TECH = {
  Languages: ['HTML','CSS','JavaScript','TypeScript','Python','Java','C++','Go','Rust','Swift','Kotlin','PHP','Ruby'],
  Frameworks: ['React','Next.js','Vue','Angular','Svelte','Node.js','Express','Django','Flask','FastAPI','Laravel'],
  Database: ['MongoDB','MySQL','PostgreSQL','Firebase','Redis','SQLite','Supabase','PlanetScale'],
  Tools: ['Vite','Webpack','Docker','Git','GitHub Actions','Vercel','Netlify','AWS','Figma','TailwindCSS'],
};

export function initTechStack() {
  const container = document.getElementById('techStackSelector');

  Object.entries(TECH).forEach(([cat, techs]) => {
    const catEl = document.createElement('div');
    catEl.className = 'tech-category';
    catEl.innerHTML = `<p class="tech-category__label">${cat}</p><div class="tech-chips" id="chips-${cat}"></div>`;
    container.appendChild(catEl);

    const chipsEl = catEl.querySelector('.tech-chips');
    techs.forEach(tech => {
      const chip = document.createElement('button');
      chip.className = 'tech-chip' + (state.selectedTech.has(tech) ? ' selected' : '');
      chip.textContent = tech;
      chip.addEventListener('click', () => {
        if (state.selectedTech.has(tech)) {
          state.selectedTech.delete(tech);
          chip.classList.remove('selected');
        } else {
          state.selectedTech.add(tech);
          chip.classList.add('selected');
        }
        updatePreview();
      });
      chipsEl.appendChild(chip);
    });
  });
}
