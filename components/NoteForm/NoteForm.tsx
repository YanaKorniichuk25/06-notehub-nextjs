"use client";

import { useState } from "react";
import { createNote } from "../../lib/api";
import css from "./NoteForm.module.css";

export default function NoteForm({ onCreate }: { onCreate: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({ title, content });
    setTitle("");
    setContent("");
    onCreate();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
