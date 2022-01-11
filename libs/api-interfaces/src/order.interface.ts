import { AddressResponse, UserResponse } from './user.interface';
import { ProductResponse } from './product.interface';
import { Document } from 'mongoose';

export interface OrderRequest {
  products: { id: string; name: string; description: string; price: number }[];
  address: string;
}

export interface OrderResponse {
  id: string;
  user: UserResponse;
  products: ProductResponse[];
  address: AddressResponse;
  delivery: {
    status: string;
    expectedDate: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderDocument extends Omit<OrderResponse, 'id'>, Document {}
