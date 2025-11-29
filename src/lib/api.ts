/**
 * ============= BLOG API LAYER =============
 * 
 * MOCK IMPLEMENTATION FOR DEVELOPMENT
 * This file uses mock data and simulated delays to mimic real API behavior.
 * 
 * PRODUCTION MIGRATION CHECKLIST:
 * 1. Replace blogsDatabase with real API endpoints
 * 2. Update baseURL in axios instance configuration (line 11)
 * 3. Uncomment authentication token logic (lines 21-25)
 * 4. Implement proper error handling (lines 34-38)
 * 5. Replace all mock functions with actual API calls
 * 6. Remove simulateDelay calls
 * 7. Implement file upload to cloud storage (uploadImage function)
 * 8. Add request/response logging for debugging
 * 9. Implement retry logic for failed requests
 * 10. Add request cancellation for navigation changes
 * 
 * MOCK DATA LOCATION: src/data/mockBlogs.ts
 * TYPE DEFINITIONS: src/types/blog.ts
 * STATE MANAGEMENT: src/stores/blogStore.ts
 */

import axios from 'axios';
import { Blog, CreateBlogInput, UpdateBlogInput } from '@/types/blog';
import { mockBlogs } from '@/data/mockBlogs';

// ============= MOCK DATABASE =============
// This simulates an in-memory database for development
// In production, this will be replaced by real API calls to your backend
let blogsDatabase: Blog[] = [...mockBlogs];

