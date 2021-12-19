import { Category } from './category.interface';
import { Document } from 'mongoose';

export interface ProductBase {
  name: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductRequest extends ProductBase {
  category: string;
}

export interface ProductResponse extends ProductBase {
  id: string;
  category: Category;
}

export type ProductDocument = ProductResponse & Document;
