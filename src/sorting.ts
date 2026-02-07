export function setupSorting(container: HTMLElement): void {
  const table = container.querySelector('table.embed-google-sheet-table');
  if (!table) return;

  const headers = table.querySelectorAll('thead th');
  const tbody = table.querySelector('tbody');

  if (!tbody) return;

  headers.forEach((header, columnIndex) => {
    const headerEl = header as HTMLElement;
    headerEl.style.cursor = 'pointer';
    headerEl.style.userSelect = 'none';
    headerEl.addEventListener('click', () => sortColumn(tbody, columnIndex));
  });
}

function sortColumn(tbody: HTMLTableSectionElement, columnIndex: number): void {
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const aValue = (a as HTMLTableRowElement).cells[columnIndex]?.textContent || '';
    const bValue = (b as HTMLTableRowElement).cells[columnIndex]?.textContent || '';

    const aNum = parseFloat(aValue);
    const bNum = parseFloat(bValue);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }

    return aValue.localeCompare(bValue);
  });

  rows.forEach((row) => tbody.appendChild(row));
}