// ============= AXIOS INSTANCE CONFIGURATION =============
const api = axios.create({
  baseURL: '/api', // TODO PRODUCTION: Replace with 'https://your-api-domain.com/api'
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// ============= REQUEST INTERCEPTOR =============
// Automatically adds authentication token to all requests
api.interceptors.request.use(
  (config) => {
    // TODO PRODUCTION: Uncomment and implement token retrieval
    // const token = localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============= RESPONSE INTERCEPTOR =============
// Handles errors globally (401, 403, 500, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO PRODUCTION: Implement proper error handling
    // if (error.response?.status === 401) {
    //   // Redirect to login
    //   window.location.href = '/auth/login';
    // } else if (error.response?.status === 403) {
    //   // Show permission denied message
    // } else if (error.response?.status >= 500) {
    //   // Show server error message
    // }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ============= UTILITY FUNCTIONS =============

/**
 * Generate URL-friendly slug from title
 * Used for creating SEO-friendly URLs
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

/**
 * Simulate API delay for realistic testing
 * Remove this in production
 */
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// ============= BLOG API FUNCTIONS =============

/**
 * Fetch all blogs
 * 
 * MOCK IMPLEMENTATION:
 * Returns all blogs from in-memory blogsDatabase
 * 
 * PRODUCTION IMPLEMENTATION:
 * GET /api/blogs
 * Optional query params: ?status=published&sort=publishedDate&order=desc
 * 
 * Example:
 * const response = await api.get<Blog[]>('/blogs', {
 *   params: { status: 'published', sort: 'publishedDate', order: 'desc' }
 * });
 * return response.data;
 */
export const fetchBlogs = async (): Promise<Blog[]> => {
  await simulateDelay(); // Remove in production
  // TODO PRODUCTION: Uncomment this line
  // return api.get<Blog[]>('/blogs').then(res => res.data);
  return [...blogsDatabase];
};

/**
 * Fetch single blog by ID
 * 
 * MOCK IMPLEMENTATION:
 * Searches blogsDatabase for matching ID
 * 
 * PRODUCTION IMPLEMENTATION:
 * GET /api/blogs/:id
 * 
 * Example:
 * return api.get<Blog>(`/blogs/${id}`).then(res => res.data);
 */
export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  await simulateDelay(); // Remove in production
  // TODO PRODUCTION: Uncomment this line
  // return api.get<Blog>(`/blogs/${id}`).then(res => res.data);
  return blogsDatabase.find(blog => blog.id === id) || null;
};

/**
 * Fetch single blog by slug (for public blog view)
 * 
 * MOCK IMPLEMENTATION:
 * Searches blogsDatabase for matching slug
 * 
 * PRODUCTION IMPLEMENTATION:
 * GET /api/blogs/slug/:slug
 * 
 * Example:
 * return api.get<Blog>(`/blogs/slug/${slug}`).then(res => res.data);
 */
export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  await simulateDelay(); // Remove in production
  // TODO PRODUCTION: Uncomment this line
  // return api.get<Blog>(`/blogs/slug/${slug}`).then(res => res.data);
  return blogsDatabase.find(blog => blog.slug === slug) || null;
};

/**
 * Create new blog post
 * 
 * MOCK IMPLEMENTATION:
 * Creates blog object and adds to blogsDatabase
 * Autogenerates: id, slug, timestamps, author
 * 
 * PRODUCTION IMPLEMENTATION:
 * POST /api/blogs
 * Body: CreateBlogInput
 * 
 * Example:
 * return api.post<Blog>('/blogs', input).then(res => res.data);
 */
export const createBlog = async (input: CreateBlogInput): Promise<Blog> => {
  await simulateDelay(); // Remove in production
  
  const now = new Date().toISOString();
  const slug = generateSlug(input.title);
  
  // MOCK: Create blog object
  const newBlog: Blog = {
    id: `blog-${Date.now()}`, // In production, generated by database
    title: input.title,
    slug,
    description: input.description,
    status: input.status,
    author: 'admin', // TODO PRODUCTION: Get from authenticated user context
    featureImage: input.featureImage || null,
    publishedDate: input.status === 'published' ? now : null,
    createdAt: now,
    updatedAt: now,
    viewCount: 0,
    faqs: input.faqs || [],
    metaTags: {
      title: input.metaTags?.title || input.title,
      description: input.metaTags?.description || '',
      keywords: input.metaTags?.keywords || []
    },
    customJsonLd: input.customJsonLd || null,
    geoTag: input.geoTag || null
  };
  
  blogsDatabase.push(newBlog);
  
  // TODO PRODUCTION: Uncomment this line
  // return api.post<Blog>('/blogs', input).then(res => res.data);
  return newBlog;
};

/**
 * Update existing blog post
 * 
 * MOCK IMPLEMENTATION:
 * Updates blog in blogsDatabase
 * Handles status changes, slug regeneration, and timestamp updates
 * 
 * PRODUCTION IMPLEMENTATION:
 * PUT /api/blogs/:id or PATCH /api/blogs/:id
 * Body: UpdateBlogInput
 * 
 * Example:
 * return api.put<Blog>(`/blogs/${input.id}`, input).then(res => res.data);
 */
export const updateBlog = async (input: UpdateBlogInput): Promise<Blog> => {
  await simulateDelay(); // Remove in production
  
  const index = blogsDatabase.findIndex(blog => blog.id === input.id);
  if (index === -1) {
    throw new Error('Blog not found');
  }
  
  const existingBlog = blogsDatabase[index];
  const wasPublished = existingBlog.status === 'published';
  const isNowPublished = input.status === 'published';
  
  // Regenerate slug if title changed
  const slug = input.title ? generateSlug(input.title) : existingBlog.slug;
  
  const updatedBlog: Blog = {
    ...existingBlog,
    ...input,
    slug,
    updatedAt: new Date().toISOString(),
    // Set publishedDate when first published
    publishedDate: !wasPublished && isNowPublished 
      ? new Date().toISOString() 
      : existingBlog.publishedDate,
    // Merge meta tags
    metaTags: {
      ...existingBlog.metaTags,
      ...input.metaTags
    }
  };
  
  blogsDatabase[index] = updatedBlog;
  
  // TODO PRODUCTION: Uncomment this line
  // return api.put<Blog>(`/blogs/${input.id}`, input).then(res => res.data);
  return updatedBlog;
};

/**
 * Delete blog post
 * 
 * MOCK IMPLEMENTATION:
 * Removes blog from blogsDatabase
 * 
 * PRODUCTION IMPLEMENTATION:
 * DELETE /api/blogs/:id
 * 
 * Example:
 * return api.delete(`/blogs/${id}`).then(() => void 0);
 */
export const deleteBlog = async (id: string): Promise<void> => {
  await simulateDelay(); // Remove in production
  
  blogsDatabase = blogsDatabase.filter(blog => blog.id !== id);
  
  // TODO PRODUCTION: Uncomment this line
  // return api.delete(`/blogs/${id}`);
};

/**
 * Increment view count for analytics
 * 
 * MOCK IMPLEMENTATION:
 * Increments viewCount in blogsDatabase
 * 
 * PRODUCTION IMPLEMENTATION:
 * POST /api/blogs/:id/view
 * This should be idempotent (same user viewing multiple times shouldn't increment)
 * Consider using IP-based or session-based tracking
 * 
 * Example:
 * return api.post(`/blogs/${id}/view`).then(() => void 0);
 */
export const incrementViewCount = async (id: string): Promise<void> => {
  await simulateDelay(100); // Remove in production
  
  const blog = blogsDatabase.find(b => b.id === id);
  if (blog) {
    blog.viewCount += 1;
  }
  
  // TODO PRODUCTION: Uncomment this line
  // return api.post(`/blogs/${id}/view`);
};

/**
 * Upload image file
 * 
 * MOCK IMPLEMENTATION:
 * Creates a temporary blob URL
 * 
 * PRODUCTION IMPLEMENTATION:
 * POST /api/upload or use cloud storage SDK (AWS S3, Cloudinary, etc.)
 * Should return permanent URL to uploaded file
 * 
 * Example with multipart/form-data:
 * const formData = new FormData();
 * formData.append('file', file);
 * return api.post<{ url: string }>('/upload', formData, {
 *   headers: { 'Content-Type': 'multipart/form-data' }
 * }).then(res => res.data.url);
 * 
 * Example with Cloudinary:
 * const uploadResponse = await cloudinary.uploader.upload(file);
 * return uploadResponse.secure_url;
 */
export const uploadImage = async (file: File): Promise<string> => {
  await simulateDelay(1000); // Remove in production
  
  // MOCK: Create temporary blob URL (will be invalid after page refresh)
  const mockUrl = URL.createObjectURL(file);
  
  // TODO PRODUCTION: Implement real file upload
  // const formData = new FormData();
  // formData.append('file', file);
  // return api.post<{ url: string }>('/upload', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // }).then(res => res.data.url);
  
  return mockUrl;
};

export default api;
