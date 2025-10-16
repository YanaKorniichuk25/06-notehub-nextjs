import { Note } from "../types/note";

export type NotesResponse = {
  notes: Note[];
  total: number;
};

export const fetchNotes = async (
  page: number = 1,
  search: string = ""
): Promise<NotesResponse> => {
  const res = await fetch(`/api/notes?page=${page}&search=${search}`);
  return res.json();
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await fetch(`/api/notes/${id}`);
  return res.json();
};
