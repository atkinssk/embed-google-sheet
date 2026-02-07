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

### Setup Phase
- [ ] Initialize npm project and package.json
- [ ] Set up TypeScript configuration (tsconfig.json)
- [ ] Install dependencies: esbuild, Jest, ESLint, Prettier
- [ ] Create ESLint and Prettier configs
- [ ] Set up Jest configuration
- [ ] Create directory structure (src/, tests/, dist/)

### Development Phase
- [ ] Implement CSV data loading and parsing from shared links
- [ ] Implement table rendering and DOM manipulation
- [ ] Implement sorting functionality
- [ ] Implement filtering functionality
- [ ] Create main entry point and initialization logic
- [ ] Create loader snippet generator
  - [ ] Generate minimal HTML snippet for users to embed
  - [ ] Snippet loads main script from CDN/release URL
  - [ ] Snippet accepts configuration parameters (CSV link, container selector, options)
  - [ ] Document loader snippet usage in README

### Testing Phase
- [ ] Write unit tests for each module
- [ ] Write integration tests for full flow
- [ ] Achieve meaningful test coverage

### Build & Documentation Phase
- [ ] Configure esbuild for single-file output
- [ ] Set up build scripts in package.json
- [ ] Create README.md with usage instructions
- [ ] Create .github/copilot-instructions.md for future Copilot sessions
- [ ] Add example HTML file showing how to use the embed

### CI/CD Pipeline Phase
- [ ] Create GitHub Actions workflow for tag-based releases
  - [ ] Trigger on version tags (e.g., v1.0.0)
  - [ ] Run tests on tag push
  - [ ] Build the distribution file
  - [ ] Create GitHub Release with built artifacts
  - [ ] Publish to npm registry (optional)
- [ ] Create GitHub Actions workflow for automatic version bumping
  - [ ] Analyze commits since last tag (using conventional commits)
  - [ ] Determine semver bump (major/minor/patch)
  - [ ] Update package.json version
  - [ ] Update CHANGELOG.md
  - [ ] Create and push new version tag
  - [ ] Trigger release workflow automatically

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
