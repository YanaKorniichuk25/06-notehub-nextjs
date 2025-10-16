"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import { Note } from "../../types/note";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: notes = [] } = useQuery<Note[], Error>({
    queryKey: ["notes", page, search],
    queryFn: ({ queryKey }) => {
      const [, p, s] = queryKey as [string, number, string];
      return fetchNotes(p, s).then((res) => res.notes);
    },
  });

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={notes} />
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
};

export default NotesClient;
