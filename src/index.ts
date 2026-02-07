import { parseCSV } from './csv-loader';
import { renderTable } from './table';
import { setupSorting } from './sorting';
import { setupFiltering } from './filtering';

export interface EmbedConfig {
  csvLink: string;
  containerId: string;
  sortable?: boolean;
  filterable?: boolean;
}

export async function EmbedGoogleSheet(config: EmbedConfig): Promise<void> {
  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`Container with ID "${config.containerId}" not found`);
    return;
  }

  try {
    const data = await parseCSV(config.csvLink);
    renderTable(container, data);

    if (config.sortable !== false) {
      setupSorting(container);
    }

    if (config.filterable !== false) {
      setupFiltering(container);
    }
  } catch (error) {
    console.error('Failed to load Google Sheet:', error);
    container.innerHTML = '<p>Error loading data. Please check the CSV link.</p>';
  }
}

// Expose global function for use in embed snippet
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).EmbedGoogleSheet = EmbedGoogleSheet;
}

export default EmbedGoogleSheet;
