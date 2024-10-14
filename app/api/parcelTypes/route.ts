import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ParcelType from "@/models/ParcelType";
import mongoose from "mongoose";

// Get all ParcelTypes
export async function GET() {
  await dbConnect();
  try {
    const parcelTypes = await ParcelType.find({});
    return NextResponse.json(parcelTypes);
  } catch (error) {
    console.error("Error fetching parcel types:", error);
    return NextResponse.json(
      { error: "Failed to fetch parcel types" },
      { status: 500 }
    );
  }
}

// Create a new ParcelType or update existing one
export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();

    // Check for required fields
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Check if a ParcelType with the given name already exists
    const existingParcelType = await ParcelType.findOne({ name: body.name });

    if (existingParcelType) {
      // If it exists, update the description
      existingParcelType.description = body.description;
      const updatedParcelType = await existingParcelType.save();
      return NextResponse.json(updatedParcelType, { status: 200 });
    } else {
      // If it doesn't exist, create a new ParcelType
      const newParcelType = await ParcelType.create(body);
      return NextResponse.json(newParcelType, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating or updating parcel type:", error);
    return NextResponse.json(
      { error: "Failed to create or update parcel type" },
      { status: 500 }
    );
  }
}

// Update an existing ParcelType
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Ensure the ID exists
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Update the ParcelType by ID
    const updatedParcelType = await ParcelType.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedParcelType) {
      return NextResponse.json(
        { error: "Parcel type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedParcelType);
  } catch (error) {
    console.error("Error updating parcel type:", error);
    return NextResponse.json(
      { error: "Failed to update parcel type" },
      { status: 500 }
    );
  }
}

// Delete a ParcelType
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();

    // Ensure the ID exists
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find and delete the ParcelType by ID
    const deletedParcelType = await ParcelType.findByIdAndDelete(id);

    if (!deletedParcelType) {
      return NextResponse.json(
        { error: "Parcel type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Parcel type deleted successfully" });
  } catch (error) {
    console.error("Error deleting parcel type:", error);
    return NextResponse.json(
      { error: "Failed to delete parcel type" },
      { status: 500 }
    );
  }
}
