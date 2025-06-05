import { FunctionComponent, useEffect, useState } from "react";
import { getAllUsers } from "../services/userServices";
import { UserDetails } from "../interfaces/User";
import { Link } from "react-router-dom";
import './FriendsComponent.css'

interface FriendsComponentProps {

}

const FriendsComponent: FunctionComponent<FriendsComponentProps> = () => {
    const [users, setUsers] = useState<UserDetails[]>([])
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const filterUsers = users.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      });
    
    return (
        <>
        <div className="container">
                <div className="d-flex justify-content-center align-items-center inputcontainer">
                    <i className="fa-solid fa-magnifying-glass serachIcon ps-2"></i>
                    {/* Needs to be inside of form */}
                    <input type="text" placeholder="Search Facebook" className="searchFacebook " value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                </div>

                {search &&
                    filterUsers.map((user) => (
                        <Link to={`/profile/${user._id}`} key={user._id}>
                            <h5 className="fs-6 m-0">
                                {user.firstname} {user.lastname}
                            </h5>
                        </Link>
                    ))}
        </div>

        
        </>
    );
}

export default FriendsComponent;