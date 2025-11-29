# Deployment Guide

## Overview
This application is built with React, TypeScript, Zustand for state management, and uses mock data for development. Follow this guide to deploy to production.

---

## Pre-Deployment Checklist

### 1. **API Integration**
Replace all mock API calls with real backend endpoints:

- [ ] Update `baseURL` in `src/lib/api.ts` (line 31)
- [ ] Implement authentication token management (lines 40-47)
- [ ] Implement error handling (lines 53-66)
- [ ] Replace all mock functions with real API calls
- [ ] Remove `simulateDelay` calls
- [ ] Test all CRUD operations with real API

### 2. **Environment Variables**
Create `.env.production` file with:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_NAME=Your Site Name
VITE_TWITTER_HANDLE=@yourhandle
```

Update references in:
- `src/components/SEO.tsx` (Twitter handle)
- `src/pages/Sitemap.tsx` (BASE_URL)
- `src/pages/RobotsTxt.tsx` (BASE_URL)
- `src/lib/jsonLdGenerator.ts` (Organization name)

### 3. **Image Hosting**
Replace mock image upload with cloud storage:

- [ ] Set up AWS S3, Cloudinary, or similar
- [ ] Implement upload in `src/lib/api.ts` `uploadImage` function
- [ ] Update feature image validation if needed
- [ ] Implement image optimization (compression, resizing)

### 4. **SEO Configuration**

#### Sitemap
- [ ] Generate sitemap.xml (use `/admin/sitemap` page)
- [ ] Upload to root directory
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add to robots.txt

#### Robots.txt
- [ ] Generate robots.txt (use `/admin/robots` page)
- [ ] Upload to root directory
- [ ] Update disallowed paths for your needs
- [ ] Verify with Google robots.txt Tester

#### Meta Tags
- [ ] Add your logo URL in `src/components/SEO.tsx`
- [ ] Add Twitter handle in `src/components/SEO.tsx`
- [ ] Verify Open Graph tags with Facebook Debugger
- [ ] Verify Twitter Cards with Twitter Card Validator

### 5. **Authentication**
Replace mock auth with real authentication:

- [ ] Implement backend authentication API
- [ ] Update `src/stores/authStore.ts` with real endpoints
- [ ] Implement password reset functionality
- [ ] Add user registration if needed
- [ ] Implement JWT token refresh
- [ ] Add session management
- [ ] Implement "Remember me" functionality

### 6. **Security**

- [ ] Enable HTTPS
- [ ] Set up Content Security Policy (CSP)
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Sanitize all user inputs (HTML content)
- [ ] Add XSS protection
- [ ] Implement CSRF tokens
- [ ] Review and test all RLS policies (if using Supabase)

### 7. **Performance Optimization**

- [ ] Enable code splitting
- [ ] Lazy load routes
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Implement service worker for caching
- [ ] Enable Gzip compression
- [ ] Minify CSS and JavaScript
- [ ] Use CDN for static assets
- [ ] Implement infinite scroll or pagination for blog list
- [ ] Add loading skeletons

### 8. **Analytics & Monitoring**

- [ ] Set up Google Analytics 4
- [ ] Implement error tracking (Sentry, Rollbar)
- [ ] Add performance monitoring
- [ ] Set up uptime monitoring
- [ ] Implement custom event tracking
- [ ] Add conversion tracking

### 9. **Testing**

- [ ] Write unit tests for critical functions
- [ ] Write integration tests for API calls
- [ ] Test all user flows
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Accessibility testing (WCAG AA compliance)
- [ ] Performance testing (Lighthouse scores)
- [ ] Load testing

### 10. **Accessibility (WCAG AA)**

Current implementation includes:
- ✅ Semantic HTML (`<article>`, `<header>`, `<main>`, `<time>`)
- ✅ ARIA labels on interactive elements
- ✅ Alt text on all images
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast ratios

Additional checks:
- [ ] Screen reader testing
- [ ] Keyboard-only navigation testing
- [ ] Form validation with clear error messages
- [ ] Skip to content links
- [ ] Proper heading hierarchy

---

## Build & Deploy

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates optimized production files in the `dist/` directory.

### Deploy Options

#### Option 1: Vercel (Recommended for React apps)
```bash
npm install -g vercel
vercel --prod
```

#### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Option 3: AWS S3 + CloudFront
```bash
aws s3 sync dist/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Option 4: Traditional Server (Apache/Nginx)
1. Copy `dist/` contents to server
2. Configure server for SPA routing (see below)

##### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/your-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

##### Apache Configuration
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## Post-Deployment

### Immediate Tasks
1. Verify all pages load correctly
2. Test all forms and submissions
3. Check console for errors
4. Verify API connections
5. Test authentication flow
6. Check mobile responsiveness
7. Run Lighthouse audit
8. Submit sitemap to search engines

### Ongoing Maintenance
1. Monitor error logs
2. Review analytics data
3. Update content regularly
4. Keep dependencies updated
5. Review and improve SEO
6. Monitor performance metrics
7. Backup database regularly
8. Review security patches

---

## Core Web Vitals Targets

Aim for these Google Core Web Vitals scores:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Use Chrome DevTools and Lighthouse to measure and improve these metrics.

---

## Support & Resources

- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Zustand Documentation**: https://docs.pmnd.rs/zustand/
- **Vite Documentation**: https://vitejs.dev/
- **Web.dev (Performance)**: https://web.dev/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Troubleshooting

### Issue: Routes return 404 on refresh
**Solution**: Configure server for SPA routing (see Nginx/Apache configs above)

### Issue: Images not loading
**Solution**: Check BASE_URL and implement proper cloud storage

### Issue: API calls failing
**Solution**: Verify CORS settings on backend and update baseURL

### Issue: Build fails
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Lighthouse score is low
**Solution**: 
- Optimize images (use WebP, lazy loading)
- Enable code splitting
- Minimize third-party scripts
- Implement caching strategies

---

## Questions?

If you encounter issues during deployment, review:
1. Console errors in browser DevTools
2. Network tab for failed requests
3. Build logs for compilation errors
4. Server logs for runtime errors

For code-specific questions, check inline comments in:
- `src/lib/api.ts` - API integration guide
- `src/data/mockBlogs.ts` - Mock data examples
- `src/components/SEO.tsx` - SEO implementation
