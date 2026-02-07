export function setupFiltering(container: HTMLElement): void {
  const table = container.querySelector('table.embed-google-sheet-table');
  if (!table) return;

  const headers = table.querySelectorAll('thead th');

  headers.forEach((header, columnIndex) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Filter ${header.textContent}`;
    input.className = 'embed-google-sheet-filter';
    input.style.display = 'block';
    input.style.marginTop = '5px';
    input.style.width = '100%';
    input.style.padding = '5px';
    input.style.boxSizing = 'border-box';

    input.addEventListener('input', () => {
      const filterValue = input.value.toLowerCase();
      filterTable(table, columnIndex, filterValue);
    });

    header.appendChild(input);
  });
}

function filterTable(table: Element, columnIndex: number, filterValue: string): void {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    const cell = (row as HTMLTableRowElement).cells[columnIndex];
    const cellText = cell?.textContent?.toLowerCase() || '';

    if (filterValue === '' || cellText.includes(filterValue)) {
      (row as HTMLElement).style.display = '';
    } else {
      (row as HTMLElement).style.display = 'none';
    }
  });
}
