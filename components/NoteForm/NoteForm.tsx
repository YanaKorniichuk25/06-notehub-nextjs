"use client";

import { useState } from "react";
import css from "./NoteForm.module.css";
import type { Note } from "@/types/note";

type Props = {
  onCreate: (data: { title: string; content: string; tag: string }) => void;
};

export default function NoteForm({ onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ title, content, tag });
    setTitle("");
    setContent("");
    setTag("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={css.input}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className={css.textarea}
      />
      <input
        type="text"
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Create Note
      </button>
    </form>
  );
}
