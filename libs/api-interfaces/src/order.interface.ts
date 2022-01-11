import { AddressResponse, UserResponse } from './user.interface';
import { ProductResponse } from './product.interface';
import { Document } from 'mongoose';

export interface OrderRequest {
  products: { id: string; name: string; description: string; price: number }[];
  address: string;
  breakdown: { label: string; value: number }[];
}

export interface OrderResponse {
  _id: string;
  user: UserResponse;
  products: { productId: ProductResponse; name: string; description: string; price: number }[];
  address: AddressResponse;
  delivery: {
    status: string;
    expectedDate: string;
  };
  breakdown: { label: string; value: number }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDocument extends Omit<OrderResponse, '_id'>, Document {}
