import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserDetails } from "../redux/slices/userDetails";
import { rootState, appDispach } from "../redux/store";
import './Sidebar.css'

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const user = useSelector((state: rootState) => state.auth.user)
    const { userDetails, loading } = useSelector((state: rootState) => state.userDetails);
    const dispatch = useDispatch<appDispach>()

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch, user])
    return (
        <>
            <div className=" sidebarContainer d-flex flex-column align-items-center ">
                <div className="itemContainer d-flex flex-column  ">
                    <div className="imgContainer d-flex align-items-center">
                        <img src={userDetails?.profilePicture} alt="profile picture" style={{ width: "36px", height: "36px" }} className="rounded-circle" />
                        {/* this needs t come from the data base */}
                        <Link to={"/profile"} style={{ color: "black", textDecorationColor: "black" }} > <span className="px-2">{userDetails?.firstname} {userDetails?.lastname} </span> </Link>
                    </div>
                    <Link className="iconHolder d-flex align-items-center px-2" to={"/searchFriends"}>
                    {/* tried to change the icon doesn't change, don't know why */}
                        <i className="fa-solid fa-user-group"></i>
                        <p className="m-0">Friends</p>
                    </Link>
                    <Link className="iconHolder d-flex align-items-center px-2" to={"/saved-posts"}>
                        <i className="fa-solid fa-bookmark "></i>
                        <p className="m-0">Saved</p>
                    </Link>
                    <hr />
                </div>
            </div>
        </>
    );
}

export default Sidebar;