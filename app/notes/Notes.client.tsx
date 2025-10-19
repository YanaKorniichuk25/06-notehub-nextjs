"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Toaster, toast } from "react-hot-toast";
import { useFetchNotes, createNote, deleteNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Note } from "@/types/note";
import css from "./NotesPage.module.css";

export default function Notes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rawSearch, setRawSearch] = useState("");
  const [debouncedSearch] = useDebounce(rawSearch, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useFetchNotes(
    currentPage,
    debouncedSearch
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleAddNote = async (
    newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const created = await createNote(newNote);
      toast.success("Note created!");
      refetch(); // оновлюємо список нотаток
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to create note");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={rawSearch} onChange={setRawSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.notes.length ? (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleAddNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}

      <Toaster />
    </div>
  );
}
