import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider>
      <NoteDetailsClient
        noteId={noteId}
        initialNote={queryClient.getQueryData(["note", noteId])}
      />
    </TanStackProvider>
  );
}
