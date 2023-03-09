import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onTagAdd: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm(props: NoteFormProps) {
  const { onSubmit, onTagAdd, availableTags, title, markdown, tags } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownref = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags ?? []);
  const nagivate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownref.current!.value,
      tags: selectedTags,
    });

    nagivate("..");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag: Tag = { id: uuidV4(), label };

                  onTagAdd(newTag);

                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={15}
            defaultValue={markdown}
            ref={markdownref}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
