export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface MetaTags {
  title: string;
  description: string;
  keywords: string[];
}

export interface GeoTag {
  region: string;
  placename: string;
  position: string; // lat;long format
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string; // Rich HTML content
  status: "draft" | "published";
  author: string;
  featureImage: string | null;
  published_at: string | null;
  createdAt: string;
  updatedAt: string;
  faqs: FAQ[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  customJsonLd: string | null;
}

export interface CreateBlogInput {
  title: string;
  slug: string;
  description: string;
  status: "draft" | "published";
  published_at: string | null;
  featureImage?: string | null;
  faqs?: FAQ[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  customJsonLd?: string | null;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  id: string;
}
