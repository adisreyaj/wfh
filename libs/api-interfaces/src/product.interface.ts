import { CategoryResponse } from './category.interface';
import { Document } from 'mongoose';
import { BrandResponse } from './brands.interface';

export interface ProductBase {
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
}

export interface ProductRequestBase extends ProductBase {
  category: string;
  brand: string;
}

export interface ProductResponseBase extends ProductBase {
  id: string;
  category: CategoryResponse;
  brand: BrandResponse;
  createdAt: Date;
  updatedAt: Date;
}

// Keyboard Product Interfaces
export interface ProductKeyboardBase {
  type: string;
  numberOfKeys: number;
  illumination: string;
  keyCaps: string;
  kind: 'ProductKeyboard';
}

export interface ProductKeyboardRequest extends ProductKeyboardBase, ProductRequestBase {}

export interface ProductKeyboardResponse extends ProductKeyboardBase, ProductResponseBase {}

// Mouse Product Interfaces
export interface ProductMouseBase {
  type: string;
  buttons: number;
  kind: 'ProductMouse';
}

export interface ProductMouseRequest extends ProductMouseBase, ProductRequestBase {}

export interface ProductMouseResponse extends ProductMouseBase, ProductResponseBase {}

export type ProductRequest = ProductKeyboardRequest | ProductMouseRequest;
export type ProductResponse = ProductKeyboardResponse | ProductMouseResponse;
export type ProductDocument = ProductResponse & Document;
