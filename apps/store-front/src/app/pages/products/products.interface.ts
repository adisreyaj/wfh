export interface Product {
  id?: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice: number;
  images: string[];
  link?: string;
}

export interface ProductQuickView extends Product {
  specifications: ProductSpecification[];
  promises: ProductPromise[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductPromise {
  label: string;
  img: string;
}
