import mongoose, { Document, Model, Schema } from "mongoose";

export interface IParcelType extends Document {
  name: string;
  description?: string;
}

const ParcelTypeSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading/trailing spaces
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500, // Optional, to limit the description size
  },
});

// Ensure the unique index for name
ParcelTypeSchema.index({ name: 1 }, { unique: true });

const ParcelType: Model<IParcelType> =
  mongoose.models.ParcelType ||
  mongoose.model<IParcelType>("ParcelType", ParcelTypeSchema);

export default ParcelType;
