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

export interface ProductRequest extends ProductBase {
  category: string;
  brand: string;
}

export interface ProductResponse extends ProductBase {
  id: string;
  category: CategoryResponse;
  brand: BrandResponse;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductDocument = ProductResponse & Document;
