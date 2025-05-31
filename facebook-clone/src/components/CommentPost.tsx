import { FunctionComponent, useEffect, useState } from "react";
import { Post } from "../interfaces/Post";
import { getPostById } from "../services/postServices";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import { createComment, getComments } from "../services/commentServices";
import { Comment } from "../interfaces/Comment";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import Spinner from "./Spinner";

interface CommentPostProps {
    postId: string
}

const CommentPost: FunctionComponent<CommentPostProps> = ({ postId }) => {
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const user = useSelector((state: rootState) => state.auth.user)
    const [commentAdded, setCommentAdded] = useState<boolean>(false)

    useEffect(() => {
        getPostById(postId).then((res) => {
            setPost(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        getComments(postId).then((res) => {
            setComments(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [commentAdded])


    const formik: FormikValues = useFormik<Comment>({
        initialValues: {
            text: "",
        },
        validationSchema: yup.object({
            text: yup.string().min(1)
        }),
        onSubmit: (values, { resetForm }) => {
            createComment(postId, values).then((res) => {
                setCommentAdded((prev) => !prev);
            }).catch((err) => {
                console.log(err);
            })
            resetForm()
        }
    })

    /* console.log(comments); */

    return (
        <>
            {post ? (
                <div className=" cardContainer d-flex flex-column mb-3" key={post._id} >
                    <div className=" d-flex">
                        <div className="nameAndDate d-flex flex-column mx-2">
                            <h5 className="fs-6 m-0" >{typeof post.userId === "object"
                                ? `${post.userId.firstname} ${post.userId.lastname}`
                                : "Unknown User"}</h5>
                            {/* need to replazce this with human date */}
                            <span className="postDate" >{post.createdAt ? new Date(post.createdAt).toLocaleString("en-IL", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            }) : "Unknown Date"}</span>
                        </div>
                    </div>
                    <p className="m-0" >{post.text}</p>
                    {post.image && (
                        <div className="postImage">
                            <img src={post.image} alt="post picture" className="card-img mb-3" />
                        </div>
                    )}
                    <div>
                        {comments.length ? (comments.map((comment) => (
                            <div key={comment._id} className="commentContainer" >
                                <div className="flex flex-column commentText mb-3 p-0 ">
                                    <p className="commentOnwerDetails" >{typeof comment.userId === "object"
                                        ? `${comment.userId.firstname} ${comment.userId.lastname}`
                                        : "Unknown User"}</p>
                                    <p className="mb-0"> {comment.text} </p>
                                </div>

                            </div>
                        ))) : (<Spinner />)}
                        <div>
                            <div className="card-body p-0">
                                <form onSubmit={formik.handleSubmit} >
                                    <div className="">
                                        <div className="d-flex align-items-center inputcontainer">
                                            <div className="form-floating w-100">
                                                <textarea className="form-control" id="text" placeholder="text"
                                                    name="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.text} style={{ height: "55px", backgroundColor: "#eef0f3" }} />
                                                <label htmlFor="text">What's on your mind?</label>
                                                {/* {formik.touched.text && formik.errors.text && <p className="text-danger fs-6" >{formik.errors.text}</p>} */}
                                            </div>
                                            <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn commentBtn" /* onClick={() => setCommentAdded(!commentAdded)} */ >
                                                <i className="fa-regular fa-square-caret-right fs-5 text-primary"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<LoadingPlaceHolder />)}
        </>
    );
}

export default CommentPost;