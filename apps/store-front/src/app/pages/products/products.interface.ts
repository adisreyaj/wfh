export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  kind: ProductKind;
  originalPrice?: number;
  images: string[];
  link?: string;
}

export enum ProductKind {
  Keyboard = 'ProductKeyboard',
  Mouse = 'ProductMouse',
  Monitor = 'ProductMonitor',
  Chair = 'ProductChair',
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
