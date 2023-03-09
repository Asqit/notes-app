import { Tag } from "~/types";
import { Form, Modal, Stack, Col, Row, Button } from "react-bootstrap";

interface IEditTagsModalProps {
  availableTags: Tag[];
  isVisible: boolean;
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onEditTag: (id: string, label: string) => void;
}

export default function EditTagsModal(props: IEditTagsModalProps) {
  const { availableTags, isVisible, handleClose, onDeleteTag, onEditTag } =
    props;

  return (
    <Modal show={isVisible} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onEditTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-danger"
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
