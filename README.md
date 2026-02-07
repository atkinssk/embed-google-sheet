# embed-google-sheet

A lightweight TypeScript library that embeds a sortable, filterable table in web pages by fetching data from a Google Sheet CSV export.

## Features

- 📊 Fetch and display Google Sheet data as an HTML table
- 🔤 **Sortable columns** - Click headers to sort ascending/descending
- 🔍 **Filterable columns** - Real-time filtering per column
- 📦 Single embeddable script (~2.7KB minified)
- 🎯 No dependencies
- 🔓 No authentication required (works with shared public sheets)

## Installation

### As an npm package

```bash
npm install embed-google-sheet
```

### As an embedded script

Add a single `<script>` tag to your HTML:

```html
<div id="my-sheet-table"></div>

<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/atkinssk/embed-google-sheet@latest/dist/embed.js';
    script.onload = function() {
      EmbedGoogleSheet({
        csvLink: 'https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=0',
        containerId: 'my-sheet-table',
        sortable: true,
        filterable: true
      });
    };
    document.head.appendChild(script);
  })();
</script>
```

## Usage

### Get Your CSV Link

1. Open your Google Sheet
2. Find the sheet tab you want to embed
3. Note the `gid` (sheet ID) from the URL or right-click the tab
4. Use this link format: `https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=GID`

Replace:
- `SHEET_ID` - The ID from your sheet URL
- `GID` - The sheet tab ID (0 for first tab, 1 for second, etc.)

### Configuration

```typescript
interface EmbedConfig {
  csvLink: string;        // URL to Google Sheet CSV export
  containerId: string;    // HTML element ID where table will render
  sortable?: boolean;     // Enable column sorting (default: true)
  filterable?: boolean;   // Enable column filtering (default: true)
}
```

## Examples

### Basic HTML

```html
<div id="data-table"></div>

<script>
  EmbedGoogleSheet({
    csvLink: 'https://docs.google.com/spreadsheets/d/1abc.../export?format=csv',
    containerId: 'data-table'
  });
</script>
```

### Disable Filtering

```javascript
EmbedGoogleSheet({
  csvLink: 'https://...',
  containerId: 'data-table',
  filterable: false
});
```

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build          # Production build (minified)
npm run build:watch   # Watch mode for development
```

### Testing

```bash
npm test              # Run all tests
npm test:watch       # Watch mode
npm test:coverage    # Coverage report
```

### Linting

```bash
npm run lint          # Check code style
npm run lint:fix      # Auto-fix issues
npm run format        # Format with Prettier
npm run type-check    # TypeScript type checking
```

## Architecture

- `src/index.ts` - Main entry point and public API
- `src/csv-loader.ts` - CSV parsing from Google Sheets
- `src/table.ts` - Table DOM rendering
- `src/sorting.ts` - Column sorting functionality
- `src/filtering.ts` - Column filtering functionality
- `src/loader.ts` - Helper for generating embed snippets

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES2020 support

## License

ISC
