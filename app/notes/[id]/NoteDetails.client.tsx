"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface NoteDetailsProps {
  id: string;
}

const NoteDetailsClient: React.FC<NoteDetailsProps> = ({ id }) => {
  const { data: note } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (!note) return <div>Loading...</div>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteDetailsClient;
