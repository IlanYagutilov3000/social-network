import { FunctionComponent, useEffect, useState } from "react";
import { getSavedPosts, savePost } from "../services/userServices";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import { ErrorMsg, succesMsg } from "../services/feedback";
import { Post } from "../interfaces/Post";
import { Link } from "react-router-dom";

interface SavedPostsProps {

}

const SavedPosts: FunctionComponent<SavedPostsProps> = () => {
    const [savedPosts, setSavedPosts] = useState<Post[]>([])
    const [postChange, setPostChange] = useState<boolean>(false)

    useEffect(() => {
        getSavedPosts().then((res) => {
            setSavedPosts(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [postChange])

    return (

        <>
            <div className=" container ">
                {savedPosts.length ? (
                    savedPosts.map((post) => (
                        <div className="card cardContainer d-flex flex-column mb-3" key={post._id}>
                            <div className="card-body p-0">
                                <div className="cardOwner d-flex">
                                    <img
                                        src={
                                            typeof post.userId === "object"
                                                ? `${post.userId.profilePicture}`
                                                : "https://painrehabproducts.com/wp-content/uploads/2014/10/facebook-default-no-profile-pic.jpg"
                                        }
                                        alt="profile picture"
                                        style={{ width: "40px", height: "40px" }}
                                        className="rounded-circle"
                                    />
                                    <div className="nameAndDate d-flex flex-column mx-2 flex-grow-1">
                                        <Link
                                            to={`/profile/${typeof post.userId === "object" ? post.userId._id : post.userId
                                                }`}
                                        >
                                            <h5 className="fs-6 m-0">
                                                {typeof post.userId === "object"
                                                    ? `${post.userId.firstname} ${post.userId.lastname}`
                                                    : "Unknown User"}
                                            </h5>
                                        </Link>
                                        <span className="postDate">
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleString("en-IL", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : "Invalid date"}
                                        </span>
                                    </div>
                                </div>

                                <p className="m-2">{post.text}</p>

                                {post.image && (
                                    <div className="postImage">
                                        <img src={post.image} alt="post picture" className="card-img" />
                                    </div>
                                )}

                                <div className="likeAndCommentCount d-flex justify-content-between px-2">
                                    <span>Likes {post.likes?.length}</span>
                                </div>
                                <hr className="m-0" />
                                <div className="likeAndComment d-flex justify-content-around py-1">
                                    <p
                                        className="m-0 p-0 savebutton"
                                        onClick={() => {
                                            savePost(post._id as string)
                                                .then(() => {
                                                    setPostChange(!postChange)
                                                    succesMsg("Post was unsaved")
                                                }
                                                )
                                                .catch((err) => {
                                                    console.log(err);
                                                    ErrorMsg("Something went wrong");
                                                });
                                        }}
                                    >
                                        Saved
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <LoadingPlaceHolder />
                )}
            </div>
        </>
    );
}

export default SavedPosts;