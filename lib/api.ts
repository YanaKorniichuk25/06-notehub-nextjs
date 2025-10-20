import axios from "axios";
import toast from "react-hot-toast";
import { Note } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Unknown error";
    toast.error(`API Error: ${message}`);
    return Promise.reject(error);
  }
);

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<NotesResponse> => {
  // ✅ нова структура відповіді
  const { data } = await api.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params: { page, perPage: 12, search },
    }
  );

  const notes = data.notes ?? [];
  const totalPages = data.totalPages ?? 1;

  return { notes, totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  // ✅ ендпоінт повертає { note: {...} }, не { data: {...} }
  const { data } = await api.get<{ note: Note }>(`/notes/${id}`);
  return data.note;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post<{ note: Note }>("/notes", noteData);
  toast.success("Note added successfully!");
  return data.note;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<{ note: Note }>(`/notes/${id}`);
  toast.success("Note deleted successfully!");
  return data.note;
};
