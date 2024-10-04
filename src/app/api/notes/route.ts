import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb"; // Import ObjectId

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Notepad");
    const notes = await db.collection("notes").find({}).toArray();

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Notepad");
    const note = await request.json();

    const result = await db.collection("notes").insertOne(note);
    return NextResponse.json(
      { id: result.insertedId, ...note },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Notepad");
    const { id, ...updatedNote } = await request.json();

    await db
      .collection("notes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedNote });
    return NextResponse.json({ message: "Note updated" });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("Notepad");
    const { id } = await request.json();

    await db.collection("notes").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
