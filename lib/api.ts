import axios from "axios";
import { Note } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("API token is not defined in .env.local");
}

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  page = 1,
  search = ""
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { page, perPage: 12, search },
  });
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// Новий хук для Notes.client.tsx
import { useQuery } from "@tanstack/react-query";

export const useFetchNotes = (page: number, search: string) => {
  return useQuery<NotesResponse, Error>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });
};
