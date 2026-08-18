export const state = {
  features: [],
  screenshots: [],
  roadmap: [],
  selectedTech: new Set(),
  selectedBadges: new Set(['stars', 'license', 'issues']),
  activeSections: new Set(['title','description','demo','features','techstack','installation','usage','roadmap','contributing','license','author']),
  currentTemplate: 'modern',
};

export function getFormData() {
  return {
    projectName: document.getElementById('projectName')?.value.trim() || '',
    projectDesc: document.getElementById('projectDesc')?.value.trim() || '',
    ghUsername:  document.getElementById('ghUsername')?.value.trim() || '',
    projectType: document.getElementById('projectType')?.value || 'web',
    demoUrl:     document.getElementById('demoUrl')?.value.trim() || '',
    licenseType: document.getElementById('licenseType')?.value || 'MIT',
    installType: document.getElementById('installType')?.value || 'html',
    customInstall: document.getElementById('customInstall')?.value.trim() || '',
    usageContent: document.getElementById('usageContent')?.value.trim() || '',
    contributingContent: document.getElementById('contributingContent')?.value.trim() || '',
    authorName:  document.getElementById('authorName')?.value.trim() || '',
    authorTwitter: document.getElementById('authorTwitter')?.value.trim() || '',
    authorPortfolio: document.getElementById('authorPortfolio')?.value.trim() || '',
  };
}
