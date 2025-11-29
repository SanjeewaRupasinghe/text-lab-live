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
  status: 'draft' | 'published';
  author: string;
  featureImage: string | null;
  publishedDate: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  faqs: FAQ[];
  metaTags: MetaTags;
  customJsonLd: string | null;
  geoTag: GeoTag | null;
}

export interface CreateBlogInput {
  title: string;
  description: string;
  status: 'draft' | 'published';
  featureImage?: string | null;
  faqs?: FAQ[];
  metaTags?: Partial<MetaTags>;
  customJsonLd?: string | null;
  geoTag?: GeoTag | null;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  id: string;
}
