import { Note } from "../../types/note";
import css from "./NoteList.module.css";
import Link from "next/link";

interface Props {
  notes: Note[];
  onDelete: (id: number) => void;
}

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
