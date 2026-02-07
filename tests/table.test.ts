/**
 * @jest-environment jsdom
 */

import { renderTable } from '../src/table';

describe('Table Rendering', () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('renders table with headers and rows', () => {
    const data = {
      headers: ['Name', 'Age'],
      rows: [
        { Name: 'Alice', Age: '30' },
        { Name: 'Bob', Age: '25' },
      ],
    };

    const table = renderTable(container, data);

    expect(table).toBeInstanceOf(HTMLTableElement);
    expect(table.querySelector('thead')).toBeTruthy();
    expect(table.querySelector('tbody')).toBeTruthy();
  });

  test('renders correct number of columns', () => {
    const data = {
      headers: ['Name', 'Age', 'City'],
      rows: [{ Name: 'Alice', Age: '30', City: 'NYC' }],
    };

    renderTable(container, data);
    const headerCells = container.querySelectorAll('thead th');

    expect(headerCells.length).toBe(3);
  });

  test('renders correct number of rows', () => {
    const data = {
      headers: ['Name'],
      rows: [{ Name: 'Alice' }, { Name: 'Bob' }, { Name: 'Charlie' }],
    };

    renderTable(container, data);
    const bodyRows = container.querySelectorAll('tbody tr');

    expect(bodyRows.length).toBe(3);
  });
});
