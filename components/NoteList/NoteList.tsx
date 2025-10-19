"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (!notes.length) return <p>No notes found.</p>;

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.slice(0, 100)}...</p>
          <p className={css.tag}>Tag: {note.tag}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
