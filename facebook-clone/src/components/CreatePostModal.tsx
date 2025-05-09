import { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Home from "./Home";
import CreatePost from "./CreatePost";

interface CreatePostModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
}

const CreatePostModal: FunctionComponent<CreatePostModalProps> = ({show, onHide, refresh}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <CreatePost onHide={onHide} refresh={refresh} />
                </Modal.Body>
                {/* <Modal.Footer >
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default CreatePostModal;