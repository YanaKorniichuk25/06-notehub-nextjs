import React from "react";
import { Note } from "../../types/note";

export interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => (
  <ul>
    {notes.map((note) => (
      <li key={note.id}>{note.title}</li>
    ))}
  </ul>
);

export default NoteList;
