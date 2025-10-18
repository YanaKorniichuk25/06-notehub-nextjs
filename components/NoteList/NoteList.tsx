import Link from "next/link";
import css from "./NoteList.module.css";
import type { Note } from "@/types/note";

type Props = {
  notes: Note[];
  onDelete?: (id: number) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.view}>
              View details
            </Link>
            {onDelete && (
              <button className={css.delete} onClick={() => onDelete(note.id)}>
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
