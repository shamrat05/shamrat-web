import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { localData } from '../src/data/localData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://shamrat.vercel.app';

const generateSitemap = () => {
  const sectionRoutes = [
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/experience', priority: '0.9', changefreq: 'monthly' },
    { path: '/skills', priority: '0.9', changefreq: 'monthly' },
    { path: '/projects', priority: '0.9', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.8', changefreq: 'daily' },
    { path: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { path: '/resume', priority: '0.8', changefreq: 'weekly' },
  ];

  const projectRoutes = localData.projects.map((project) => ({
    path: `/portfolio/${project.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const blogRoutes = localData.posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  const allRoutes = [...staticRoutes, ...sectionRoutes, ...projectRoutes, ...blogRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes
  .map((route) => `  <url>
    <loc>${BASE_URL}${route.path || '/'}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap generated at ${sitemapPath}`);
};

generateSitemap();
