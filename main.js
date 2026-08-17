import { initTheme } from './modules/theme.js';
import { initSectionsToggle } from './modules/sections.js';
import { initTechStack } from './modules/techStack.js';
import { initFeatures } from './modules/features.js';
import { initScreenshots } from './modules/screenshots.js';
import { initRoadmap } from './modules/roadmap.js';
import { initBadges } from './modules/badges.js';
import { initInstall } from './modules/install.js';
import { initTemplates } from './modules/templates.js';
import { initHistory } from './modules/history.js';
import { initGitHub } from './modules/github.js';
import { initPreview } from './modules/preview.js';
import { initScore } from './modules/score.js';
import { initActions } from './modules/actions.js';
import { state } from './modules/state.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSectionsToggle();
  initTechStack();
  initFeatures();
  initScreenshots();
  initRoadmap();
  initBadges();
  initInstall();
  initTemplates();
  initHistory();
  initGitHub();
  initPreview();
  initScore();
  initActions();

  // Live update on any input change
  document.getElementById('formPanel').addEventListener('input', () => {
    import('./modules/preview.js').then(m => m.updatePreview());
    import('./modules/score.js').then(m => m.updateScore());
  });

  // Initial render
  import('./modules/preview.js').then(m => m.updatePreview());
  import('./modules/score.js').then(m => m.updateScore());
});
