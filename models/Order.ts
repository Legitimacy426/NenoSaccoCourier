import mongoose, { Document, Model, Schema } from "mongoose";
import Parcel, { IParcel } from "./Parcel";
import User, { IUser } from "./User";

// Define possible order statuses as an enum
export enum OrderStatus {
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface IOrder extends Document {
  orderId: string;
  customer: IUser["_id"];
  parcels: IParcel["_id"][];
  status: OrderStatus;
  orderDate: Date;
  totalAmount: number;
}

const OrderSchema: Schema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
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
});

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
