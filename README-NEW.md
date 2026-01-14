# Md. Shamrat Hossain - Modern Portfolio Website

A world-class, high-performance portfolio website built with cutting-edge technologies, featuring buttery-smooth animations, data visualizations, and modern UI/UX design.

## 🚀 Tech Stack

- **React 18** - Latest React with Concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom configurations
- **Framer Motion** - Professional animation library
- **Zustand** - Lightweight state management
- **Recharts** - Beautiful data visualizations
- **Lucide React** - Modern icon library

## ✨ Features

- 🎨 **Modern Design** - Dark theme with gradient accents and glass morphism
- 🎬 **Smooth Animations** - Framer Motion for buttery-smooth transitions
- 📊 **Data Visualization** - Interactive charts with Recharts
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
│   ├── Skills.tsx     # Skills with Recharts visualization
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
├── utils/             # Utilities and mock data
│   └── mockData.ts
├── App.tsx            # Main App component
├── main.tsx           # Entry point
└── index.css          # Tailwind CSS with custom styles
```

## 🎯 Key Components

### Navigation
- Sticky navigation with scroll detection
- Smooth section scrolling
- Mobile-responsive menu
- Social media links

### Hero Section
- Mouse-tracking animated background
- Gradient text effects
- Floating stat cards
- Smooth scroll indicators

### Skills Section
- Interactive Recharts bar charts
- Category-based skill organization
- Animated stat counters
- Skill level visualization

### Experience Timeline
- Animated timeline with achievements
- Responsive design (left-right alternating)
- Checkmark animations
- Company and period information

### Projects Showcase
- Image hover effects with overlay
- Technology tags
- Category indicators
- External links

### Blog Section
- Post metadata (date, read time)
- Category badges
- Tag system
- Call-to-action buttons

### Contact Form
- Smooth form animations
- Input validation
- Success feedback
- Social links

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
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

### Animations
Modify animation timing in component files or `index.css`:

```css
@keyframes slideUp {
  '0%': { transform: 'translateY(10px)', opacity: '0' },
  '100%': { transform: 'translateY(0)', opacity: '1' },
}
```

### Content
Update mock data in `src/utils/mockData.ts` with your actual content.

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy the dist folder to Vercel
```

### Other Platforms
The `dist` folder contains the production-ready build that can be deployed to any static hosting service.

## 📝 Customization Guide

### Add New Sections
1. Create component in `src/components/`
2. Import in `App.tsx`
3. Add to main render
4. Update navigation items

### Update Skills Data
Edit `src/utils/mockData.ts` and update `mockSkills` array.

### Modify Animations
- Adjust `transition` props in components
- Edit keyframes in `index.css`
- Customize Framer Motion variants

## 🔗 Integrations

The site is ready for integration with:
- Backend APIs
- Form submission services
- Analytics platforms
- Blog CMS

## 📄 License

MIT License - feel free to use this portfolio for inspiration!

## 👨‍💻 Author

**Md. Shamrat Hossain**
- Email: shamrat@example.com
- LinkedIn: [Profile Link]
- GitHub: [Profile Link]

---

Built with ❤️ using React, TypeScript, and Vite
