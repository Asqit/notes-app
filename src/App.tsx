import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { NewNote, NoteList, NoteLayout, Note, EditNote } from "~/components";
import { useLocalStorage } from "~/hooks";
import { NoteData, Tag, RawNote, RawNoteData } from "~/types";
import { v4 as uuidV4 } from "uuid";
import { useMemo } from "react";

export default function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const handleNoteCreation = (data: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const handleTagAddition = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const handleNoteEdit = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  };

  const handleNoteDelete = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <Container>
      <Routes>
        <Route
          index
          element={
            <NoteList
              onEditTag={updateTag}
              onDeleteTag={deleteTag}
              availableTags={tags}
              notes={notesWithTags}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={handleNoteCreation}
              onTagAdd={handleTagAddition}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={handleNoteDelete} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={handleNoteEdit}
                onTagAdd={handleTagAddition}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<></>} />
      </Routes>
    </Container>
  );
}
