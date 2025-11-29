import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogStore } from '@/stores/blogStore';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Eye, MapPin, Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { SEO } from '@/components/SEO';

const BlogList = () => {
  const navigate = useNavigate();
  const { blogs, fetchBlogs } = useBlogStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filter only published blogs
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');

  // Get unique regions for filter
  const regions = Array.from(
    new Set(
      publishedBlogs
        .filter(blog => blog.geoTag?.placename)
        .map(blog => blog.geoTag!.placename)
    )
  );

  // Apply filters
  const filteredBlogs = publishedBlogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.metaTags.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = 
      regionFilter === 'all' || 
      blog.geoTag?.placename === regionFilter;

    return matchesSearch && matchesRegion;
  });

  // Extract plain text from HTML description for preview
  const getExcerpt = (html: string, maxLength: number = 150) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const canonicalUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blogs` 
    : '';

  return (
    <>
      <SEO
        title="Blog - TextTransformer"
        description="Explore our latest articles, tutorials, and insights about text transformation, web development, and productivity tools."
        keywords={['blog', 'articles', 'tutorials', 'text transformation', 'web development']}
        canonical={canonicalUrl}
        ogType="website"
        ogUrl={canonicalUrl}
      />
      
      <div className="container mx-auto p-6 max-w-7xl" role="main">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">Explore our latest articles and insights</p>
        </header>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8" role="search">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search by title or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search blog posts by title or keywords"
            />
          </div>
          
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-[200px]" aria-label="Filter by region">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <Card 
                key={blog.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blog/${blog.slug}`)}
                role="article"
              >
                {blog.featureImage && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={blog.featureImage} 
                      alt={`Featured image for ${blog.title}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
              
                <CardHeader>
                  <h2 className="text-xl font-bold line-clamp-2">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                    {getExcerpt(blog.description)}
                  </p>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" aria-hidden="true" />
                    <span>{blog.author}</span>
                  </div>

                  {blog.geoTag && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      <span>{blog.geoTag.placename}</span>
                    </div>
                  )}

                  {blog.publishedDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time dateTime={blog.publishedDate}>
                        {format(new Date(blog.publishedDate), 'MMM d, yyyy')}
                      </time>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>{blog.viewCount.toLocaleString()} views</span>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-2">
                  {blog.metaTags.keywords.slice(0, 3).map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {blog.metaTags.keywords.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{blog.metaTags.keywords.length - 3} more
                    </Badge>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
