# Copilot Instructions for embed-google-sheet

## Project Overview

A lightweight TypeScript library that embeds sortable, filterable tables in web pages by fetching data from Google Sheet CSV exports. Builds to a single ~2.7KB minified JavaScript file for embedding via `<script>` tag or npm.

## Technology Stack

- **Language**: TypeScript (ES2020 target)
- **Build Tool**: esbuild (fast bundling to single file)
- **Testing**: Jest with jsdom (browser environment)
- **Linting**: ESLint 9 (flat config) + Prettier
- **Package Manager**: npm (using `--legacy-peer-deps` for ESLint compatibility)

## Key Build & Test Commands

```bash
# Build
npm run build              # Production build (minified + sourcemap)
npm run build:watch       # Watch mode for development

# Testing
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Code quality
npm run lint              # Check code style
npm run lint:fix          # Auto-fix linting issues
npm run format            # Auto-format with Prettier
npm run type-check        # TypeScript type checking
```

## Architecture & Core Modules

### Source Structure (`src/`)

- **`index.ts`** - Public API. Exports `EmbedGoogleSheet()` function and `EmbedConfig` interface. Orchestrates initialization of all components.
- **`csv-loader.ts`** - Fetches CSV from Google Sheet links and parses into structured data (headers + rows).
- **`table.ts`** - Creates HTML table DOM elements from parsed CSV data.
- **`sorting.ts`** - Adds click-to-sort functionality to column headers. Handles numeric vs string sorting.
- **`filtering.ts`** - Injects filter input boxes in table headers. Filters rows by column text in real-time.
- **`loader.ts`** - Generates HTML snippet code for embedding (used in documentation).

### Data Flow

1. User calls `EmbedGoogleSheet({ csvLink, containerId, sortable, filterable })`
2. `csv-loader` fetches and parses CSV from the link
3. `table` renders HTML table into the container
4. `sorting` and `filtering` attach event listeners to enable interactivity

### Key Design Decisions

- **No authentication**: Works with publicly shared Google Sheets only. Users provide CSV export URLs directly.
- **CSV URL format**: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={TAB_ID}`
- **Table styling**: No CSS injected. Table uses semantic HTML with class names; users style externally.
- **Global function**: Exposes `window.EmbedGoogleSheet` for embed snippets; also exported as ES module.
- **Single output file**: esbuild bundles all modules into one `dist/embed.js` file.

## Code Conventions

### TypeScript Patterns

- Strict mode enabled (`strict: true` in tsconfig)
- Avoid `any` types; use specific types or generics
- Return types are explicit on functions
- DOM elements cast to specific types (e.g., `as HTMLElement`, `as HTMLTableRowElement`)

### File Organization

- Each module is single-responsibility (csv, table, sorting, filtering)
- Tests colocate with their module in `tests/` using same file names + `.test.ts` suffix
- No barrel exports; import directly from module files

### Naming

- Functions are verb-based: `parseCSV`, `renderTable`, `setupSorting`, `setupFiltering`
- Interfaces describe structures: `EmbedConfig`, `CSVData`
- Internal helper functions are prefixed with their scope: `parseCSVLine`, `sortColumn`, `filterTable`

## Testing Strategy

- **Unit tests** in `tests/csv-loader.test.ts` and `tests/table.test.ts`
- Uses jsdom for browser environment simulation
- Test naming: `describe('Module Name', () => { test('specific behavior', ...) })`
- Common patterns: CSV parsing edge cases, DOM rendering correctness, element counts

## CI/CD Workflows

### `.github/workflows/test.yml` (on push/PR to main/develop)

Runs on every push and pull request:
1. Install deps
2. Lint + type-check
3. Run tests with coverage
4. Build distribution
5. Upload coverage to Codecov

### `.github/workflows/release.yml` (on version tags v*.*.*) 

Triggered by pushing a tag matching `v*.*.*`:
1. Install deps
2. Lint, test, build
3. Create GitHub Release with `dist/embed.js` attached
4. Publish to npm (requires `NPM_TOKEN` secret)

### `.github/workflows/version-bump.yml` (manual dispatch)

Manual workflow to bump version automatically:
1. Accepts `patch`, `minor`, or `major` bump type
2. Updates `package.json` version
3. Commits and pushes the change
4. Creates and pushes version tag
5. Automatically triggers release workflow

## Common Tasks

### Adding a new feature

1. Create/update module in `src/`
2. Add corresponding tests in `tests/`
3. Import and integrate in `src/index.ts`
4. Run `npm run build` to test bundling
5. Commit with descriptive message

### Running a single test file

```bash
npm test -- csv-loader.test.ts
```

### Debugging TypeScript errors

```bash
npm run type-check    # Shows all type errors
```

### Publishing a release

1. Use GitHub Actions: Go to "Actions" → "Version Bump" → "Run workflow"
2. Select bump type (patch/minor/major)
3. This creates a tag and pushes it
4. Release workflow automatically publishes to GitHub + npm

## Important Notes

- **No CSS bundling**: Styling is user's responsibility. Table gets class `embed-google-sheet-table`.
- **Browser scope**: Only runs in browsers; no Node.js runtime usage.
- **No fetch polyfill**: Requires native fetch API (IE11 not supported).
- **CSV parsing**: Simple comma-separated with quote-handling; complex CSV edge cases may fail.
- **ESLint config**: Uses flat config format (ESLint 9+); requires `--legacy-peer-deps` during npm install.

## Troubleshooting

**ESLint won't run**: Ensure `eslint.config.js` exists (not `.eslintrc.json`). ESLint v9 requires flat config.

**Jest can't find modules**: Ensure `jest.config.cjs` extension is `.cjs` (CommonJS) due to `package.json` `"type": "module"`.

**Build output too large**: Run `npm run build` and check `dist/embed.js.map` size. Source maps can be removed if needed.

**Tests fail in jsdom**: Some DOM APIs may not be fully available; use `jest-environment-node` for non-DOM tests.
