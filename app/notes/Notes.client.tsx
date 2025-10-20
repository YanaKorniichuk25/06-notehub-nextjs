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
export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    staleTime: 1000 * 60,
    placeholderData: { notes: [], totalPages: 1 },
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;
  return (
    <div className={css.app}>
      {" "}
      <div className={css.toolbar}>
        {" "}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          {" "}
          Create note{" "}
        </button>{" "}
        <SearchBox onChange={setSearch} />{" "}
      </div>{" "}
      <NoteList notes={data?.notes ?? []} />{" "}
      <Pagination
        pageCount={data?.totalPages ?? 1}
        currentPage={page}
        onPageChange={(p: number) => setPage(p)}
      />{" "}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {" "}
          <NoteForm onClose={() => setIsModalOpen(false)} />{" "}
        </Modal>
      )}{" "}
    </div>
  );
}
