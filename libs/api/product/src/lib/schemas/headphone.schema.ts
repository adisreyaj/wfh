import { Schema } from 'mongoose';

export const monitorSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    resolution: { type: String, required: true },
    inputs: [
      {
        type: String,
      },
    ],
  },
  {
    discriminatorKey: 'kind',
  }
);

export const ProductMonitorModel = {
  name: 'ProductMonitor',
  schema: monitorSchema,
};
