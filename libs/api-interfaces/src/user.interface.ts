import { Document } from 'mongoose';

export interface UserBaseRequest {
  auth0Id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
}

export type UserAuth0Request = UserBaseRequest;

export interface UserResponse extends Omit<UserBaseRequest, 'auth0Id'> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Document, Omit<UserResponse, 'id'> {}
