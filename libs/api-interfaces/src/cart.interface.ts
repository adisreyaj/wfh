import { ProductResponse } from './product.interface';
import { Document } from 'mongoose';
import { AddressResponse } from './user.interface';

export interface CartRequest {
  id: string;
  quantity: number;
  address: string;
}

export interface CartResponse {
  id: string;
  user: any;
  products: {
    product: ProductResponse;
    quantity: number;
    addedOn: Date;
  };
  address: AddressResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartDocument extends Omit<CartResponse, 'id'>, Document {}
