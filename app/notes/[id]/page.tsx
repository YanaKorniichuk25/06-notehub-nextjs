import NoteDetailsClient from "./NoteDetails.client";

interface NotePageProps {
  params: {
    id: string;
  };
}

const NotePage = ({ params }: NotePageProps) => {
  return <NoteDetailsClient id={params.id} />;
};

export default NotePage;
