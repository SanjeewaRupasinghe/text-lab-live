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
    description: "<h2>Introduction</h2><p>Learn how to build modern web applications with React and TypeScript. This comprehensive guide covers everything from setup to advanced patterns.</p><h3>Why TypeScript?</h3><p>TypeScript provides type safety and better developer experience.</p>",
    status: "published",
    author: "admin",
    featureImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&h=1000&fit=crop",
    publishedDate: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    viewCount: 1234,
    faqs: [
      {
        id: "faq-1-1",
        question: "What is TypeScript?",
        answer: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
      },
      {
        id: "faq-1-2",
        question: "Why use React with TypeScript?",
        answer: "React with TypeScript provides better code quality, IDE support, and catches errors early."
      }
    ],
    metaTags: {
      title: "Getting Started with React and TypeScript - Complete Guide",
      description: "Learn how to build modern web applications with React and TypeScript in this comprehensive guide covering setup, best practices, and advanced patterns.",
      keywords: ["react", "typescript", "web development", "frontend", "tutorial"]
    },
    customJsonLd: null,
    geoTag: {
      region: "US-CA",
      placename: "San Francisco",
      position: "37.7749;-122.4194"
    }
  },
  {
    id: "2",
    title: "Advanced State Management with Zustand",
    slug: "advanced-state-management-with-zustand",
    description: "<h2>Zustand Overview</h2><p>Zustand is a small, fast, and scalable state management solution. It's simple to use and doesn't require providers or complex setup.</p><h3>Key Features</h3><ul><li>Simple API</li><li>No boilerplate</li><li>TypeScript support</li></ul>",
    status: "published",
    author: "admin",
    featureImage: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=1000&h=1000&fit=crop",
    publishedDate: "2024-02-01T14:30:00Z",
    createdAt: "2024-01-28T09:00:00Z",
    updatedAt: "2024-02-01T14:30:00Z",
    viewCount: 856,
    faqs: [
      {
        id: "faq-2-1",
        question: "What is Zustand?",
        answer: "Zustand is a minimalistic state management library for React applications."
      },
      {
        id: "faq-2-2",
        question: "How does Zustand compare to Redux?",
        answer: "Zustand is much simpler with less boilerplate, no providers needed, and easier TypeScript integration."
      }
    ],
    metaTags: {
      title: "Advanced State Management with Zustand - Best Practices",
      description: "Master Zustand state management with advanced patterns, TypeScript integration, and performance optimization techniques.",
      keywords: ["zustand", "state management", "react", "typescript", "performance"]
    },
    customJsonLd: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Advanced State Management with Zustand",
      "skillLevel": "Advanced"
    }, null, 2),
    geoTag: null
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-with-tailwind-css",
    description: "<h2>Tailwind CSS Basics</h2><p>Tailwind CSS is a utility-first CSS framework that enables rapid UI development. Learn how to create beautiful, responsive interfaces.</p>",
    status: "draft",
    author: "admin",
    featureImage: null,
    publishedDate: null,
    createdAt: "2024-02-10T11:00:00Z",
    updatedAt: "2024-02-12T16:00:00Z",
    viewCount: 0,
    faqs: [],
    metaTags: {
      title: "Building Responsive UIs with Tailwind CSS",
      description: "Learn how to create beautiful, responsive interfaces using Tailwind CSS utility classes.",
      keywords: ["tailwind", "css", "responsive design", "ui", "frontend"]
    },
    customJsonLd: null,
    geoTag: null
  }
];
