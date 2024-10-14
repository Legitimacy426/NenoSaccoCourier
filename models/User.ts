import mongoose, { Document, Model, Schema } from "mongoose";
import { IOrder } from "./Order"; // Import the Order interface
import { IParcel } from "./Parcel"; // Import the Parcel interface
export interface IUser extends Document {
  email: string;
  role: string;
  username: string;
  phone?: string;
  password?: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  softDeleted: boolean;
  isActive?: boolean;
  orders?: IOrder["_id"][]; // Add orders array
  parcels?: IParcel["_id"][]; // Add parcels array
}

const UserSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "customer" },
  phone: { type: String, required: false },
  password: { type: String, required: false },
  resetToken: { type: String, required: false },
  resetTokenExpiration: { type: Date, required: false },
  softDeleted: { type: Boolean, required: false, default: false },
  isActive: { type: Boolean, required: false, default: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // Reference to the Order model
  parcels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parcel" }], // Reference to the Parcel model
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
