# Smart Irrigation — Client

Professional, production-ready front-end client for the Smart Irrigation system.

## Project Overview

This repository contains the web client for Smart Irrigation — a responsive React application built with Vite that provides an interface for monitoring weather, fields, crops, and irrigation needs. It includes internationalization support, a dashboard, and reusable UI components.

## Key Features

- Responsive UI and modern React structure
- Weather dashboard with charts and station data
- Field and crop information pages
- Authentication (login / signup) flows
- Internationalization (English and Bengali)

## Technology Stack

- Frontend: React (JSX), Vite
- Languages: JavaScript (ESNext), CSS
- Bundler / dev server: Vite

## Prerequisites

- Node.js 16+ and npm or Yarn

## Quick Start

1. Install dependencies

```bash
npm install
# or
yarn
```

2. Run the development server

```bash
npm run dev
# or
yarn dev
```

3. Build for production

```bash
npm run build
# or
yarn build
```

4. Preview production build

```bash
npm run preview
# or
yarn preview
```

## Project Structure (high level)

- `src/` — application source
  - `pages/` — top-level pages and views
  - `layouts/` — layout components (Root, Auth)
  - `router/` — route definitions
  - `i18n/` — internationalization setup and locale files
  - `assets/` — images and static assets

## Internationalization

Locales are stored under `src/i18n/locales` (English and Bengali). The app uses a lightweight i18n setup — update or add translations there.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests and create pull requests for contributions. Keep commits focused and include brief descriptions.

## License

This project uses an open-source license. Add or update a `LICENSE` file at the repository root if you intend to specify a license.

## Contact

Maintainer: Project team — reach out via repository issues or your preferred team channel.

---