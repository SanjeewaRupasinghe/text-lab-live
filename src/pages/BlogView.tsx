import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogStore } from '@/stores/blogStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowLeft, Calendar, Eye, MapPin, User, Code } from 'lucide-react';
import { format } from 'date-fns';
import { SEO } from '@/components/SEO';
import { NewsletterModal } from '@/components/NewsletterModal';

const BlogView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { currentBlog, fetchBlogBySlug, incrementViewCount, clearCurrentBlog } = useBlogStore();
  const [showDevMode, setShowDevMode] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
    return () => clearCurrentBlog();
  }, [slug, fetchBlogBySlug, clearCurrentBlog]);

  useEffect(() => {
    if (currentBlog && currentBlog.status === 'published') {
      // Increment view count when blog is loaded
      incrementViewCount(currentBlog.id);
    }
  }, [currentBlog?.id]);

  if (!currentBlog) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-muted-foreground">Blog post not found</p>
        <Button variant="outline" onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  // Generate comprehensive JSON-LD for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": currentBlog.title,
    "description": currentBlog.metaTags.description,
    "author": {
      "@type": "Person",
      "name": currentBlog.author
    },
    "datePublished": currentBlog.publishedDate,
    "dateModified": currentBlog.updatedAt,
    "image": currentBlog.featureImage,
    "publisher": {
      "@type": "Organization",
      "name": "TextTransformer Blog", // TODO: Replace with your organization name
      "logo": {
        "@type": "ImageObject",
        "url": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '' // TODO: Add your logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : ''
    }
  };

  // Generate FAQ schema if FAQs exist
  const faqSchema = currentBlog.faqs && currentBlog.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentBlog.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Combine schemas or use custom JSON-LD
  const jsonLd = currentBlog.customJsonLd 
    ? JSON.parse(currentBlog.customJsonLd)
    : faqSchema ? [articleSchema, faqSchema] : articleSchema;
  
  // Get canonical URL
  const canonicalUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blog/${currentBlog.slug}` 
    : '';

  return (
    <>
      {/* SEO Meta Tags using reusable SEO component */}
      <SEO
        title={currentBlog.metaTags.title || currentBlog.title}
        description={currentBlog.metaTags.description}
        keywords={currentBlog.metaTags.keywords}
        canonical={canonicalUrl}
        ogType="article"
        ogImage={currentBlog.featureImage || undefined}
        ogUrl={canonicalUrl}
        twitterCard="summary_large_image"
        author={currentBlog.author}
        publishedDate={currentBlog.publishedDate || undefined}
        modifiedDate={currentBlog.updatedAt}
        jsonLd={jsonLd}
        geoRegion={currentBlog.geoTag?.region}
        geoPlacename={currentBlog.geoTag?.placename}
        geoPosition={currentBlog.geoTag?.position}
      />

      <article className="container mx-auto p-6 max-w-4xl" role="main">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Feature Image */}
        {currentBlog.featureImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={currentBlog.featureImage} 
              alt={currentBlog.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge>{currentBlog.status}</Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDevMode(!showDevMode)}
            >
              <Code className="w-4 h-4 mr-2" />
              {showDevMode ? 'Hide' : 'Show'} SEO Debug
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-4">{currentBlog.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{currentBlog.author}</span>
            </div>
            {currentBlog.publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(currentBlog.publishedDate), 'MMMM d, yyyy')}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{currentBlog.viewCount.toLocaleString()} views</span>
            </div>
            {currentBlog.geoTag && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{currentBlog.geoTag.placename}, {currentBlog.geoTag.region}</span>
              </div>
            )}
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: currentBlog.description }}
        />

        {/* FAQs */}
        {currentBlog.faqs && currentBlog.faqs.length > 0 && (
          <Card className="mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {currentBlog.faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* Newsletter Modal - appears after 5s or 50% scroll */}
        <NewsletterModal delay={5000} scrollTrigger={50} />

        {/* Keywords */}
        {currentBlog.metaTags.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {currentBlog.metaTags.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        )}

        {/* Dev Mode: SEO Debug Info */}
        {showDevMode && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                SEO Debug Information
              </h3>
              
              <div className="space-y-4 text-sm font-mono">
                <div>
                  <strong className="text-foreground">Meta Title:</strong>
                  <p className="text-muted-foreground mt-1">{currentBlog.metaTags.title || currentBlog.title}</p>
                </div>
                
                <div>
                  <strong className="text-foreground">Meta Description:</strong>
                  <p className="text-muted-foreground mt-1">{currentBlog.metaTags.description}</p>
                </div>
                
                <div>
                  <strong className="text-foreground">Keywords:</strong>
                  <p className="text-muted-foreground mt-1">{currentBlog.metaTags.keywords.join(', ')}</p>
                </div>

                {currentBlog.geoTag && (
                  <>
                    <div>
                      <strong className="text-foreground">GEO Region:</strong>
                      <p className="text-muted-foreground mt-1">{currentBlog.geoTag.region}</p>
                    </div>
                    <div>
                      <strong className="text-foreground">GEO Placename:</strong>
                      <p className="text-muted-foreground mt-1">{currentBlog.geoTag.placename}</p>
                    </div>
                    <div>
                      <strong className="text-foreground">GEO Position:</strong>
                      <p className="text-muted-foreground mt-1">{currentBlog.geoTag.position}</p>
                    </div>
                  </>
                )}

                <div>
                  <strong className="text-foreground">JSON-LD Schema:</strong>
                  <pre className="text-muted-foreground mt-1 p-3 bg-background rounded overflow-x-auto">
                    {JSON.stringify(jsonLd, null, 2)}
                  </pre>
                </div>

                <div>
                  <strong className="text-foreground">Open Graph Tags:</strong>
                  <div className="text-muted-foreground mt-1 space-y-1">
                    <p>og:title = {currentBlog.metaTags.title || currentBlog.title}</p>
                    <p>og:description = {currentBlog.metaTags.description}</p>
                    <p>og:type = article</p>
                    {currentBlog.featureImage && <p>og:image = {currentBlog.featureImage}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </article>
    </>
  );
};

export default BlogView;
