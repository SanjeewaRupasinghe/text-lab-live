import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogStore } from "@/stores/blogStore";
import { CreateBlogInput, FAQ } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FAQManager } from "@/components/admin/FAQManager";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { toast } from "sonner";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentBlog,
    fetchBlogById,
    createBlog,
    updateBlog,
    clearCurrentBlog,
  } = useBlogStore();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    slug: "",
    description: "",
    status: "draft",
    featureImage: null,
    faqs: [],
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    customJsonLd: null,
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [geoEnabled, setGeoEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchBlogById(id);
    } else {
      clearCurrentBlog();
    }
  }, [id, isEditMode, fetchBlogById, clearCurrentBlog]);

  useEffect(() => {
    if (currentBlog && isEditMode) {
      setFormData({
        title: currentBlog.title,
        slug: currentBlog.slug,
        description: currentBlog.description,
        status: currentBlog.status,
        featureImage: currentBlog.featureImage,
        faqs: currentBlog.faqs,
        meta_title: currentBlog.meta_title,
        meta_description: currentBlog.meta_description,
        meta_keywords: currentBlog.meta_keywords,
        customJsonLd: currentBlog.customJsonLd,
      });
      // setKeywordInput(currentBlog.metaTags.keywords.join(", "));
    }
  }, [currentBlog, isEditMode]);

  const handleSave = async (publish: boolean = false) => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    setSaving(true);
    try {
      const keywords = keywordInput
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const blogData: CreateBlogInput = {
        ...formData,
        status: publish ? "published" : formData.status,
        // metaTags: {
        //   ...formData.metaTags!,
        //   keywords,
        // },
      };

      if (isEditMode && id) {
        await updateBlog({ ...blogData, id });
        toast.success("Blog updated successfully");
      } else {
        await createBlog(blogData);
        toast.success("Blog created successfully");
      }

      // navigate('/admin/blogs');
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update blog" : "Failed to create blog"
      );
    } finally {
      setSaving(false);
    }
  };

  const generateJsonLd = () => {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: formData.title,
      description: formData.meta_description || "",
      author: {
        "@type": "Person",
        name: "Admin",
      },
      datePublished: new Date().toISOString(),
      image: formData.featureImage || "",
    };

    const faqSchema =
      formData.faqs && formData.faqs.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: formData.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }
        : null;

    const schemas: any[] = [articleSchema];
    if (faqSchema) schemas.push(faqSchema);

    return JSON.stringify(schemas, null, 2);
  };

  const autoGenerateJsonLd = () => {
    setFormData((prev) => ({
      ...prev,
      customJsonLd: generateJsonLd(),
    }));
    toast.success("JSON-LD generated");
  };

  return (
    <div className="container mx-auto p-6 px-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/blogs")}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.info("Preview feature coming soon")}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button onClick={() => handleSave(false)} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          Save Draft
        </Button>
        <Button onClick={() => handleSave(true)} disabled={saving}>
          Publish
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, ""),
                    }))
                  }
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <Label htmlFor="title">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  // Anything can add. but while leaving manage the slug properly
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, ""),
                    }))
                  }
                  placeholder="Enter blog slug"
                />
              </div>

              <div>
                <Label>Description *</Label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, description: content }))
                  }
                  placeholder="Write your blog content..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === "published"}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: checked ? "published" : "draft",
                    }))
                  }
                />
                <Label htmlFor="status">
                  {formData.status === "published" ? "Published" : "Draft"}
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Image</CardTitle>
              <CardDescription>
                Upload a 1000x1000px image for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featureImage}
                onChange={(url) =>
                  setFormData((prev) => ({ ...prev, featureImage: url }))
                }
                requiredDimensions={{ width: 1000, height: 1000 }}
                maxSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tags</CardTitle>
              <CardDescription>
                Optimize your blog for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.meta_title || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      meta_title: e.target.value,
                    }))
                  }
                  placeholder="SEO title (max 60 characters)"
                  maxLength={60}
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.meta_description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      meta_description: e.target.value,
                    }))
                  }
                  placeholder="SEO description (max 160 characters)"
                  maxLength={160}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* JSON-LD */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Structured Data (JSON-LD)</CardTitle>
                  <CardDescription>
                    Add structured data for rich snippets
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={autoGenerateJsonLd}
                >
                  Auto Generate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.customJsonLd || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customJsonLd: e.target.value,
                  }))
                }
                placeholder="Paste or edit JSON-LD schema here"
                rows={15}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Add FAQs to enhance SEO and user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FAQManager
                faqs={formData.faqs || []}
                onChange={(faqs) => setFormData((prev) => ({ ...prev, faqs }))}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogEditor;
