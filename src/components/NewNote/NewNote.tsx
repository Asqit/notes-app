import NoteForm from "../NoteForm/NoteForm";
import { NoteData, Tag } from "~/types";

interface INewNoteProps {
  onSubmit: (data: NoteData) => void;
  onTagAdd: (tag: Tag) => void;
  availableTags: Tag[];
}

export default function NewNote(props: INewNoteProps) {
  const { ...rest } = props;

  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm {...rest} />
    </>
  );
}
