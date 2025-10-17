"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

interface NoteDetailsProps {
  id: number;
}

export const NoteDetailsClient = ({ id }: NoteDetailsProps) => {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className="container">
      <div className="item">
        <div className="header">
          <h2>{note.title}</h2>
        </div>
        <p className="content">{note.content}</p>
        <p className="date">{note.createdAt}</p>
      </div>
    </div>
  );
};
