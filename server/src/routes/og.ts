import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const { title } = req.query;
  
  // In a real implementation, we would use 'satori' or 'canvas' to generate an image
  // For now, we'll return a placeholder SVG that displays the title
  
  const width = 1200;
  const height = 630;
  const text = (title as string) || 'Shamrat Portfolio';
  
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0A0A0A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="60" fill="#0A84FF" font-weight="bold">
        ${text}
      </text>
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#A1A1AA">
        Md. Shamrat Hossain
      </text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

export default router;
