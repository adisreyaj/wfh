import { Document } from 'mongoose';

export interface BrandBase {
  name: string;
  logo: string[];
  colors?: string[];
}

export interface BrandRequest extends BrandBase {
  category: string;
}

export interface BrandResponse extends BrandBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BrandDocument = BrandResponse & Document;
