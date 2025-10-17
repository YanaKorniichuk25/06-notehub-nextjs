import { NoteDetailsClient } from "./NoteDetails.client";

interface NotePageProps {
  params: {
    id: string;
  };
}

const NotePage = ({ params }: NotePageProps) => {
  const id = Number(params.id);
  return <NoteDetailsClient id={id} />;
};

export default NotePage;
