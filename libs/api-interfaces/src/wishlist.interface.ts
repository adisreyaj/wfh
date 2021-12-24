import { Document } from 'mongoose';
import { ProductResponse } from './product.interface';

export interface WishlistRequset {
  user: string;
  products: string[];
}

export interface WishlistResponse {
  id: string;
  user: any; // TODO: user
  products: ProductResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistDocument extends Omit<WishlistResponse, 'id'>, Document {}
