"use client";

import { useState } from "react";
import { useNotes, deleteNote } from "../../lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

const NotesClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useNotes(currentPage, search);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleDelete = async (id: number | string) => {
    await deleteNote(id);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={notes} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default NotesClient;
