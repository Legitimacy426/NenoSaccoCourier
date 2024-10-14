import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

import bcrypt from "bcryptjs";




export async function PUT(
  req: Request,
  { params }: { params: { email: string } }
) {
  const body = await req.json();

  await dbConnect();

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: body.userId });

    if (!user) {
      return NextResponse.json(
        { code: "USER_NOT_FOUND", message: "User not found" },
        { status: 404 }
      );
    }

    // Password Update Logic
    if (body.oldPassword && body.newPassword) {
      if (!user.password) {
        return NextResponse.json(
          { code: "PASSWORD_NOT_SET", message: "User password not set" },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(body.oldPassword, user.password);

      if (!isMatch) {
        return NextResponse.json(
          {
            code: "OLD_PASSWORD_INCORRECT",
            message: "Old password is incorrect",
          },
          { status: 400 }
        );
      }

      if (body.newPassword !== body.confirmPassword) {
        return NextResponse.json(
          {
            code: "PASSWORD_MISMATCH",
            message: "New password and confirm password do not match",
          },
          { status: 400 }
        );
      }

      // Hash the new password
      user.password = await bcrypt.hash(body.newPassword, 10);
    }

    // Updating other fields
    if (body.username) {
      user.username = body.username;
    }
    if (body.phone) {
      user.phone = body.phone;
    }
    if (body.role) {
      user.role = body.role;
    }
   

    // Handle isActive explicitly, even when it's false
    if (body.hasOwnProperty("isActive")) {
      user.isActive = body.isActive;
    }

    const updatedUser = await user.save();

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { code: "UPDATE_ERROR", message: "Error updating user" },

      { status: 500 }
    );
  }
}