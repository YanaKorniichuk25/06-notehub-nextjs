"use client";

import { useState } from "react";
import { useNotes } from "@/lib/api"; // ✅ тепер використовуємо хук із api.ts
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Використовуємо кастомний хук useNotes
  const query = useNotes(currentPage, search);

  if (query.isLoading) return <p>Loading, please wait...</p>;
  if (query.error || !query.data) return <p>Something went wrong.</p>;

  const { notes, totalPages } = query.data;

  return (
    <div className={css.container}>
      <SearchBox value={search} onChange={setSearch} />
      <NoteList notes={notes} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
