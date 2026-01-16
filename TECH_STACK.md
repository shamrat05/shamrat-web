# Tech Stack & Technologies

This project utilizes a modern, high-performance technology stack designed for scalability, user experience, and developer productivity.

## Frontend Core
- **Framework:** [React 19 (Beta)](https://react.dev/) - Utilizing the latest concurrent features and compiler readiness.
- **Language:** [TypeScript 5](https://www.typescriptlang.org/) - For type-safe code and better developer tooling.
- **Build Tool:** [Vite 7](https://vitejs.dev/) - Extremely fast development server and bundler.
- **Routing:** [React Router v7](https://reactrouter.com/) - Client-side routing with lazy loading capabilities.

## Styling & Animations
- **CSS Framework:** [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS with PostCSS integration.
- **Animations (UI):** [Framer Motion](https://www.framer.com/motion/) - Complex UI transitions and layout animations.
- **Animations (Particles):** [PixiJS v7](https://pixijs.com/) & [@pixi/react](https://pixijs.io/pixi-react/) - WebGL-powered particle effects for high performance.
- **Icons:** [Lucide React](https://lucide.dev/) - Lightweight, consistent icon set.

## State Management & Data Fetching
- **Global State:** [Zustand](https://docs.pmnd.rs/zustand) - Lightweight state management with Redux Devtools middleware.
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query) - Asynchronous state management, caching, and data synchronization.

## Performance Optimization
- **Image Optimization:** [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) - Build-time image transformation and optimization.
- **Bundle Analysis:** [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) - Visualize bundle size and chunks.
- **Lazy Loading:** React `lazy` & `Suspense` for code-splitting page components.
- **Concurrent Features:** `useDeferredValue` for responsive filtering.
- **Rendering:** `React.memo` and `useMemo` for reducing unnecessary re-renders.

## Data Visualization
- **Charts:** [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) - Canvas-based responsive charts (Radar chart for skills).

## Backend (Server)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ORM.
- **Security:** Helmet, CORS.

## Deployment & DevOps
- **Frontend Hosting:** [Vercel](https://vercel.com/)
- **Analytics:** Vercel Analytics & Speed Insights.
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk-space efficient package manager.
- **Linting:** ESLint with React Compiler support (planned).

## Project Structure
- **Client-Side:** `src/` (React App)
- **Server-Side:** `server/` (Node/Express API)
- **Shared Config:** `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`
