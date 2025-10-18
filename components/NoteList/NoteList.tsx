"use client";
import Link from "next/link";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
  onDelete?: (id: number) => void;
}

export function NoteList({ notes, onDelete }: Props) {
  if (!notes.length) return <p>No notes found.</p>;

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.slice(0, 100)}...</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            {onDelete && (
              <button onClick={() => onDelete(note.id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
