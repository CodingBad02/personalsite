// src/pages/api/blog/[slug].js — blog hits + hearts.
// GET  -> { available, hits, hearts }
// POST { type: 'view' }              -> register a view
// POST { type: 'heart', delta: n }   -> add n hearts (clamped server-side)
import { getAllPostSlugs } from '../../../data/blogPosts';
import { getStats, addView, addHearts, isConfigured } from '../../../utils/blogStore';

export default async function handler(req, res) {
  const slug = req.query.slug;
  const validSlugs = getAllPostSlugs();
  if (!slug || !validSlugs.includes(slug)) {
    return res.status(404).json({ message: 'Unknown post.' });
  }

  if (!isConfigured()) {
    // No datastore yet — tell the client to use its localStorage fallback.
    return res.status(200).json({ available: false, hits: 0, hearts: 0 });
  }

  try {
    if (req.method === 'GET') {
      const stats = await getStats(slug);
      return res.status(200).json({ available: true, ...stats });
    }

    if (req.method === 'POST') {
      const type = req.body?.type;
      if (type === 'view') {
        const hits = await addView(slug);
        return res.status(200).json({ available: true, hits });
      }
      if (type === 'heart') {
        const hearts = await addHearts(slug, req.body?.delta);
        return res.status(200).json({ available: true, hearts });
      }
      return res.status(400).json({ message: 'Unknown action.' });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  } catch (err) {
    console.error('blog stats error:', err);
    return res.status(500).json({ message: 'Stats unavailable.' });
  }
}
