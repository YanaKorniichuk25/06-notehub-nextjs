import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import NotesClient from "./Notes.client";

export default function NotesPage() {
  return (
    <TanStackProvider>
      <NotesClient />
    </TanStackProvider>
  );
}
