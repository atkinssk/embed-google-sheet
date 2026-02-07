import type { CSVData } from './csv-loader';

export function renderTable(container: HTMLElement, data: CSVData): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'embed-google-sheet-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  data.headers.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  data.rows.forEach((row) => {
    const tr = document.createElement('tr');

    data.headers.forEach((header) => {
      const td = document.createElement('td');
      td.textContent = row[header] || '';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  return table;
}
