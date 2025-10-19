// types/note.ts

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  notes: Note[]; // масив нотаток
  totalPages: number; // загальна кількість сторінок
}
