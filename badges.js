import { state } from './state.js';
import { updatePreview } from './preview.js';

const BADGES = [
  { id: 'stars',    label: '⭐ Stars' },
  { id: 'forks',    label: '🍴 Forks' },
  { id: 'issues',   label: '🐛 Issues' },
  { id: 'license',  label: '📄 License' },
  { id: 'version',  label: '🏷 Version' },
  { id: 'downloads',label: '⬇ Downloads' },
  { id: 'build',    label: '🔨 Build' },
  { id: 'coverage', label: '🛡 Coverage' },
];

export function initBadges() {
  const grid = document.getElementById('badgeGrid');
  BADGES.forEach(({ id, label }) => {
    const el = document.createElement('button');
    el.className = 'badge-toggle' + (state.selectedBadges.has(id) ? ' selected' : '');
    el.textContent = label;
    el.addEventListener('click', () => {
      if (state.selectedBadges.has(id)) {
        state.selectedBadges.delete(id);
        el.classList.remove('selected');
      } else {
        state.selectedBadges.add(id);
        el.classList.add('selected');
      }
      updatePreview();
    });
    grid.appendChild(el);
  });
}

export function getBadgeMarkdown(user, repo) {
  if (!user || !repo) return '';
  const base = `https://img.shields.io/github`;
  const lines = [];
  if (state.selectedBadges.has('stars'))    lines.push(`![Stars](${base}/stars/${user}/${repo}?style=flat-square&color=6E40C9)`);
  if (state.selectedBadges.has('forks'))    lines.push(`![Forks](${base}/forks/${user}/${repo}?style=flat-square&color=39D353)`);
  if (state.selectedBadges.has('issues'))   lines.push(`![Issues](${base}/issues/${user}/${repo}?style=flat-square&color=F0883E)`);
  if (state.selectedBadges.has('license'))  lines.push(`![License](${base}/license/${user}/${repo}?style=flat-square&color=58A6FF)`);
  if (state.selectedBadges.has('version'))  lines.push(`![Version](${base}/v/release/${user}/${repo}?style=flat-square&color=6E40C9)`);
  if (state.selectedBadges.has('downloads'))lines.push(`![Downloads](${base}/downloads/${user}/${repo}/total?style=flat-square&color=39D353)`);
  if (state.selectedBadges.has('build'))    lines.push(`![Build](https://img.shields.io/github/actions/workflow/status/${user}/${repo}/ci.yml?style=flat-square&label=build)`);
  if (state.selectedBadges.has('coverage')) lines.push(`![Coverage](https://img.shields.io/codecov/c/github/${user}/${repo}?style=flat-square)`);
  return lines.join('\n');
}
