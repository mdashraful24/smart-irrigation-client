# 🌿 Smart Irrigation System

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=1QLuLW6vBsRfDR3Jttoe0nEeVi_d2Pl4U" alt="Smart Irrigation Dashboard" />
</div>


## 📖 Project Overview

**Smart Irrigation System** is a modern, responsive web application that provides an intelligent interface for monitoring and managing irrigation needs. It offers real-time weather data visualization, field and crop management, and localized support in both **English** and **Bengali**. Built with React 19 and Vite, it delivers a fast, data-rich dashboard experience for farmers and agricultural professionals.

---

## ✨ Key Features

- 🌦️ **Weather Dashboard** — Real-time weather monitoring with interactive charts (temperature, humidity, rainfall)
- 🌾 **Field Information** — Browse and manage field data with detailed visual breakdowns
- 🌱 **Crop Information** — Explore crop-specific data and irrigation recommendations
- 🔐 **Authentication** — Secure Login and Sign-Up flows powered by Firebase
- 🌍 **Internationalization (i18n)** — Full bilingual support (English 🇬🇧 & Bengali 🇧🇩)
- 📊 **Data Visualization** — Rich charts using Chart.js, Recharts, MUI X Charts, and D3.js
- 💫 **Smooth Animations** — Polished UI with Framer Motion animations
- 📱 **Fully Responsive** — Optimized for all screen sizes
- 🔔 **Toast Notifications** — Real-time feedback with React Hot Toast & SweetAlert2

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4, DaisyUI, MUI Material |
| **Routing** | React Router 7 |
| **Authentication** | Firebase 12 |
| **Charts** | Chart.js, Recharts, MUI X Charts, D3.js |
| **Forms** | React Hook Form + Yup validation |
| **Animations** | Framer Motion |
| **i18n** | i18next + react-i18next |
| **Icons** | Lucide React |
| **Language** | JavaScript (ESNext) |

---

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | Core UI library |
| `react-dom` | ^19.2.0 | DOM rendering |
| `react-router` | ^7.13.0 | Client-side routing |
| `firebase` | ^12.9.0 | Authentication & backend |
| `tailwindcss` | ^4.1.18 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.18 | Vite plugin for Tailwind |
| `@mui/material` | ^7.3.8 | Material UI components |
| `@mui/x-charts` | ^8.27.0 | MUI chart components |
| `@emotion/react` | ^11.14.0 | CSS-in-JS (MUI dependency) |
| `@emotion/styled` | ^11.14.1 | Styled components (MUI dependency) |
| `chart.js` | ^4.5.1 | Canvas-based charting |
| `react-chartjs-2` | ^5.3.1 | React wrapper for Chart.js |
| `recharts` | ^3.7.0 | Composable React charts |
| `d3` | ^7.9.0 | Data-driven visualizations |
| `framer-motion` | ^12.38.0 | Animation library |
| `motion` | ^12.29.2 | Motion utilities |
| `i18next` | ^23.16.8 | Internationalization framework |
| `react-i18next` | ^13.5.0 | React bindings for i18next |
| `i18next-browser-languagedetector` | ^8.2.0 | Auto language detection |
| `react-hook-form` | ^7.71.2 | Performant form management |
| `@hookform/resolvers` | ^5.2.2 | Validation schema resolvers |
| `yup` | ^1.7.1 | Schema validation |
| `lucide-react` | ^0.563.0 | Icon library |
| `react-hot-toast` | ^2.6.0 | Toast notifications |
| `sweetalert2` | ^11.26.20 | Styled alert dialogs |
| `react-countup` | ^6.5.3 | Animated number counters |
| `react-fast-marquee` | ^1.6.5 | Scrolling marquee component |
| `react-markdown` | ^10.1.0 | Markdown renderer |
| `react-responsive-carousel` | ^3.2.23 | Responsive image carousel |
| `react-intersection-observer` | ^10.0.3 | Scroll-based visibility hooks |
| `react-helmet-async` | ^3.0.0 | Document head management |
| `swiper` | ^12.1.0 | Touch-friendly slider |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.2.4 | Build tool & dev server |
| `@vitejs/plugin-react` | ^5.1.1 | React plugin for Vite |
| `daisyui` | ^5.5.14 | Tailwind CSS component library |
| `eslint` | ^9.39.1 | Code linter |
| `eslint-plugin-react-hooks` | ^7.0.1 | React hooks lint rules |
| `eslint-plugin-react-refresh` | ^0.4.24 | Fast Refresh lint rules |
| `@types/react` | ^19.2.10 | React type definitions |
| `@types/react-dom` | ^19.2.3 | React DOM type definitions |
| `@types/node` | ^25.2.0 | Node.js type definitions |
| `globals` | ^16.5.0 | Global variables reference |
| `@eslint/js` | ^9.39.1 | ESLint JS config |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8+ or **Yarn**

### Installation & Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/mdashraful24/malta-project-client.git
cd malta-project-client
```

**2. Install dependencies**

```bash
npm install
# or
yarn
```

**3. Configure environment variables**

Create a `.env.local` file in the project root and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**4. Start the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
smart-irrigation-client/
├── public/                    # Static assets
├── src/
│   ├── assets/                # Images and static resources
│   ├── firebase/              # Firebase configuration
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # i18n setup and locale files (EN, BN)
│   ├── layouts/               # Layout components (Root, Auth)
│   ├── pages/
│   │   ├── home/              # Home page
│   │   ├── WeatherDashboard/  # Weather monitoring & charts
│   │   ├── FieldsInfo/        # Field information pages
│   │   ├── CropsInfo/         # Crop data pages
│   │   ├── AboutDetails/      # About section
│   │   ├── auth/              # Login & Sign-Up pages
│   │   ├── HighlightShowcase/ # Feature highlights
│   │   └── shared/            # Shared components (Navbar, Footer)
│   ├── providers/             # Context providers
│   ├── router/                # Route definitions
│   ├── utilities/             # Utility/helper functions
│   ├── main.jsx               # App entry point
│   └── App.jsx                # Root component
├── .env.local                 # Environment variables (not committed)
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── package.json               # Project metadata & dependencies
└── README.md
```

---

## 🌐 Live Links

| Resource | URL |
|----------|-----|
| 🚀 **Live Application** | [http://203.190.12.136/smart_irrigation_system](http://203.190.12.136/smart_irrigation_system) |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please open issues for bugs or feature requests before starting work.

---

## 📄 License

This project is open-source. Add or update a `LICENSE` file at the repository root to specify a license.

---

## 📬 Contact

Maintainer: **Md Ashraful Islam Ratul**

- **Email**: [mdashrafulislam2882@gmail.com](mailto:[mdashrafulislam2882@gmail.com])
- **GitHub**: [github.com/mdashraful24](https://github.com/mdashraful24)
- **LinkedIn**: [linkedin.com/in/ashraful-islam-ratul](https://www.linkedin.com/in/ashraful-islam-ratul)
