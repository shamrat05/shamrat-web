import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { localData } from '../src/data/localData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://shamrat.vercel.app';

const generateSitemap = () => {
  const staticRoutes = [
    '',
    '/blog',
    '/portfolio',
    '/resume',
  ];

  const projectRoutes = localData.projects.map((project) => `/portfolio/${project.slug}`);
  const blogRoutes = localData.posts.map((post) => `/blog/${post.slug}`);

  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap generated at ${sitemapPath}`);
};

generateSitemap();
