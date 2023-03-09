import { useNote } from "../../hooks";
import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface INoteProps {
  onDelete: (id: string) => void;
}

export default function Note(props: INoteProps) {
  const { onDelete } = props;
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 ? (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          ) : null}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
