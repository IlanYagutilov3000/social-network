import { FunctionComponent } from "react";

interface ContactsProps {

}

const Contacts: FunctionComponent<ContactsProps> = () => {
    return (
        <>
            <div className=" sidebarContainer d-flex flex-column align-items-center ">
                <p>This is where you friends</p>
                <p>are going to be</p>
                <p>showen once the feature</p>
                <p>is done</p>
            </div>
        </>
    );
}

export default Contacts;