import { FunctionComponent, useEffect, useState } from "react";
import { getPostById, updatePost } from "../services/postServices";
import { Post } from "../interfaces/Post";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup"

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

    /* useEffect(() => {
        getPostById(postId).then((res) => {
            setPost(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, []) */
    useEffect(() => {
        getPostById(postId)
            .then((res) => {
                const postFromServer = res.data;
                setPost({
                    ...postFromServer,
                    userId: (postFromServer.userId as any)._id // <-- Only keep the userId string
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
                // we need to add toast here and across the app
                onHide()
                refresh()
            }).catch((err) => {
                console.log(err);
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
                                {/* {formik.touched.text && formik.errors.text && <p className="text-danger fs-6" >{formik.errors.text}</p>} */}
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="image" placeholder="image"
                                    name="image" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.image} />
                                <label htmlFor="image">Upload URL</label>
                                {/* {formik.touched.image && formik.errors.image && <p className="text-danger fs-6" >{formik.errors.image}</p>} */}
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