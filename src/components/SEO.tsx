import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  jsonLd?: object | object[];
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  noindex?: boolean;
}

/**
 * Reusable SEO Component
 * 
 * Handles all SEO meta tags, Open Graph, Twitter Cards, and JSON-LD
 * Best practices:
 * - Keep titles under 60 characters
 * - Keep descriptions under 160 characters
 * - Always provide canonical URLs to avoid duplicate content issues
 * - Use appropriate Open Graph types (website for pages, article for blogs)
 * - Always include JSON-LD structured data for better search engine understanding
 */
export const SEO = ({
  title,
  description,
  keywords = [],
  canonical,
  ogType = 'website',
  ogImage,
  ogUrl,
  twitterCard = 'summary_large_image',
  author,
  publishedDate,
  modifiedDate,
  jsonLd,
  geoRegion,
  geoPlacename,
  geoPosition,
  noindex = false,
}: SEOProps) => {
  // Get the current URL if not provided
  const currentUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const canonicalUrl = canonical || currentUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL - Critical for SEO */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta Tag */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Tags - For Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:alt" content={title} />}
      <meta property="og:site_name" content="TextTransformer Blog" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {ogType === 'article' && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {ogType === 'article' && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === 'article' && keywords.length > 0 && 
        keywords.map(keyword => (
          <meta key={keyword} property="article:tag" content={keyword} />
        ))
      }
      
      {/* Twitter Card Tags - For Twitter/X */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image:alt" content={title} />}
      {/* TODO: Add your Twitter handle when available */}
      {/* <meta name="twitter:site" content="@yourtwitterhandle" /> */}
      {/* <meta name="twitter:creator" content="@authortwitterhandle" /> */}
      
      {/* GEO Tags - For location-based SEO */}
      {geoRegion && <meta name="geo.region" content={geoRegion} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
      {geoPosition && <meta name="geo.position" content={geoPosition} />}
      {geoPosition && <meta name="ICBM" content={geoPosition} />}
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#000000" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, null, 2)}
        </script>
      )}
    </Helmet>
  );
};
