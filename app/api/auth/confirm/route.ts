import { updatePassword } from '@/lib/api/email';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    // Validate the token and update the password
    const result = await updatePassword(token, password);

    if (result.success) {
      return NextResponse.json({ message: 'Password has been reset successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error || 'Failed to reset password' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while resetting the password' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
