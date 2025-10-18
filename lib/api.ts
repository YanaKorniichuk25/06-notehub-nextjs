import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import type { Note } from "../types/note";

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";

const getToken = (): string => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (!token) throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");
  return token;
};

export const fetchNotes = async (
  page = 1,
  search = ""
): Promise<NotesResponse> => {
  const token = getToken();
  const response = await axios.get<NotesResponse>("notes", {
    params: { page, perPage: 12, search },
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
  });
  return response.data;
};

export const fetchNoteById = async (id: string | number): Promise<Note> => {
  const token = getToken();
  const response = await axios.get<Note>(`notes/${id}`, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
  });
  return response.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const token = getToken();
  const response = await axios.post<Note>("notes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const removeNote = async (id: string | number): Promise<Note> => {
  const token = getToken();
  const response = await axios.delete<Note>(`notes/${id}`, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
  });
  return response.data;
};

export const useNotes = (currentPage: number, search: string) =>
  useQuery<NotesResponse>({
    queryKey: ["notes", currentPage, search],
    queryFn: ({ queryKey }: QueryFunctionContext) => {
      const [, page, searchTerm] = queryKey as [string, number, string];
      return fetchNotes(page, searchTerm);
    },
    placeholderData: { notes: [], totalPages: 1 },
    staleTime: 30_000,
  });

export const useNoteById = (id: string | number) =>
  useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
