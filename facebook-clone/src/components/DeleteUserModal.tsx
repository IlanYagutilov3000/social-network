import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUSer } from "../services/userServices";
import { ErrorMsg, succesMsg } from "../services/feedback";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { rootState } from "../redux/store";

interface DeleteUserModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({ show, onHide, refresh, userId }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state: rootState) => state.auth.user);


    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="conatiner d-flex flex-column align-items-center" >
                        <p>Are You Sure You Want To Delete This User?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="success" onClick={() => onHide()}>No</Button>

                        <Button variant="danger mx-1" onClick={() => deleteUSer(userId as string).then(() => {
                            onHide()
                            refresh()
                            dispatch(logoutUser())
                            navigate("/login")
                            succesMsg("User Was Deleted!")
                        }).catch((err) => {
                            ErrorMsg("Opss.. Something Went Wrong!")
                            console.log(err)
                        }
                        )}>Delete</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUserModal;