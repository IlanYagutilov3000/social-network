import { FunctionComponent } from "react";
import './Contacts.css'

interface ContactsProps {

}
/* this component will have all of the user friends but for now it will hvae my contacts */
const Contacts: FunctionComponent<ContactsProps> = () => {
    return (
        <>
        <footer>
                <div className=" sidebarContainer d-flex flex-column align-items-center ">
                    <p className="fw-bold">Dev: Ilan Yagutilov</p>
                    <p className="fw-bold">Email: Ilanyagotilov191@gmail.com</p>
                    <p> &#169; 2025. All rights reserved</p>
                    <div className="links">
                        <a href="https://www.linkedin.com/in/ilan-yagutilov-57908234b/" target="_blank" className="text-black me-1" ><i className="fa-brands fa-linkedin"></i></a>
                        <a href="https://www.facebook.com/ilanyagotilov" target="_blank" ><i className="fa-brands fa-facebook"></i></a>
                    </div>
                </div>
        </footer>
            
        </>
    );
}

export default Contacts;