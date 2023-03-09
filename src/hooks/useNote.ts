import { useOutletContext } from "react-router-dom";
import { Note } from "../components/NoteForm/NoteForm";

export default function useNote() {
  return useOutletContext<Note>();
}
