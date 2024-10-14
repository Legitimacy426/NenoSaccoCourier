import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email: emailOrUsername, password } = await req.json();

  if (!emailOrUsername || !password) {
    return NextResponse.json(
      { message: "Email/Username and password are required" },
      { status: 400 }
    );
  }

  try {
    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Check if the user is active
    if (!user.isActive) {
      return NextResponse.json(
        { message: "Account is inactive. Please contact support." },
        { status: 403 }
      );
    }

    // If the user has no password, hash the provided password and set it
    if (!user.password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );

      return NextResponse.json({ token, user });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate a JWT token for valid login
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
