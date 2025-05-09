import { FunctionComponent } from "react";
import CommentPost from "./CommentPost";
import { Modal } from "react-bootstrap";

interface CommentPostModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    postId: string
}

const CommentPostModal: FunctionComponent<CommentPostModalProps> = ({show, onHide, refresh, postId}) => {
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
                        Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0" >
                    <CommentPost postId={postId} />
                </Modal.Body>
                {/* <Modal.Footer >
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default CommentPostModal;