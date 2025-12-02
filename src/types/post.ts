export interface SanityImage {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  [key: string]: unknown;
}

export interface PortableTextChild {
  _key?: string;
  _type?: string;
  text: string;
  [key: string]: unknown;
}

export interface PortableTextBlock {
  _key?: string;
  _type: string;
  children?: PortableTextChild[];
  [key: string]: unknown;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  publishedAt?: string;
  summary?: string;
  categories?: string[];
  body?: PortableTextBlock[];
}


