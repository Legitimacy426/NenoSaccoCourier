import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import User from "@/models/User";



export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    await dbConnect();

    try {
        // Search by either _id or email
        const user = await User.findOne({
            $or: [{ _id: id }, { email: id }]
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const data = await req.json();
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    await dbConnect();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "DELETED" });
}
