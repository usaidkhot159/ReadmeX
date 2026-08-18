import { state, getFormData } from './state.js';
import { generateMarkdown } from '../utils/markdown.js';
import { renderMarkdown } from '../utils/renderer.js';

let activeTab = 'github';

export function initPreview() {
  // Tab switching
  document.querySelectorAll('.preview-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      document.getElementById('previewGithub').classList.toggle('hidden', activeTab !== 'github');
      document.getElementById('previewRaw').classList.toggle('hidden', activeTab !== 'raw');
    });
  });

  updatePreview();
}

export function updatePreview() {
  const d = getFormData();
  const md = generateMarkdown();

  // Raw tab
  document.getElementById('rawMarkdown').textContent = md;

  // GitHub header
  renderGhHeader(d);

  // GitHub body
  const body = document.getElementById('ghReadmeBody');
  if (!d.projectName && !d.projectDesc) {
    body.innerHTML = `<div class="empty-preview"><div class="empty-icon">📄</div><p>Start filling in your project details to see the preview.</p></div>`;
  } else {
    body.innerHTML = renderMarkdown(md);
  }
}

function renderGhHeader(d) {
  const header = document.getElementById('ghRepoHeader');
  const user = d.ghUsername || 'username';
  const repo = d.projectName ? d.projectName.replace(/\s+/g, '-').toLowerCase() : 'project';

  const badgeImgs = buildBadgeImgs(user, repo, d);

  header.innerHTML = `
    <div class="gh-repo-name">${d.projectName || 'my-project'}</div>
    ${d.projectDesc ? `<div class="gh-repo-desc">${d.projectDesc}</div>` : ''}
    <div class="gh-repo-meta">
      <span class="gh-meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Star
      </span>
      <span class="gh-meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
        Fork
      </span>
      ${d.licenseType !== 'None' ? `<span class="gh-meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ${d.licenseType}
      </span>` : ''}
      ${d.demoUrl ? `<a href="${d.demoUrl}" target="_blank" class="gh-meta-item" style="color:var(--text-link)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Live Demo
      </a>` : ''}
    </div>
    ${badgeImgs ? `<div class="gh-badge-row">${badgeImgs}</div>` : ''}
  `;
}

function buildBadgeImgs(user, repo, d) {
  if (!d.ghUsername || !d.projectName) return '';
  const { state: s } = window.__rmx || {};
  // Use imported state
  const sb = state.selectedBadges;
  const base = `https://img.shields.io/github`;
  let imgs = '';
  if (sb.has('stars'))    imgs += `<img src="${base}/stars/${user}/${repo}?style=flat-square&color=6E40C9" alt="stars" />`;
  if (sb.has('forks'))    imgs += `<img src="${base}/forks/${user}/${repo}?style=flat-square&color=39D353" alt="forks" />`;
  if (sb.has('issues'))   imgs += `<img src="${base}/issues/${user}/${repo}?style=flat-square&color=F0883E" alt="issues" />`;
  if (sb.has('license'))  imgs += `<img src="${base}/license/${user}/${repo}?style=flat-square&color=58A6FF" alt="license" />`;
  return imgs;
}
