"use client";
import { useState } from "react";
import { Note } from "../../types/note";
import css from "./NoteForm.module.css";

interface Props {
  onAdd: (note: Note) => void;
}

export function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    onAdd(newNote);
    setTitle("");
    setContent("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
