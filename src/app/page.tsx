"use client";

import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { Note } from "@/types/types"; // Import the Note type

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]); // Specify Note type

  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteCreated = (newNote: Note) => {
    // Specify Note type
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleNoteDeleted = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm onNoteCreated={handleNoteCreated} />
      <NoteList notes={notes} onNoteDeleted={handleNoteDeleted} />
    </div>
  );
}
