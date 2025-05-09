import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditPost from "./EditPost";

interface EditPostModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    postId: string;
}

const EditPostModal: FunctionComponent<EditPostModalProps> = ({onHide, refresh, postId, show}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0" >
                    <EditPost postId={postId} refresh={refresh} onHide={onHide} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditPostModal;