import type { EmbedConfig } from './index';

export function createLoaderSnippet(config: EmbedConfig): string {
  const configStr = JSON.stringify(config);
  return `
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/atkinssk/embed-google-sheet@latest/dist/embed.js';
  script.onload = function() {
    if (typeof EmbedGoogleSheet === 'function') {
      EmbedGoogleSheet(${configStr});
    }
  };
  document.head.appendChild(script);
})();
`.trim();
}

export default createLoaderSnippet;
