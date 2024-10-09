"use client";

import React, { useState } from "react";
import { Note } from "../../types/types"; // Adjust the import path according to your project structure
import MonacoEditor from "./MonacoEditor";

const NoteForm: React.FC<{ onNoteCreated: (newNote: Note) => void }> = ({
  onNoteCreated,
}) => {
  const [title, setTitle] = useState<string>("");
  const [syntax, setSyntax] = useState<string>("");
  const [usage, setUsage] = useState<string>("");
  const [example, setExample] = useState<string>(""); // State for the Monaco editor
  const [notes, setNotes] = useState<string>("");
  const [linkToDocs, setLinkToDocs] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the request to create a new note
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        syntax,
        usage,
        example,
        notes,
        linkToDocs,
        language,
        tags,
      }), // Ensure you're sending title if required
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
    setSyntax(""); // Reset content
    setExample(""); // Reset content
    setNotes(""); // Reset content
    setLinkToDocs(""); // Reset content
    setLanguage(""); // Reset content
    setTags([]); // Reset content
  };

  return (
    <form className="flex flex-col items-center mt-12" onSubmit={handleSubmit}>
      <input
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        placeholder="Syntax"
        value={syntax}
        onChange={(e) => setSyntax(e.target.value)}
        required
      />
      <textarea
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        placeholder="Usage"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
        required
      />

      {/* Monaco Editor with state */}
      <MonacoEditor value={example} onChange={setExample} />

      <textarea
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        type="url"
        placeholder="Link to Documentation"
        value={linkToDocs}
        onChange={(e) => setLinkToDocs(e.target.value)}
      />
      <input
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        type="url"
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <input
        className="mx-auto w-96 h-12 bg-white rounded text-black pl-4 mb-2"
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags.join(", ")}
        onChange={(e) =>
          setTags(e.target.value.split(",").map((tag) => tag.trim()))
        }
      />
      <button className="bg-green-700 p-2 rounded" type="submit">
        Add Cheatsheet
      </button>
    </form>
  );
};

export default NoteForm;
