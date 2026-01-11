/**
 * ============= MOCK BLOG DATA =============
 *
 * This file contains sample blog posts for development and testing.
 *
 * PRODUCTION MIGRATION:
 * - Remove this file when connecting to real API
 * - These are referenced in src/lib/api.ts
 * - Sample data useful for: development, testing, demos, documentation
 *
 * DATA STRUCTURE:
 * - Full rich HTML content in description field
 * - Feature images from Unsplash (replace with your own)
 * - Complete SEO meta tags
 * - FAQ schema examples
 * - GEO tagging examples
 * - Custom JSON-LD examples
 *
 * BEST PRACTICES DEMONSTRATED:
 * - SEO-friendly titles and descriptions
 * - Proper keyword selection
 * - FAQ content for voice search optimization
 * - Location-based content for local SEO
 * - Custom structured data for rich snippets
 */

import { Blog } from "@/types/blog";

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-with-react-and-typescript",
    description:
      "<h2>Introduction</h2><p>Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything from setup to advanced patterns.</p><h3>Why TypeScript?</h3><p>TypeScript provides type safety and better developer experience.</p>",
    status: "published",
    author: "admin",
    featureImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&h=1000&fit=crop",
    published_at: "2024-01-15",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    faqs: [],
    meta_title: "Getting Started with React and TypeScript - Complete Guide",
    meta_description:
      "Learn how to build modern web applications with React and TypeScript in this comprehensive guide covering setup, best practices, and advanced patterns.",
    meta_keywords: "react,typescript,web development,frontend,tutorial",
    custom_json_ld: null,
  },
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-with-react-and-typescript",
    description:
      "<h2>Introduction</h2><p>Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything from setup to advanced patterns.</p><h3>Why TypeScript?</h3><p>TypeScript provides type safety and better developer experience.</p>",
    status: "published",
    author: "admin",
    featureImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&h=1000&fit=crop",
    published_at: "2024-01-15",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    faqs: [],
    meta_title: "Getting Started with React and TypeScript - Complete Guide",
    meta_description:
      "Learn how to build modern web applications with React and TypeScript in this comprehensive guide covering setup, best practices, and advanced patterns.",
    meta_keywords: "react,typescript,web development,frontend,tutorial",
    custom_json_ld: null,
  },
];
