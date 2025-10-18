import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // ✅ Правильний синтаксис prefetchQuery
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });

  return (
    <TanStackProvider>
      <NotesClient />
    </TanStackProvider>
  );
}
