import { FunctionComponent } from "react";
import './Contacts.css'

interface ContactsProps {

}
/* this component will have all of the user friends but for now it will hvae my contacts */
const Contacts: FunctionComponent<ContactsProps> = () => {
    return (
        <>
            <div className=" sidebarContainer d-flex flex-column align-items-center ">
                <p className="fw-bold">Dev: Ilan Yagutilov</p>
                <p className="fw-bold">Email: Ilanyagotilov191@gmail.com</p>
                <p> &#169; 2025. All rights reserved</p>
            </div>
        </>
    );
}

export default Contacts;