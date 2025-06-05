import { FunctionComponent, useEffect, useState } from "react";
import { getPostById, updatePost } from "../services/postServices";
import { Post } from "../interfaces/Post";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup"
import { ErrorMsg, succesMsg } from "../services/feedback";

interface EditPostProps {
    onHide: Function;
    refresh: Function;
    postId: string
}

const EditPost: FunctionComponent<EditPostProps> = ({onHide, refresh, postId}) => {
    
    const [post, setPost] = useState<Post>({
        text: "",
        image: "",
        userId: ""
    })

    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                const postFromServer = res.data;
                setPost({
                    ...postFromServer,
                    userId: (postFromServer.userId as any)._id,
                    image: postFromServer.image ?? "" // <-- this makes the image a string if there's no image
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);    

    const formik : FormikValues = useFormik<Post>({
        initialValues: {
            text: post.text,
            image: post.image,
            userId: post.userId
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            text: yup.string().required().min(1),
            image: yup.string().optional()
        }),
        onSubmit: (values) => {
            updatePost({...values, _id: postId}).then(() => {
                onHide()
                refresh()
                succesMsg("You've updated the post")
            }).catch((err) => {
                console.log(err);
                ErrorMsg("An error has accured")
            })
        }
    })


    return (
        <>
            <div className="createPostContainer d-flex flex-column">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <textarea className="form-control" id="text" placeholder="text"
                                    name="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.text} style={{ height: "125px" }} />
                                <label htmlFor="text">What's on your mind?</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="image" placeholder="image"
                                    name="image" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image} />
                                <label htmlFor="image">Upload URL</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary w-100" >Post</button>
                </form>
            </div>
        </>
    );
}

export default EditPost;