import { sendPasswordResetEmail } from "@/lib/api/email";
import { NextResponse } from "next/server";

import crypto from "crypto";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      // Return success response even if the email does not exist
      // This prevents revealing whether the email is registered
      return NextResponse.json(
        { message: "Password reset email sent if the email is registered" },
        { status: 200 }
      );
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");

    await User.updateOne(
      { email },
      {
        resetToken: token,
        resetTokenExpiration: new Date(Date.now() + 3600000), // Token valid for 1 hour
      }
    );

    // Generate a password reset link including the token
    const resetLink = `"link"/auth/confirm?token=${token}`;
    console.log("reset link ----------", resetLink);
    // Send the password reset email
    await sendPasswordResetEmail({ email, resetLink });

    return NextResponse.json(
      { message: "Password reset email sent if the email is registered" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
