import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Note, NotesResponse } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? "";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL ??
    "https://notehub-public.goit.study/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  },
});

export const fetchNotes = async (params?: {
  q?: string;
  page?: number;
}): Promise<NotesResponse> => {
  const { q, page = 1 } = params ?? {};
  const queryParams: Record<string, string | number> = { page };
  if (q?.trim()) queryParams.q = q;

  const resp = await api.get<NotesResponse>("/notes", { params: queryParams });
  return resp.data;
};

// ✅ додаємо кастомний хук, який очікує компонент Notes.client.tsx
export const useFetchNotes = (page: number, q: string) => {
  return useQuery<NotesResponse, Error>({
    queryKey: ["notes", page, q],
    queryFn: () => fetchNotes({ page, q }),
    placeholderData: (prev) => prev, // тримає попередні дані під час оновлення
  });
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const resp = await api.get<{ data: Note }>(`/notes/${id}`);
  return resp.data.data;
};

export const createNote = async (payload: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const resp = await api.post<{ data: Note }>("/notes", payload);
  return resp.data.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
