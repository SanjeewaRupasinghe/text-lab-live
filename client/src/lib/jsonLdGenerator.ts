import { Blog } from '@/types/blog';

/**
 * Generate Article JSON-LD schema
 */
export const generateArticleSchema = (blog: Blog) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": blog.title,
  "description": blog.metaTags.description,
  "author": {
    "@type": "Person",
    "name": blog.author
  },
  "datePublished": blog.publishedDate || blog.createdAt,
  "dateModified": blog.updatedAt,
  "image": blog.featureImage || undefined,
  "publisher": {
    "@type": "Organization",
    "name": "Your Organization Name" // TODO: Replace with actual org name
  }
});

/**
 * Generate FAQ JSON-LD schema
 */
export const generateFAQSchema = (blog: Blog) => {
  if (!blog.faqs || blog.faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blog.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generate complete JSON-LD for a blog post
 */
export const generateBlogJsonLd = (blog: Blog): string => {
  const articleSchema = generateArticleSchema(blog);
  const faqSchema = generateFAQSchema(blog);

  const schemas: any[] = [articleSchema];
  if (faqSchema) {
    schemas.push(faqSchema);
  }

  return JSON.stringify(schemas, null, 2);
};
