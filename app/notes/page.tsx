import React from "react";
import { QueryClient, dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notes — NoteHub" };

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Виправлено: fetchNotes очікує два аргументи (page, search)
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes(1, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
