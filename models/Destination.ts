import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IDestination extends Document {
  name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  staffs: IUser["_id"][];
  softDelete: boolean;
}

const DestinationSchema: Schema = new Schema(
  {
    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Destination address is required"],
      trim: true,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Destination ||
  mongoose.model<IDestination>("Destination", DestinationSchema);
