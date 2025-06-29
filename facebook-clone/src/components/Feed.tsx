import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getAllPosts, likeAndUnlikePosts } from "../services/postServices";
import { Post } from "../interfaces/Post";
import LoadingPlaceHolder from "./loadingComp/LoadingPlaceHolder";
import CreatePostModal from "./CreatePostModal";
import { getComments } from "../services/commentServices";
import CommentPostModal from "./CommentPostModal";
import { useDispatch, useSelector } from "react-redux";
import { appDispach, rootState } from "../redux/store";
import { fetchUserDetails } from "../redux/slices/userDetails";
import EditPostModal from "./EditPostModal";
import { ErrorMsg, succesMsg } from "../services/feedback";
import { savePost } from "../services/userServices";
import './Feed.css'

interface FeedProps {

}

const Feed: FunctionComponent<FeedProps> = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [postId, setPostId] = useState<string>("")
    const user = useSelector((state: rootState) => state.auth.user)
    const { userDetails, loading } = useSelector((state: rootState) => state.userDetails);
    const dispatch = useDispatch<appDispach>()

    const [openCommentPost, setOpenCommentPost] = useState<boolean>(false)
    const [openCreatePost, setCreatePost] = useState<boolean>(false)
    const [postChange, setPostChange] = useState<boolean>(false)
    const [openEditPost, setOpenEditPost] = useState<boolean>(false)
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("oldest");

    let refresh = () => {
        setPostChange(!postChange)
    }

    useEffect(() => {
        getAllPosts(sortBy)
            .then((res) => setPosts(res.data))
            .catch((err) => console.log(err));
    }, [postChange, sortBy]);

    useEffect(() => {
        dispatch(fetchUserDetails())
    }, [dispatch, user])

    return (
        <>
            <div className="feedContainer ">
                <div className="d-flex justify-content-center mb-1 gap-2">
                    <button
                        className={`btn btn-sm ${sortBy === "oldest" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSortBy("oldest")}
                    >
                        Old
                    </button>
                    <button
                        className={`btn btn-sm ${sortBy === "newest" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setSortBy("newest")}
                    >
                        New
                    </button>
                </div>
                <div className="createPostModalContainer d-flex flex-column shadow-sm mb-1">
                    <div className="d-flex modalDiv">
                        <Link to={"/profile"}> <img src={userDetails?.profilePicture} alt="Profile Picture" style={{ width: "40px", height: "40px" }} className="rounded-circle" /> </Link>
                        <div className="modalHolder ms-2" onClick={() => {
                            setCreatePost(true);
                        }} ><span>What's on your mind, username?</span></div>
                    </div>
                </div>
                {posts.length ? (posts.map((post) => (
                    <div className="card cardContainer d-flex flex-column mb-3" key={post._id} >
                        <div className="card-body p-0">
                            <div className="cardOwner d-flex">
                                <img src={typeof post.userId === "object"
                                    ? `${post.userId.profilePicture}`
                                    : "https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic.jpg"} alt="profile picutre of the user who created th epost" style={{ width: "40px", height: "40px" }} className="rounded-circle" />
                                <div className="nameAndDate d-flex flex-column mx-2 flex-grow-1">
                                    <Link style={{ color: "black", textDecoration: "none" }} to={`/profile/${typeof post.userId === "object" ? post.userId._id : post.userId}`}><h5 className="fs-6 m-0" >{typeof post.userId === "object"
                                        ? `${post.userId.firstname} ${post.userId.lastname}`
                                        : "Unknown User"}</h5></Link>

                                    {/* this code makes the date readbile */}
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
                                <div className="dropdown " >
                                    <button className="btn" data-bs-toggle="dropdown"><i className="fa-solid fa-ellipsis-vertical postSettings" ></i></button>
                                    <ul className="dropdown-menu">
                                        {(user?.isAdmin || user?._id?.toString() ===
                                            (typeof post.userId === "object" ? post.userId._id?.toString() : post.userId?.toString())) && (
                                                <li>
                                                    <button className="btn btn-outline-primary" onClick={() => {
                                                        setOpenEditPost(true)
                                                        setPostId(post._id as string)
                                                    }} >Edit</button>
                                                </li>
                                            )}
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
                                        <li>
                                            <button className="btn btn-outline-info my-1" onClick={() => {
                                                savePost(post._id as string).then(() => succesMsg("Post got saved")
                                                ).catch((err) => {
                                                    console.log(err);
                                                    ErrorMsg("Something went wrong");
                                                })
                                            }} >
                                                Save
                                            </button>
                                        </li>
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
                                <span className="p-1">
                                    <i className={`fa-solid fa-thumbs-up me-1 ${post.likes?.includes(user?._id as string) ? 'fa-solid text-primary' : 'fa-regular'}`}></i>
                                    {post.likes?.length}
                                </span>
                                <span className="p-1" >comment</span>
                            </div>
                            <hr className="m-0" />
                            <div className="likeAndComment d-flex justify-content-around">
                                <p className="m-0 p-0 likebutton" onClick={() => {
                                    likeAndUnlikePosts(post._id as string).then(() => {
                                        setPostChange(!postChange);
                                    }).catch((err) => {
                                        console.log(err.response);
                                    })
                                }} >Like </p>
                                <p className="m-0 p-0 commentbutton" onClick={() => {
                                    setOpenCommentPost(true)
                                    setPostId(post._id as string)
                                }}  >Comment</p>
                                <p className="m-0 p-0 savebutton" onClick={() => {
                                    savePost(post._id as string).then(() => succesMsg("Post got saved")
                                    ).catch((err) => {
                                        console.log(err);
                                        ErrorMsg("Something went wrong");
                                    })
                                }} >Save</p>
                            </div>
                        </div>
                    </div>
                ))) : (<LoadingPlaceHolder />)}
            </div>

            <CreatePostModal show={openCreatePost} onHide={() => setCreatePost(false)} refresh={refresh} />

            <CommentPostModal show={openCommentPost} onHide={() => setOpenCommentPost(false)} refresh={refresh} postId={postId} />

            <EditPostModal show={openEditPost} onHide={() => setOpenEditPost(false)} refresh={refresh} postId={postId} />
        </>
    );
}

export default Feed;