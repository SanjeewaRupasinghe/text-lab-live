import { useEffect, useState } from 'react';
import { useBlogStore } from '@/stores/blogStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Dynamic Sitemap Generator
 * 
 * Generates XML sitemap based on published blog posts
 * In production, this should be server-side generated or use a build-time plugin
 * 
 * SEO Best Practices:
 * - Update sitemaps whenever content changes
 * - Include all important pages (homepage, blog list, individual posts)
 * - Set appropriate priorities (0.0 to 1.0)
 * - Include lastmod dates for better crawl efficiency
 * - Keep sitemaps under 50,000 URLs or 50MB
 * 
 * TODO for Production:
 * - Move to server-side generation or build-time static generation
 * - Submit sitemap URL to Google Search Console and Bing Webmaster Tools
 * - Add sitemap URL to robots.txt
 * - Consider sitemap index if you have multiple content types
 */
const Sitemap = () => {
  const { blogs, fetchBlogs } = useBlogStore();
  const [sitemapXml, setSitemapXml] = useState('');
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  // Base URL - TODO: Replace with your actual domain
  const BASE_URL = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://yourdomain.com'; // Replace with actual production URL

  const generateSitemap = () => {
    // Get only published blogs
    const publishedBlogs = blogs.filter(blog => blog.status === 'published');

    // Static pages
    const staticPages = [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        url: '/blogs',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.9',
      },
    ];

    // Dynamic blog pages
    const blogPages = publishedBlogs.map(blog => ({
      url: `/blog/${blog.slug}`,
      lastmod: blog.updatedAt,
      changefreq: 'weekly' as const,
      priority: '0.8',
    }));

    // Combine all pages
    const allPages = [...staticPages, ...blogPages];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    setSitemapXml(xml);
    setLastGenerated(new Date());
  };

  useEffect(() => {
    fetchBlogs().then(() => {
      generateSitemap();
    });
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      generateSitemap();
    }
  }, [blogs]);

  const downloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Sitemap downloaded successfully');
  };

  const copySitemap = () => {
    navigator.clipboard.writeText(sitemapXml);
    toast.success('Sitemap copied to clipboard');
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dynamic Sitemap Generator</h1>
        <p className="text-muted-foreground">
          Automatically generates XML sitemap based on published blog posts
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Sitemap Statistics</span>
            <Button onClick={generateSitemap} size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total URLs</p>
              <p className="text-2xl font-bold">{blogs.filter(b => b.status === 'published').length + 2}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Static Pages</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blog Posts</p>
              <p className="text-2xl font-bold">{blogs.filter(b => b.status === 'published').length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Generated</p>
              <p className="text-sm font-medium">
                {lastGenerated ? lastGenerated.toLocaleString() : 'Not yet'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Sitemap XML</span>
            <div className="flex gap-2">
              <Button onClick={copySitemap} size="sm" variant="outline">
                Copy
              </Button>
              <Button onClick={downloadSitemap} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-xs font-mono max-h-[600px] overflow-y-auto">
            {sitemapXml}
          </pre>
          
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-200">Production Setup Instructions</h3>
            <ol className="text-sm space-y-2 text-amber-800 dark:text-amber-300 list-decimal list-inside">
              <li>Download this sitemap.xml file</li>
              <li>Upload it to your website root directory (e.g., https://yourdomain.com/sitemap.xml)</li>
              <li>Add sitemap URL to your robots.txt: <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">Sitemap: https://yourdomain.com/sitemap.xml</code></li>
              <li>Submit sitemap URL to Google Search Console</li>
              <li>Submit sitemap URL to Bing Webmaster Tools</li>
              <li>Set up automatic regeneration whenever blog posts are published/updated</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sitemap;
