import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { CMSModel } from './models/CMS';
import { seedData } from './seedData';
import chatRoutes from './routes/chat';
import ogRoutes from './routes/og';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shamrat-portfolio';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if data exists, if not, seed it
    const count = await CMSModel.countDocuments();
    if (count === 0) {
      console.log('Seeding initial data...');
      await CMSModel.create(seedData);
      console.log('Data seeded successfully');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/og', ogRoutes);

app.get('/api/cms', async (req: Request, res: Response) => {
  try {
    const data = await CMSModel.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CMS data' });
  }
});

// Sitemap Endpoint for SEO
app.get('/sitemap.xml', async (req: Request, res: Response) => {
  try {
    const data = await CMSModel.findOne();
    if (!data) return res.status(404).send('No data found');

    const baseUrl = 'https://shamrat.me'; // Replace with actual domain
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

    data.posts.forEach((post: any) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    data.projects.forEach((project: any) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/portfolio/${project.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
