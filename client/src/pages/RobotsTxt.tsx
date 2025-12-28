import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Robots.txt Generator
 * 
 * Generates robots.txt content for search engine crawlers
 * 
 * In production:
 * - Place robots.txt in your public/static folder root
 * - Update sitemap URL to your actual domain
 * - Consider which paths to disallow (admin, auth, etc.)
 */
const RobotsTxt = () => {
  // TODO: Replace with your actual production domain
  const BASE_URL = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://yourdomain.com';

  const robotsTxt = `# robots.txt for ${BASE_URL}

# Allow all crawlers to access all content
User-agent: *
Allow: /

# Disallow admin and authentication pages from indexing
Disallow: /admin/
Disallow: /auth/

# Disallow all tool pages (only blog should be indexed)
Disallow: /uppercase
Disallow: /lowercase
Disallow: /title-case
Disallow: /camel-case
Disallow: /snake-case
Disallow: /kebab-case
Disallow: /trim
Disallow: /remove-spaces
Disallow: /remove-blank-lines
Disallow: /sort-lines
Disallow: /number-lines
Disallow: /find-replace
Disallow: /statistics
Disallow: /json-formatter
Disallow: /xml-formatter
Disallow: /html-entities
Disallow: /tabs-spaces
Disallow: /newline-converter
Disallow: /base64
Disallow: /url-encoder
Disallow: /caesar-cipher
Disallow: /morse-code
Disallow: /rot13
Disallow: /lorem-generator
Disallow: /password-generator
Disallow: /ascii-generator
Disallow: /qr-generator
Disallow: /reverse-text
Disallow: /mirror-text
Disallow: /upside-down
Disallow: /leet-speak
Disallow: /slugify
Disallow: /unicode-normalizer
Disallow: /emoji-picker
Disallow: /sample-data-generator
Disallow: /markdown-editor
Disallow: /diff-checker
Disallow: /regex-tester
Disallow: /word-cloud-generator
Disallow: /csv-json-converter

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay (optional, in seconds)
# Crawl-delay: 10
`;

  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('robots.txt downloaded successfully');
  };

  const copyRobotsTxt = () => {
    navigator.clipboard.writeText(robotsTxt);
    toast.success('robots.txt copied to clipboard');
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Robots.txt Generator</h1>
        <p className="text-muted-foreground">
          Control search engine crawler access to your website
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>robots.txt Content</span>
            <div className="flex gap-2">
              <Button onClick={copyRobotsTxt} size="sm" variant="outline">
                Copy
              </Button>
              <Button onClick={downloadRobotsTxt} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm font-mono">
            {robotsTxt}
          </pre>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">Setup Instructions</h3>
            <ol className="text-sm space-y-2 text-blue-800 dark:text-blue-300 list-decimal list-inside">
              <li>Download this robots.txt file</li>
              <li>Place it in your website root directory (e.g., https://yourdomain.com/robots.txt)</li>
              <li>Test it by visiting https://yourdomain.com/robots.txt in your browser</li>
              <li>Validate using Google's robots.txt Tester in Search Console</li>
              <li>Update the BASE_URL to your actual production domain</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobotsTxt;
