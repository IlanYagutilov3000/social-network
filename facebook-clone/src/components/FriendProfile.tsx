import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFriendsDetails } from "../services/userServices";
import { UserDetails } from "../interfaces/User";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import { Post } from "../interfaces/Post";
import { deletePost, getAllPostsOfTheUser } from "../services/postServices";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import DeleteUserModal from "./DeleteUserModal";
import DeleteFriendAccount from "./DeleteFriendAccountModal";

interface FriendProfileProps {

}

const FriendProfile: FunctionComponent<FriendProfileProps> = () => {
    const { userId } = useParams()
    const [viewProfile, setViewProfile] = useState<UserDetails>()
    const [posts, setPosts] = useState<Post[]>([])
    const [postChange, setPostChange] = useState<boolean>(false)
    const [userChanged, setUserChanged] = useState<boolean>(false);
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);

    const user = useSelector((state: rootState) => state.auth.user)

    useEffect(() => {
        getFriendsDetails(userId as string).then((res) => {
            setViewProfile(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        getAllPostsOfTheUser(userId as string).then((res) => {
            setPosts(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [postChange])

    let refresh = () => {
        setUserChanged(!userChanged)
    }

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <div className="profileContainer d-flex justify-content-center">
                    <div className="profileImageContainer me-3">
                        <img src={viewProfile?.profilePicture} alt="asdas" style={{ width: "100px", height: "100px" }} />
                    </div>
                    <div className="userInfo">
                        <p>{viewProfile?.firstname} {viewProfile?.lastname}</p>
                        <p> Birthday: {viewProfile?.birthday ?
                            new Date(viewProfile.birthday).toLocaleString("en-IL", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "Invalid date"}</p>
                        <p> Gender: {viewProfile?.gender}</p>
                    </div>
                </div>
                <div className="buttunForTheUser">
                    <button className="btn btn-success mx-1" disabled>add friend</button>
                    {/* only the user or admin can see this buttn */}
                    {user?.isAdmin && (<button className="btn btn-danger" onClick={() => {
                        setOpenDeleteUser(true)
                    }} >delete account</button>)}
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
                                    {/* may need to chnage it from d-grow to align something... */}
                                    <div className="nameAndDate d-flex flex-column mx-2 flex-grow-1">
                                        <h5 className="fs-6 m-0" >{typeof post.userId === "object"
                                            ? `${post.userId.firstname} ${post.userId.lastname}`
                                            : "Unknown User"}</h5>
                                        {/* need to replazce this with human date */}
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
                                        <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown"></i>
                                        <ul className="dropdown-menu">
                                            <li><button>Edit</button></li>
                                            {(user?.isAdmin || user?._id?.toString() ===
                                                (typeof post.userId === "object" ? post.userId._id?.toString() : post.userId?.toString())) && (
                                                    <li>
                                                        <button onClick={() => {
                                                            deletePost(post._id as string).then(() => {
                                                                setPostChange(!postChange);
                                                            }).catch((err) => {
                                                                console.log(err);
                                                            });
                                                        }}>
                                                            Delete
                                                        </button>
                                                    </li>
                                                )}
                                            <li><button>something</button></li>
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

            <DeleteFriendAccount show={openDeleteUser} onHide={() => setOpenDeleteUser(false)} refresh={refresh} userId={userId as string} />

        </>
    );
}

// edit user button needs to be shown only in the user profile
// delete button needs to be only shown to the admin in the view friends page, the delete button in the user profile needs to be shown to admin and the user

export default FriendProfile;