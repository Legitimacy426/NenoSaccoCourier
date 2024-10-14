import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import Order, { IOrder } from "@/models/Order"; // Import Order model
import Parcel, { IParcel } from "@/models/Parcel"; // Import Parcel model
import { USER_POPULATE_FIELDS } from "@/constants/populate";

// GET: Fetch users or specific user by email/username
export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // If email/username is provided, fetch specific user
    if (email) {
      const user = await User.findOne({
        $or: [{ email: email }, { username: email }],
      })

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
    } else {
      // Otherwise, fetch all users
      const users = await User.find({ softDeleted: false })
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { username, email, phone, role, orders, parcels } = body;

    // Check if the user already exists by email or username
    let user = await User.findOne({ email: email || username });

    if (!user) {
      // Create a new user if none exists
      user = await User.create({
        username,
        email: email || username,
        phone,

        role: role || "customer",
        orders: orders || [], // Initialize orders array
        parcels: parcels || [], // Initialize parcels array
      });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing user
export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate(USER_POPULATE_FIELDS);

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete a user
export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { softDeleted: true },
      { new: true }
    );

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User soft deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
