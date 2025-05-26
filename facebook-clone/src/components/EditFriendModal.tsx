import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditFriendsProfile from "./EditFriendsProfile";

interface EditFriendModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const EditFriendModal: FunctionComponent<EditFriendModalProps> = ({ show, onHide, refresh, userId }) => {
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
                        Edit user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <EditFriendsProfile onHide={onHide} refresh={refresh} userId={userId} />
                </Modal.Body>
            </Modal>
        </>);
}

export default EditFriendModal;