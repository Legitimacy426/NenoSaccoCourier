// lib/email.ts

'use client';

import { Resend } from "resend";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/User";
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPasswordResetEmailParams {
  email: string;
  resetLink: string;
}

export async function sendPasswordResetEmail({
  email,
  resetLink,
}: SendPasswordResetEmailParams): Promise<void> {
  try {
    await resend.emails.send({
      from: "adamfondo91@gmail.com", // Use your verified sender email
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please use the following link to reset your password: ${resetLink}`,
      html: `<p>You requested a password reset. Please use the following link to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p>`,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

// Utility function to hash the password
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Main function to update the user's password
export async function updatePassword(
  token: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if the token is valid
    const user: IUser | null = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: new Date() }, // Ensure the token has not expired
    });

    if (!user) {
      throw new Error("Invalid or expired token");
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password and clear the reset token
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiration: null,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Failed to update password" };
  }
}
