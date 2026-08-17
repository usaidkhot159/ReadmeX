import { showToast } from './actions.js';
import { updatePreview } from './preview.js';
import { updateScore } from './score.js';

export function initGitHub() {
  document.getElementById('loadRepo').addEventListener('click', loadRepo);
  document.getElementById('ghRepoUrl').addEventListener('keydown', e => {
    if (e.key === 'Enter') loadRepo();
  });
}

async function loadRepo() {
  const urlInput = document.getElementById('ghRepoUrl');
  const btn = document.getElementById('loadRepo');
  const raw = urlInput.value.trim();
  if (!raw) { showToast('Enter a GitHub URL first'); return; }

  // Parse owner/repo from URL
  const match = raw.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (!match) { showToast('Invalid GitHub URL'); return; }

  const [, owner, repoName] = match;
  btn.innerHTML = '<span class="loading"></span>';
  btn.disabled = true;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
    const data = await res.json();

    setField('projectName', data.name || '');
    setField('projectDesc', data.description || '');
    setField('ghUsername', data.owner?.login || '');
    if (data.homepage) setField('demoUrl', data.homepage);
    if (data.license?.spdx_id) setField('licenseType', data.license.spdx_id);

    updatePreview();
    updateScore();
    showToast(`Loaded: ${data.full_name}`);
  } catch (err) {
    showToast(`Failed to load: ${err.message}`);
  } finally {
    btn.innerHTML = 'Load';
    btn.disabled = false;
  }
}

function setField(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}
