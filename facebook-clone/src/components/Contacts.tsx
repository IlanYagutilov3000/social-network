import { FunctionComponent } from "react";

interface ContactsProps {

}

const Contacts: FunctionComponent<ContactsProps> = () => {
    return (
        <>
            <div className=" sidebarContainer d-flex flex-column align-items-center ">
                <p className="fw-bold">Coming soon</p>
                <p>have a Gooo day</p>
            </div>
        </>
    );
}

export default Contacts;