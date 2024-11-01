import mongoose, { Document, Model, Schema } from "mongoose";
import { IParcelType } from "./ParcelType"; // Import the ParcelType interface
import { IUser } from "./User";

// Enum for Parcel Status
export enum ParcelStatus {
  Pending = "pending",
  InTransit = "in_transit",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface IParcel extends Document {
  name: string;
  senderId: IUser;
  recipientId: IUser;
  status: ParcelStatus;
  weight: number;
  price: number;
  parcelType?: IParcelType;
  softDeleted: boolean;
  description?: string;
  trackingNumber: string;
}

  const ParcelSchema: Schema = new mongoose.Schema({
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        const prefix = "TRK";
        const timestamp = Date.now().toString(36);
        const randomSuffix = Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase();
        return `${prefix}-${timestamp}-${randomSuffix}`;
      },
    },
    name: { type: String, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to ParcelType model
      required: false,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to ParcelType model
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(ParcelStatus),
      required: true,
      default: ParcelStatus.Pending,
    },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    parcelType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParcelType", // Reference to ParcelType model
      required: false,
    },
    softDeleted: { type: Boolean, default: false }, // Add soft delete functionality
    description: { type: String, required: false },
  });

const Parcel: Model<IParcel> =
  mongoose.models.Parcel || mongoose.model<IParcel>("Parcel", ParcelSchema);

export default Parcel;
