"use client";

import React from "react";
import { Note } from "@/types/types"; // Import the Note type
import MonacoEditor from "./MonacoEditor";

const NoteList: React.FC<{
  notes: Note[];
  onNoteDeleted: (id: string) => void;
}> = ({ notes, onNoteDeleted }) => {
  const handleDelete = async (id: string) => {
    const response = await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error("Failed to delete note");
      return;
    }

    onNoteDeleted(id);
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id}>
          <div className="w-full flex justify-center">
            <MonacoEditor value={note.example} />
          </div>
          {note.example}

          <button
            className="bg-red-700 rounded-lg p-2 mx-4"
            onClick={() => handleDelete(note._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
