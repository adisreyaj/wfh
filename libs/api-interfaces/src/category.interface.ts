import { Document } from 'mongoose';

export interface CategoryBase {
  name: string;
  description?: string;
  image?: string;
}

export type CategoryRequest = CategoryBase;

export interface CategoryResponse extends CategoryBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDocument extends Omit<CategoryResponse, 'id'>, Document {}
