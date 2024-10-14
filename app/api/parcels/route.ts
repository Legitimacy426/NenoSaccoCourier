import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Parcel, { IParcel } from "@/models/Parcel";
import { PARCEL_POPULATE_FIELDS } from "@/constants/populate";
import User from "@/models/User";

// GET: Fetch all parcels
export async function GET() {
  await dbConnect();
  try {
    // Fetch only parcels that are not soft deleted
    const parcels = await Parcel.find({ softDeleted: false })
    return NextResponse.json(parcels);
  } catch (error) {
    console.error("Error fetching parcels:", error);
    return NextResponse.json(
      { error: "Failed to fetch parcels" },
      { status: 500 }
    );
  }
}

// POST: Create a new parcel
export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    console.log(body, "body");
    const newParcel = await Parcel.create(body);

    // Update sender's parcels
    await User.findByIdAndUpdate(
      body.senderId,
      { $push: { parcels: newParcel._id } },
      { new: true }
    );

    // Update recipient's parcels
    await User.findByIdAndUpdate(
      body.recipientId,
      { $push: { parcels: newParcel._id } },
      { new: true }
    );

    return NextResponse.json(newParcel, { status: 201 });
  } catch (error) {
    console.error("Error creating parcel:", error);
    return NextResponse.json(
      { error: "Failed to create parcel" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing parcel
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Find and update the parcel, ensure it's not soft deleted
    const updatedParcel = await Parcel.findOneAndUpdate(
      { _id: id, softDeleted: false },
      updateData,
      { new: true }
    ).populate(PARCEL_POPULATE_FIELDS);

    if (!updatedParcel) {
      return NextResponse.json({ error: "Parcel not found" }, { status: 404 });
    }
    return NextResponse.json(updatedParcel);
  } catch (error) {
    console.error("Error updating parcel:", error);
    return NextResponse.json(
      { error: "Failed to update parcel" },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete a parcel (marks as soft deleted)
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();

    // Mark the parcel as softDeleted
    const deletedParcel = await Parcel.findOneAndUpdate(
      { _id: id, softDeleted: false },
      { softDeleted: true },
      { new: true }
    ).populate(PARCEL_POPULATE_FIELDS);

    if (!deletedParcel) {
      return NextResponse.json({ error: "Parcel not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Parcel soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting parcel:", error);
    return NextResponse.json(
      { error: "Failed to soft delete parcel" },
      { status: 500 }
    );
  }
}
