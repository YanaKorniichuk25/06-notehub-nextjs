"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, deleteNote, createNote } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";
import { useState } from "react";
import styles from "./NotesPage.module.css";

export default function NotesClient() {
  const {
    data: notes,
    isLoading,
    error,
    refetch,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createNote({ title, content });
    setTitle("");
    setContent("");
    refetch();
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    refetch();
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Notes</h2>
      <div className={styles.form}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={styles.input}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className={styles.textarea}
        />
        <button onClick={handleCreate} className={styles.button}>
          Create
        </button>
      </div>

      <ul className={styles.list}>
        {notes?.map((note) => (
          <li key={note.id} className={styles.item}>
            <h3 className={styles.noteTitle}>{note.title}</h3>
            <p className={styles.noteContent}>{note.content}</p>
            <p className={styles.noteDate}>{note.createdAt}</p>
            <Link href={`/notes/${note.id}`} className={styles.link}>
              View details
            </Link>
            <button
              onClick={() => handleDelete(note.id)}
              className={styles.delete}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
