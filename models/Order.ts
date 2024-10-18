import mongoose, { Document, Model, Schema } from "mongoose";
import Parcel, { IParcel } from "./Parcel";
import User, { IUser } from "./User";
import { IDestination } from "./Destination";

// Define possible order statuses as an enum
export enum OrderStatus {
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface IOrder extends Document {
  trackingNumber: string;
  carrier: string;
  estimatedDeliveryDate: Date;

  customer: IUser;
  parcels: IParcel["_id"][];
  status: OrderStatus;
  orderDate: Date;
  totalAmount: number;
  shippingPrice: number;
  fromDestination: IDestination["_id"];
  toDestination: IDestination["_id"];
  createdAt: Date;
  updatedAt: Date;
}



const OrderSchema: Schema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      default: Math.random().toString(36).substring(2, 15),
    },
    carrier: { type: String, required: true },
    estimatedDeliveryDate: { type: Date, required: true },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parcels: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Parcel", required: true },
    ],
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Processing,
      required: true,
    },
    orderDate: { type: Date, required: true, default: Date.now },
    totalAmount: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    fromDestination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
    toDestination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure the trackingNumber is set before validation
OrderSchema.pre('validate', function(next) {
  if (!this.trackingNumber) {
    this.trackingNumber = (this.schema.path('trackingNumber') as any).default();
  }
  next();
});

const Order: Model<IOrder> =
  mongoose.models?.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
