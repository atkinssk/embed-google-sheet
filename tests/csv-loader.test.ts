import { parseCSVText } from '../src/csv-loader';

describe('CSV Loader', () => {
  test('parses simple CSV correctly', () => {
    const csv = 'Name,Age\nAlice,30\nBob,25';
    const result = parseCSVText(csv);

    expect(result.headers).toEqual(['Name', 'Age']);
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0]).toEqual({ Name: 'Alice', Age: '30' });
    expect(result.rows[1]).toEqual({ Name: 'Bob', Age: '25' });
  });

  test('handles quoted values with commas', () => {
    const csv = 'Name,Description\n"Smith, John","A person"';
    const result = parseCSVText(csv);

    expect(result.rows[0].Name).toBe('Smith, John');
    expect(result.rows[0].Description).toBe('A person');
  });

  test('handles empty rows gracefully', () => {
    const csv = 'Name,Age\nAlice,30\n\nBob,25';
    const result = parseCSVText(csv);

    expect(result.rows.length).toBeGreaterThan(0);
  });

  test('throws error on empty CSV', () => {
    expect(() => parseCSVText('')).toThrow('CSV is empty');
  });
});
