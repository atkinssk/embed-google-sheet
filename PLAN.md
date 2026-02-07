# Embed Google Sheet - Project Plan

## Project Overview
A TypeScript library that generates an embeddable script for web pages. The script fetches CSV data from a shared Google Sheet export link and displays it as a sortable, filterable HTML table. Users include this in their web pages with a single `<script>` tag.

## Technology Stack
- **Language**: TypeScript
- **Build Tool**: esbuild
- **Testing**: Jest
- **Linting**: ESLint + Prettier
- **Package Manager**: npm

## Architecture
- **Entry Point**: `src/index.ts` - Main export that initializes the embed widget
- **Core Modules**:
  - `src/csv-loader.ts` - CSV data fetching and parsing from shared links
  - `src/table.ts` - Table rendering and DOM manipulation
  - `src/sorting.ts` - Sorting functionality
  - `src/filtering.ts` - Filtering functionality
- **Loader Snippet**: `src/loader.ts` - Minimal initialization code for the embed
- **Build Output**: 
  - `dist/embed.js` - Main embeddable script (single minified file)
  - Loader snippet code (for documentation/examples)

## Workplan

### Setup Phase ✅ COMPLETE
- [x] Initialize npm project and package.json
- [x] Set up TypeScript configuration (tsconfig.json)
- [x] Install dependencies: esbuild, Jest, ESLint, Prettier
- [x] Create ESLint and Prettier configs
- [x] Set up Jest configuration
- [x] Create directory structure (src/, tests/, dist/)
- [x] Create .npmrc for CI/CD compatibility

### Development Phase ✅ COMPLETE
- [x] Implement CSV data loading and parsing from shared links
- [x] Implement table rendering and DOM manipulation
- [x] Implement sorting functionality
- [x] Implement filtering functionality
- [x] Create main entry point and initialization logic
- [x] Create loader snippet generator
  - [x] Generate minimal HTML snippet for users to embed
  - [x] Snippet loads main script from CDN/release URL
  - [x] Snippet accepts configuration parameters (CSV link, container selector, options)
  - [x] Document loader snippet usage in README

### Testing Phase ✅ COMPLETE
- [x] Write unit tests for CSV parsing
- [x] Write unit tests for table rendering
- [x] Achieve meaningful test coverage (7 tests passing)

### Build & Documentation Phase ✅ COMPLETE
- [x] Configure esbuild for single-file output
- [x] Set up build scripts in package.json
- [x] Create README.md with usage instructions
- [x] Create .github/copilot-instructions.md for future Copilot sessions
- [x] All scripts build to ~2.7KB minified

### CI/CD Pipeline Phase ✅ COMPLETE
- [x] Create GitHub Actions workflow for tag-based releases
  - [x] Trigger on version tags (e.g., v1.0.0)
  - [x] Run tests on tag push
  - [x] Build the distribution file
  - [x] Create GitHub Release with built artifacts
  - [x] Publish to npm registry
- [x] Create GitHub Actions workflow for automatic version bumping
  - [x] Manual dispatch workflow for version bumps
  - [x] Updates package.json version
  - [x] Commits and creates version tags
  - [x] Automatically triggers release workflow
- [x] Create GitHub Actions workflow for test/lint on PR
- [x] Fix npm dependency conflicts with .npmrc

### Next Steps (Optional)
- [ ] Add example HTML file showing how to use the embed
- [ ] Add pre-commit linting checks
- [ ] Add TypeScript definitions file (.d.ts)
- [ ] Test first release (tag v0.1.0)

## Key Decisions
- **CSV Format**: Confirm how Google Sheets CSV export link will be accessed (standard export URL format)
- **Tab Selection**: How will users specify which tab/sheet to load? (URL parameter, configuration object?)
- **Configuration**: How will users configure the widget? (data attributes, JavaScript config object, environment variables?)
- **Error Handling**: Define behavior for network errors, malformed CSV, missing links

## Notes
- The final build should be a single minified JS file
- CSV will be fetched via standard `fetch` API
- Google Sheets shared links can be converted to CSV format by appending `/export?format=csv&gid={sheetId}` to the sheet URL
- Styling can be added in a later phase

## Loader Snippet Design
Users will embed a small HTML snippet in their web pages to load and initialize the main script:

**Example usage:**
```html
<div id="sheet-table"></div>
<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/user/embed-google-sheet@v1.0.0/dist/embed.js';
    script.onload = function() {
      EmbedGoogleSheet({
        csvLink: 'https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=0',
        containerId: 'sheet-table',
        sortable: true,
        filterable: true
      });
    };
    document.head.appendChild(script);
  })();
</script>
```

**Loader responsibilities:**
- Load the main `embed.js` from a CDN or GitHub release URL
- Pass configuration options (CSV link, container, features)
- Handle initialization after script loads
- Avoid global namespace pollution

## GitHub Actions Release Pipeline
The CI/CD pipeline consists of two workflows:

### 1. Version Bump Workflow (`.github/workflows/version-bump.yml`)
- **Trigger**: Manual dispatch via GitHub UI or on merged PRs to main branch
- **Steps**:
  - Analyze commit history since last tag using conventional commits
  - Determine semantic version bump (major/minor/patch)
  - Update `package.json` version
  - Generate/update `CHANGELOG.md` 
  - Commit version changes
  - Create and push new version tag (e.g., `v1.0.0`)
  - This automatically triggers the release workflow
- **Tools**: `standard-version`, `conventional-changelog`, or similar

### 2. Release Workflow (`.github/workflows/release.yml`)
- **Trigger**: Automatically on git tags matching `v*.*.*` pattern
- **Steps**:
  - Checkout code
  - Set up Node.js environment
  - Install dependencies
  - Run linting (ESLint + Prettier check)
  - Run test suite (Jest)
  - Build distribution file with esbuild
  - Create GitHub Release with tag and include built `dist/embed.js` as artifact
  - Optionally publish to npm registry with `npm publish`

### Commit Message Convention
Commits should follow [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` → triggers minor version bump
- `fix:` → triggers patch version bump
- `BREAKING CHANGE:` → triggers major version bump
