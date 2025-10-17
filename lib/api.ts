import axios from "axios";
import { Note } from "@/types/note";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com",
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await api.get("/notes");
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt">
): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
