import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "~/types";

interface INoteLayout {
  notes: Note[];
}

export default function NoteLayout(props: INoteLayout) {
  const { notes } = props;
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (note == null) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet context={note} />
    </>
  );
}
