"use client";

import React, { useState } from "react";
import { Note } from "../../types/types"; // Adjust the import path according to your project structure

const NoteForm: React.FC<{ onNoteCreated: (newNote: Note) => void }> = ({
  onNoteCreated,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the request to create a new note
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }), // Ensure you're sending title if required
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create note:", errorData);
      return;
    }

    // Parse the new note from the response
    const newNote = await response.json();
    onNoteCreated(newNote); // Call the parent callback to add the note
    setTitle(""); // Reset title
    setContent(""); // Reset content
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
