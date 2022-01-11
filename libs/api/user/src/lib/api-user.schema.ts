import { Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    authId: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = {
  name: 'User',
  schema: userSchema,
};
