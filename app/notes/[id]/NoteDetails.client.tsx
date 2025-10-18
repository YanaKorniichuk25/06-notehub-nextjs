"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";
import styles from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: number;
  initialNote?: Note;
}

export function NoteDetailsClient({
  noteId,
  initialNote,
}: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    initialData: initialNote,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={styles.noteDetails}>
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
      <p className={styles.date}>
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
