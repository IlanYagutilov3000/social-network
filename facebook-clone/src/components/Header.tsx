import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { appDispach, rootState } from "../redux/store";
import { User, UserDetails } from "../interfaces/User";
import { getUserById } from "../services/userServices";
import { fetchUserDetails } from "../redux/slices/userDetails";
import { logoutUser } from "../redux/slices/authSlice";
import { succesMsg } from "../services/feedback";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    /* const [userDetails, setUserDetails] = useState<UserDetails | null>(null) */
    const user = useSelector((state: rootState) => state.auth.user)
    const { userDetails, loading } = useSelector((state: rootState) => state.userDetails);
    const dispatch = useDispatch<appDispach>()

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch, user])

    const navigate = useNavigate()

    return (
        <>
            <div className="d-flex shadow-sm rounded bg-white sticky-top">
                <div className="d-flex my-2 mx-2 align-items-center">
                    <NavLink to={"/"}><img src="logo.png" alt="Logo" style={{ width: "40px", height: "40px" }} className="me-2" /></NavLink>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    {/* color text-primary */}
                    <div className="d-flex justify-content-between iconContainer  ">
                        <NavLink to={"/"} className=""> <i className="fa-solid fa-house fs-5"></i></NavLink>
                        <NavLink to={"/searchFriends"}><i className="fa-solid fa-user-group fs-5"></i></NavLink>
                        <NavLink to={"/watch"}><i className="fa-brands fa-square-youtube fs-5"></i></NavLink>
                        <NavLink to={"/saved-posts"}><i className="fa-solid fa-bookmark "></i></NavLink>
                        <NavLink to={"/group"} onClick={(e) => {
                            e.preventDefault()
                            alert("Coming soon")
                        }} ><i className="fa-solid fa-group-arrows-rotate fs-5" ></i></NavLink>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="dropdown">
                        <button className="btn rounded-circle bg-body-secondary btn1 me-2 dropdown-toggle" data-bs-toggle="dropdown" title="menu" ><i className="fa-solid fa-bars"></i></button> <ul className="dropdown-menu">
                            <li> <NavLink to={"/"} className="dropdown-item"> <i className="fa-solid fa-house fs-5"></i></NavLink></li>
                            <li><NavLink to={"/searchFriends"} className="dropdown-item" ><i className="fa-solid fa-user-group fs-5"></i></NavLink></li>
                            <li><NavLink to={"/watch"} className="dropdown-item"><i className="fa-brands fa-square-youtube fs-5"></i></NavLink></li>
                            <li><NavLink to={"/saved-posts"} className="dropdown-item"><i className="fa-solid fa-bookmark"></i></NavLink></li>
                        </ul>
                    </div>
                    
                    <button className="btn rounded-circle bg-body-secondary btn1 me-2" title="logout" onClick={() => {
                        dispatch(logoutUser())
                        succesMsg("You've logged out")
                        setTimeout(() => {
                            navigate("/login")
                        }, 100)
                    }} ><i className="fa-solid fa-right-from-bracket"></i></button>
                    <button className="btn rounded-circle bg-body-secondary btn1" title="notifications" onClick={() => {
                        alert("Coming soon")
                    }} ><i className="fa-solid fa-bell"></i></button>
                    {/* Need to change the image to the users image */}
                    <img src={userDetails?.profilePicture} alt="Logo" style={{ width: "40px", height: "40px" }} className="mx-3" />
                </div>
            </div>
        </>
    );
}

export default Header;