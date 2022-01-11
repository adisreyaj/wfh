import { Schema } from 'mongoose';

export const addressSchema = new Schema({
  apartment: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const AddressModel = {
  name: 'Address',
  schema: addressSchema,
};
