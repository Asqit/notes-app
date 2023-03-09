import NoteForm from "../NoteForm/NoteForm";
import { useNote } from "~/hooks";
import { Tag, NoteData } from "~/types";

interface IEditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  onTagAdd: (tag: Tag) => void;
  availableTags: Tag[];
}

export default function EditNote(props: IEditNoteProps) {
  const { onSubmit, onTagAdd, availableTags } = props;
  const note = useNote();

  return (
    <>
      <h1 className="mb-4">Edit note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        availableTags={availableTags}
        onTagAdd={onTagAdd}
        onSubmit={(data) => onSubmit(note.id, data)}
      />
    </>
  );
}
