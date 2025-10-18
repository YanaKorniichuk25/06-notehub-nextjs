"use client";
import { useState } from "react";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface Props {
  onCreate: () => void;
}

export default function NoteForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({ title, content, tag: "general" });
    setTitle("");
    setContent("");
    onCreate();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className={css.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button className={css.button} type="submit">
        Add Note
      </button>
    </form>
  );
}
