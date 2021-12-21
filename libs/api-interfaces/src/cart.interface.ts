import { ProductResponse } from './product.interface';
import { Document } from 'mongoose';

export interface CartResponse {
  id: string;
  user: any;
  products: {
    product: ProductResponse;
    quantity: number;
    addedOn: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartDocument extends Omit<CartResponse, 'id'>, Document {}
