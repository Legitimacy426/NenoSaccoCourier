import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { username, email, password, phone } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "You have to be added by admin" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(existingUser._id, {
      username,
      email: email || username,
      phone,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "User registered successfully",
      existingUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
