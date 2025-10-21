"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function NotesListClient({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const [currentPage, setCurrentPage] = useState(page);
  const [searchQuery, setSearchQuery] = useState(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <section>
      <SearchBox value={searchQuery} onChange={setSearchQuery} />
      <button onClick={() => setIsModalOpen(true)}>Create note</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}
