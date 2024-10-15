import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Destination from '@/models/Destination';

export async function GET() {
  try {
    await dbConnect();
    const destinations = await Destination.find({});
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Failed to fetch destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, address } = body;

    let destination = await Destination.findOne({ name, address });

    if (destination) {
      // If destination exists, update it
      destination = await Destination.findOneAndUpdate(
        { name, address },
        body,
        { new: true, runValidators: true }
      );
      return NextResponse.json(destination, { status: 200 });
    } else {
      // If destination doesn't exist, create a new one
      const newDestination = new Destination(body);
      const savedDestination = await newDestination.save();
      return NextResponse.json(savedDestination, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to create or update destination:', error);
    return NextResponse.json({ error: 'Failed to create or update destination' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const updatedDestination = await Destination.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updatedDestination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json(updatedDestination);
  } catch (error) {
    console.error('Failed to update destination:', error);
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Failed to delete destination:', error);
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
