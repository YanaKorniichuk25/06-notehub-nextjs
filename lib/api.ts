import axios from "axios";
import toast from "react-hot-toast";
import { Note } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// Axios defaults
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL ??
    "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  },
});

// Error notifications
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

// API-функції
export const fetchNotes = async (
  page: number,
  search: string
): Promise<NotesResponse> => {
  const { data } = await api.get<{
    data: { items: Note[]; totalPages: number };
  }>("/notes", {
    params: { page, perPage: 12, search },
  });

  const items = data.data?.items ?? [];
  const totalPages = data.data?.totalPages ?? 1;

  return { notes: items, totalPages };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<{ data: Note }>(`/notes/${id}`);
  return data.data;
};

export const createNote = async (noteData: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post<{ data: Note }>("/notes", noteData);
  toast.success("Note added successfully!");
  return data.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<{ data: Note }>(`/notes/${id}`);
  toast.success("Note deleted successfully!");
  return data.data;
};
