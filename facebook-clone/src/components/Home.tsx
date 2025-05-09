import { FunctionComponent } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Contacts from "./Contacts";
import Feed from "./Feed";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                <Sidebar />
                <Feed />
                <Contacts />
            </div>

        </>
    );
}

export default Home;