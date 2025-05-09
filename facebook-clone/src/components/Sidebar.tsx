import { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserDetails } from "../redux/slices/userDetails";
import { rootState, appDispach } from "../redux/store";

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
            {/* overflow-y-scroll */}
            <div className=" sidebarContainer d-flex flex-column align-items-center ">
                <div className="itemContainer d-flex flex-column  ">
                    {/* we need to have a map herefro the image of the user andd name */}
                    <div className="imgContainer d-flex align-items-center">
                        <img src={userDetails?.profilePicture} alt="profile picture" style={{ width: "36px", height: "36px" }} className="rounded-circle" />
                        {/* this needs t come from the data base */}
                        <span className="px-2">{userDetails?.firstname} {userDetails?.lastname} </span>
                    </div>
                    <Link className="iconHolder d-flex align-items-center px-2" to={"/friends"}>
                        <i className="fa-solid fa-user-group fs-5 "></i>
                        <p className="m-0">Friends</p>
                    </Link>
                    <Link className="iconHolder d-flex align-items-center px-2" to={"/"}>
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