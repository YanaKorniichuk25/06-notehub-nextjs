"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, NotesResponse } from "@/lib/api";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
    placeholderData: { notes: [], totalPages: 1 },
    staleTime: 30_000,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes.</p>;

  return (
    <div>
      {data?.notes.map((note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}
