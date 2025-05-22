export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}