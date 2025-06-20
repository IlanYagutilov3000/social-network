import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appDispach, rootState } from "../redux/store";
import { fetchUserDetails } from "../redux/slices/userDetails";
import { deletePost, getAllPostsOfTheUser } from "../services/postServices";
import { Post } from "../interfaces/Post";
import LoadingPlaceHolder from "./loadingComp/LoadingPlaceHolder";
import DeleteUserModal from "./DeleteUserModal";
import DeleteFriendAccount from "./DeleteFriendAccountModal";
import EditUserModal from "./EditUserModal";
import EditPostModal from "./EditPostModal";
import { ErrorMsg, succesMsg } from "../services/feedback";

interface UserProfileProps {

}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const dispatch = useDispatch<appDispach>()
    const { userDetails, loading } = useSelector((state: rootState) => state.userDetails);
    const user = useSelector((state: rootState) => state.auth.user)
    const [postChange, setPostChange] = useState<boolean>(false)
    const [userChanged, setUserChanged] = useState<boolean>(false);
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
    const [openEditUSer, setOpenEditUser] = useState<boolean>(false);
    const [openEditPost, setOpenEditPost] = useState<boolean>(false);
    const [postId, setPostId] = useState<string>("")

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [userChanged])

    useEffect(() => {
        getAllPostsOfTheUser(user?._id as string).then((res) => {
            setPosts(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [postChange, userChanged])

    let refresh = () => {
        setUserChanged(!userChanged)
    }

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <div className="profileContainer d-flex justify-content-center">
                    <div className="profileImageContainer me-3">
                        <img src={userDetails?.profilePicture} alt="asdas" style={{ width: "100px", height: "100px" }} />
                    </div>
                    <div className="userInfo">
                        <p>{userDetails?.firstname} {userDetails?.lastname}</p>
                        <p> Birthday: {userDetails?.birthday ?
                            new Date(userDetails.birthday).toLocaleString("en-IL", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "Invalid date"}</p>
                        <p> Gender: {userDetails?.gender}</p>
                    </div>
                </div>
                <div className="buttunForTheUser">
                    <button className="btn btn-primary" onClick={() => {
                        setOpenEditUser(true)
                    }} >edit user</button>
                    <button className="btn btn-success mx-1" disabled>add friend</button>
                    {/* only the user or admin can see this buttn */}
                    <button className="btn btn-danger" onClick={() => {
                        setOpenDeleteUser(true)
                    }} >delete account</button>
                </div>
                <div className="feedContainer userCards ">
                    {posts.length ? (posts.map((post) => (
                        <div className="card cardContainer d-flex flex-column mb-3" key={post._id} >
                            <div className="card-body p-0">
                                <div className="cardOwner d-flex">
                                    <span>{ }</span>
                                    <img src={typeof post.userId === "object"
                                        ? `${post.userId.profilePicture}`
                                        : "https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic.jpg"} alt="profile picutre of the user who created th epost" style={{ width: "40px", height: "40px" }} className="rounded-circle" />
                                    <div className="nameAndDate d-flex flex-column mx-2 flex-grow-1">
                                        <h5 className="fs-6 m-0" >{typeof post.userId === "object"
                                            ? `${post.userId.firstname} ${post.userId.lastname}`
                                            : "Unknown User"}</h5>
                                        <span className="postDate" > {post.createdAt ?
                                            new Date(post.createdAt).toLocaleString("en-IL", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "Invalid date"}</span>
                                    </div>
                                    <div className="dropdown" >
                                        <button className="btn" data-bs-toggle="dropdown"><i className="fa-solid fa-ellipsis-vertical postSettings" ></i></button>
                                        <ul className="dropdown-menu">
                                            <li><button className="btn btn-outline-primary" onClick={() => {
                                                setOpenEditPost(true)
                                                setPostId(post._id as string)
                                            }} >Edit</button></li>
                                            {(user?.isAdmin || user?._id?.toString() ===
                                                (typeof post.userId === "object" ? post.userId._id?.toString() : post.userId?.toString())) && (
                                                    <li>
                                                        <button className="btn btn-outline-danger my-1" onClick={() => {
                                                            deletePost(post._id as string).then(() => {
                                                                setPostChange(!postChange);
                                                                succesMsg("Post was deleted")
                                                            }).catch((err) => {
                                                                console.log(err);
                                                                ErrorMsg("Something went wrong")
                                                            });
                                                        }}>
                                                            Delete
                                                        </button>
                                                    </li>
                                                )}
                                        </ul>
                                    </div>
                                </div>
                                <p className="m-0" >{post.text}</p>
                                {post.image && (
                                    <div className="postImage">
                                        <img src={post.image} alt="post picture" className="card-img" />
                                    </div>
                                )}
                                <div className="likeAndCommentCount d-flex justify-content-between">
                                    <span>Likes {post.likes?.length} </span>
                                    <span>comment</span>
                                </div>
                            </div>
                        </div>
                    ))) : (<LoadingPlaceHolder />)}
                </div>
            </div>

            <DeleteUserModal show={openDeleteUser} onHide={() => setOpenDeleteUser(false)} refresh={refresh} userId={user?._id as string} />

            <EditUserModal show={openEditUSer} onHide={() => setOpenEditUser(false)} refresh={refresh} userId={user?._id as string} />

            <EditPostModal show={openEditPost} onHide={() => setOpenEditPost(false)} refresh={refresh} postId={postId} />

        </>
    );
}

export default UserProfile;