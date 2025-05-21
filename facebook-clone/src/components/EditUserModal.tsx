import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditUser from "./EditUser";

interface EditUserModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const EditUserModal: FunctionComponent<EditUserModalProps> = ({ show, onHide, refresh, userId }) => {
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
                    <EditUser onHide={onHide} refresh={refresh} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditUserModal;