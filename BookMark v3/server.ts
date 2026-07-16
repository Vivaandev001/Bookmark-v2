import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// API route: Extract metadata from website URL
app.get('/api/extract', async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    res.status(400).json({ error: 'URL parameter is required' });
    return;
  }

  // Normalize URL
  let normalizedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  try {
    let domain = '';
    try {
      const urlObj = new URL(normalizedUrl);
      domain = urlObj.hostname;
    } catch {
      res.status(400).json({ error: 'Invalid URL format' });
      return;
    }

    // Set up a controller to abort if request takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch website (HTTP ${response.status})`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      // Not an HTML page (might be direct asset/file)
      res.json({
        name: domain.replace(/^www\./i, ''),
        logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        description: 'Web asset',
        url: normalizedUrl,
      });
      return;
    }

    const html = await response.text();

    // Parse Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    let name = titleMatch ? titleMatch[1].trim() : '';
    // Unescape common HTML entities in title
    name = name
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    if (!name) {
      name = domain.replace(/^www\./i, '');
    }

    // Parse Description
    const descMatch = 
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i) ||
      html.match(/<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["']/i) ||
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([\s\S]*?)["']/i) ||
      html.match(/<meta[^>]+content=["']([\s\S]*?)["'][^>]+property=["']og:description["']/i);
    
    let description = descMatch ? descMatch[1].trim() : '';
    description = description
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    if (!description) {
      description = `Personal bookmarked application for ${domain}.`;
    }

    // Parse custom high-res icons or fallback to Google favicon resolver
    let logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const iconMatch = 
      html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:shortcut )?icon["']/i) ||
      html.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]+href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']apple-touch-icon["']/i);

    if (iconMatch && iconMatch[1]) {
      let iconHref = iconMatch[1].trim();
      if (iconHref.startsWith('//')) {
        logo = 'https:' + iconHref;
      } else if (iconHref.startsWith('/')) {
        const urlObj = new URL(normalizedUrl);
        logo = `${urlObj.protocol}//${urlObj.host}${iconHref}`;
      } else if (!/^https?:\/\//i.test(iconHref)) {
        // Relative to base
        const urlObj = new URL(normalizedUrl);
        const pathParts = urlObj.pathname.split('/');
        pathParts.pop(); // remove file name
        const basePath = pathParts.join('/');
        logo = `${urlObj.protocol}//${urlObj.host}${basePath}/${iconHref}`;
      } else {
        logo = iconHref;
      }
    }

    res.json({
      name,
      logo,
      description,
      url: normalizedUrl,
    });

  } catch (error: any) {
    // If external fetch fails, fallback gracefully by computing domain details
    let domain = 'Website';
    try {
      const cleaned = normalizedUrl.replace(/^https?:\/\/(www\.)?/i, '');
      domain = cleaned.split('/')[0];
    } catch {}

    const name = domain.charAt(0).toUpperCase() + domain.slice(1);
    res.json({
      name,
      logo: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      description: `Saved application for ${domain}.`,
      url: normalizedUrl,
      fallback: true,
      error: error.message || 'Fetch failed',
    });
  }
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BOOKMARK] Server running at http://localhost:${PORT}`);
  });
}

startServer();
