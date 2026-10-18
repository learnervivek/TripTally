# TripTally — Collaborative Trip Planning & Expense Tallying

TripTally is a modern, collaborative group travel planning application built with the MERN stack. Designed with a warm ivory and deep forest-green aesthetic inspired by boutique travel journals and high-end travel marketplaces.

---

## 🎨 Design System & Palette

- **Ivory Canvas**: `#FAF8F5` / `#FDFCF9`
- **Forest Green Accents**: `#1B4332` (Primary), `#081C15` (Deep), `#DDF0E6` (Tint)
- **Charcoal Typography**: `#1A1D1C` / `#454E4A`
- **Terracotta Warm Highlights**: `#E07A5F`
- **Subtle Ivory Borders**: `#EAE3D6`
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Playfair Display*)
- **Interactive Particle Dot-Globe**: Pure HTML5 Canvas 3D Fibonacci sphere inspired by Framer AISOL dot-globe

---

## 🏗️ Architecture & Tech Stack

### Frontend (`client/`)
- **Core**: React 18 + Vite 6
- **Styling**: Tailwind CSS v3.4 + PostCSS + Autoprefixer
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers`)
- **HTTP Client**: Axios (configured with `withCredentials: true` for HTTP-only JWT cookies)
- **Visuals & Charts**: Recharts & HTML5 Canvas DotGlobe
- **Testing**: Vitest + React Testing Library + Jest-DOM + JSDOM

### Backend (`server/`)
- **Runtime**: Node.js v24+ (ES Modules)
- **Framework**: Express.js REST API
- **Database**: MongoDB Atlas with Mongoose schemas
- **Authentication**: JWT stored in secure HTTP-only cookies with bcrypt password hashing
- **File Uploads**: Cloudinary with local development fallback
- **Testing**: Vitest + Supertest

---

## 🚀 Quick Start

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Start both Frontend and Backend concurrently
```bash
npm run dev
```

Or run them individually:
```bash
npm run dev:server  # Runs Express API on http://localhost:5001
npm run dev:client  # Runs Vite React app on http://localhost:5173
```

### 3. Run Test Suites
```bash
npm test            # Runs backend Supertest and frontend RTL test suites
```

---

## 🧩 UI Component Library (`client/src/components/ui/`)

| Component | Features |
| :--- | :--- |
| **`Button`** | Variants (`primary`, `secondary`, `outline`, `accent`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`, `icon`), built-in SVG spinner, accessible focus ring |
| **`Input`** | Accessible label, helper text, error indicator, leading/trailing icons, React Hook Form integration |
| **`Card`** | Subcomponents: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, variants (`interactive`, `glass`, `forest`) |
| **`Dialog`** | Accessible modal dialog with focus trap, backdrop blur, escape key listener, and scroll lock |
| **`Badge`** | Status indicators (`forest`, `terracotta`, `success`, `warning`, `danger`, `neutral`, `dark`) with optional status dot |
| **`Skeleton`** | Loading placeholders: `Skeleton`, `TripCardSkeleton`, `TableRowSkeleton`, `StatSkeleton` |
| **`EmptyState`** | Illustration placeholder for empty trips, itinerary items, or expenses with primary CTA |
| **`Toast`** | Notification provider (`useToast()`) with `toast.success`, `error`, `warning`, `info` and auto-dismiss |
| **`DotGlobe`** | Interactive rotating 3D particle sphere using HTML5 Canvas with mouse drag rotation |

---

## 🧪 Testing Summary

- **Frontend Component Tests**: `client/src/test/components.test.jsx` (5/5 passed)
- **Backend API Integration Tests**: `server/src/test/health.test.js` (3/3 passed)
- **Live Browser Verification**: Automated end-to-end verification of components, modals, form validation, and skeleton toggles recorded via `browser_subagent`.
