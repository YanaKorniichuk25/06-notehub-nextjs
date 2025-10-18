"use client";

import { useState } from "react";
import { useNotes, createNote, removeNote } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Підключаємо кастомний хук useNotes для отримання нотаток
  const query = useNotes(currentPage, search);

  if (query.isLoading) return <p>Loading, please wait...</p>;
  if (query.error || !query.data) return <p>Something went wrong.</p>;

  const { notes, totalPages } = query.data;

  // Відкриваємо модалку для підтвердження видалення
  const handleDelete = (id: number) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Підтвердження видалення нотатки
  const confirmDelete = async () => {
    if (deleteId !== null) {
      await removeNote(deleteId);
      query.refetch(); // оновлюємо список нотаток після видалення
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  // Створення нової нотатки через форму
  const handleCreate = async (data: {
    title: string;
    content: string;
    tag: string;
  }) => {
    await createNote(data); // створюємо нотатку через API
    query.refetch(); // оновлюємо список нотаток
  };

  return (
    <div className={css.container}>
      <SearchBox value={search} onChange={setSearch} />
      <NoteForm onCreate={handleCreate} />
      <NoteList notes={notes} onDelete={handleDelete} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this note?"
      />
    </div>
  );
}
