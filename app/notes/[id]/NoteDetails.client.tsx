"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  noteId: number;
  initialNote?: Note;
}

export default function NoteDetailsClient({
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
    staleTime: 30_000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.noteDetails}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created at: {new Date(note.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
