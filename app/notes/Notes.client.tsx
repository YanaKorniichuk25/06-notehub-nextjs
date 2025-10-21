"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, NotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";

function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Додаємо пропси, щоб відповідало вимогам викладача
interface NotesClientProps {
  page: number;
  search: string;
}

export default function NotesClient({ page, search }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, debouncedSearch),
    // для останніх версій React Query: staleTime або placeholderData можна не використовувати
  });

  // Скидаємо сторінку на 1 при зміні пошуку
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <button onClick={() => setIsModalOpen(true)}>Create note</button>
        <SearchBox onChange={setSearchQuery} />
      </div>

      <NoteList notes={data?.notes ?? []} />

      <Pagination
        pageCount={data?.totalPages ?? 1}
        currentPage={currentPage}
        onPageChange={(p: number) => setCurrentPage(p)}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
