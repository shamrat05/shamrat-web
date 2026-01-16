# Md. Shamrat Hossain - Modern Portfolio Website

A world-class, high-performance portfolio website built with cutting-edge technologies, featuring buttery-smooth animations, data visualizations, and modern UI/UX design.

## 🚀 Tech Stack

- **React 18** - Latest React with Concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom configurations
- **Framer Motion** - Professional animation library
- **Zustand** - Lightweight state management
- **Chart.js** - Beautiful data visualizations
- **Lucide React** - Modern icon library
- **Node.js & Express** - Backend server with MongoDB

## ✨ Features

- 🎨 **Modern Design** - Dark theme with gradient accents and glass morphism
- 🎬 **Smooth Animations** - Framer Motion for buttery-smooth transitions
- 📊 **Data Visualization** - Interactive charts with Chart.js
- 🎯 **Performance** - Optimized with Vite for fast load times
- 📱 **Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - WCAG compliant components
- 🔍 **SEO Ready** - Semantic HTML and metadata
- 🌙 **Dark Mode** - Beautiful dark theme by default

## 📁 Project Structure

```
src/
├── components/        # React components
│   ├── Navigation.tsx # Main navigation with smooth animations
│   ├── Hero.tsx       # Hero section with mouse-tracking effects
│   ├── About.tsx      # About section with floating cards
│   ├── Skills.tsx     # Skills with Chart.js visualization
│   ├── Experience.tsx # Timeline with animations
│   ├── Projects.tsx   # Project showcase grid
│   ├── Blog.tsx       # Blog posts listing
│   ├── Contact.tsx    # Contact form
│   ├── Footer.tsx     # Footer with social links
│   └── index.ts       # Component exports
├── store/             # Zustand store
│   └── portfolioStore.ts
├── types/             # TypeScript types
│   └── index.ts
├── hooks/             # Custom React hooks
│   └── index.ts
├── data/             # Local data fallback
│   └── localData.ts
├── App.tsx            # Main App component
├── main.tsx           # Entry point
└── index.css          # Tailwind CSS with custom styles
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   pnpm install
   ```
2. Create `.env` file in `server/` (see `.env.example`).
3. Start the server:
   ```bash
   pnpm dev
   ```

### Frontend Development Server

1. Create `.env` file in root (see `.env.example`).
2. Start the dev server:
   ```bash
   pnpm dev
   ```

The site will be available at `http://localhost:5173/`

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## 🎨 Customization

### Colors
Edit the Tailwind config in `tailwind.config.js`:

```js
colors: {
  primary: { /* Sky blue colors */ },
  dark: { /* Dark gray colors */ }
}
```

## 🚀 Deployment

### Vercel (Recommended for Frontend)

```bash
pnpm build
# Deploy the dist folder to Vercel
```

### Backend Deployment
Deploy the `server` directory to a Node.js hosting provider (e.g., Render, Railway, DigitalOcean). Set the `MONGODB_URI` environment variable.

## 📄 License

MIT License - feel free to use this portfolio for inspiration!

## 👨‍💻 Author

**Md. Shamrat Hossain**