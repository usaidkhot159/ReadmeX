import { generateMarkdown } from '../utils/markdown.js';
import { saveProject } from './history.js';
import { getFormData } from './state.js';

export function initActions() {
  document.getElementById('copyMarkdown').addEventListener('click', copyMarkdown);
  document.getElementById('downloadReadme').addEventListener('click', downloadReadme);
  document.getElementById('saveProject').addEventListener('click', saveProject);
}

async function copyMarkdown() {
  const md = generateMarkdown();
  try {
    await navigator.clipboard.writeText(md);
    showToast('Copied to clipboard!');
  } catch {
    const el = document.getElementById('rawMarkdown');
    el.select?.();
    document.execCommand('copy');
    showToast('Copied!');
  }
}

function downloadReadme() {
  const md = generateMarkdown();
  const d = getFormData();
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  a.click();
  URL.revokeObjectURL(url);
  showToast('README.md downloaded!');
}

let toastTimer;
export function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
