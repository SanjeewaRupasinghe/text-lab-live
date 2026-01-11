import { create } from 'zustand';
import { Blog, CreateBlogInput, UpdateBlogInput } from '@/types/blog';
import * as api from '@/lib/api';

interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchBlogs: () => Promise<void>;
  fetchBlogsForAdmin: () => Promise<void>;
  fetchBlogById: (id: string) => Promise<void>;
  fetchBlogBySlug: (slug: string) => Promise<void>;
  createBlog: (input: CreateBlogInput) => Promise<Blog>;
  updateBlog: (input: UpdateBlogInput) => Promise<Blog>;
  deleteBlog: (id: string) => Promise<void>;
  incrementViewCount: (id: string) => Promise<void>;
  clearCurrentBlog: () => void;
  clearError: () => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const blogs = await api.fetchBlogs();
      set({ blogs, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blogs',
        isLoading: false 
      });
    }
  },

  fetchBlogsForAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const blogs = await api.fetchBlogsForAdmin();
      set({ blogs, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blogs',
        isLoading: false 
      });
    }
  },

  fetchBlogById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const blog = await api.fetchBlogById(id);
      console.log(blog);
      set({ currentBlog: blog, isLoading: false });
    } catch (error) {
      console.log(error);
      
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blog',
        isLoading: false 
      });
    }
  },

  fetchBlogBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const blog = await api.fetchBlogBySlug(slug);
      set({ currentBlog: blog, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch blog',
        isLoading: false 
      });
    }
  },

  createBlog: async (input: CreateBlogInput) => {
    set({ isLoading: true, error: null });
    try {
      const newBlog = await api.createBlog(input);
      set((state) => ({ 
        blogs: [...state.blogs, newBlog],
        isLoading: false 
      }));
      return newBlog;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create blog',
        isLoading: false 
      });
      throw error;
    }
  },

  updateBlog: async (input: UpdateBlogInput) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBlog = await api.updateBlog(input);
      console.log(updatedBlog);
      set((state) => ({
        blogs: state.blogs.map(blog => 
          blog.id === updatedBlog.id ? updatedBlog : blog
        ),
        currentBlog: state.currentBlog?.id === updatedBlog.id 
          ? updatedBlog 
          : state.currentBlog,
        isLoading: false
      }));
      return updatedBlog;
    } catch (error) {
      console.log(error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update blog',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteBlog: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.deleteBlog(id);
      set((state) => ({
        blogs: state.blogs.filter(blog => blog.id !== id),
        currentBlog: state.currentBlog?.id === id ? null : state.currentBlog,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete blog',
        isLoading: false 
      });
      throw error;
    }
  },

  incrementViewCount: async (id: string) => {
    try {
      // await api.incrementViewCount(id);
      // set((state) => ({
      //   blogs: state.blogs.map(blog =>
      //     blog.id === id ? { ...blog, viewCount: blog.viewCount + 1 } : blog
      //   ),
      //   currentBlog: state.currentBlog?.id === id
      //     ? { ...state.currentBlog, viewCount: state.currentBlog.viewCount + 1 }
      //     : state.currentBlog
      // }));
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  },

  clearCurrentBlog: () => set({ currentBlog: null }),
  clearError: () => set({ error: null }),
}));
