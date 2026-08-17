import { updatePreview } from './preview.js';

const INSTALL_COMMANDS = {
  html: (user, repo) => `git clone https://github.com/${user || 'username'}/${repo || 'project'}.git\ncd ${repo || 'project'}\n# Open index.html in your browser`,
  node: (user, repo) => `git clone https://github.com/${user || 'username'}/${repo || 'project'}.git\ncd ${repo || 'project'}\nnpm install\nnpm start`,
  python: (user, repo) => `git clone https://github.com/${user || 'username'}/${repo || 'project'}.git\ncd ${repo || 'project'}\npip install -r requirements.txt\npython app.py`,
  custom: () => '',
};

export function initInstall() {
  const select = document.getElementById('installType');
  const customWrapper = document.getElementById('customInstallWrapper');

  select.addEventListener('change', () => {
    customWrapper.style.display = select.value === 'custom' ? 'flex' : 'none';
    updatePreview();
  });
}

export function getInstallCommands(type, user, repo) {
  if (type === 'custom') {
    return document.getElementById('customInstall')?.value.trim() || '';
  }
  return INSTALL_COMMANDS[type]?.(user, repo) || '';
}
