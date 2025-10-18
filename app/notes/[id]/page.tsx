import { fetchNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { TanStackProvider } from "../../../components/TanStackProvider/TanStackProvider";
import { NoteDetailsClient } from "./NoteDetails.client";

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  const noteId = Number(params.id);

  await queryClient.prefetchQuery<Note, Error>({
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
