import { Document } from 'mongoose';

interface UserBaseRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
}

export type UserAuth0Request = UserBaseRequest;

export interface UserResponse extends Omit<UserBaseRequest, 'auth0Id'> {
  id: string;
  addresses: AddressResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document, Omit<UserResponse, 'id'> {}

interface AddressBaseRequest {
  apartment: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export type AddressRequest = AddressBaseRequest;

export interface AddressResponse extends AddressBaseRequest {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddressDocument extends Document, Omit<AddressResponse, '_id'> {}
