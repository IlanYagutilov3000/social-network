import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Post } from "../interfaces/Post";
import * as yup from "yup";
import { createPost } from "../services/postServices";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import { ErrorMsg, succesMsg } from "../services/feedback";

interface CreatePostProps {
    onHide: Function;
    refresh: Function;
}

const CreatePost: FunctionComponent<CreatePostProps> = ({ onHide, refresh }) => {
    const user = useSelector((state: rootState) => state.auth.user)
    const formik: FormikValues = useFormik<Post>({
        initialValues: {
            text: "",
            image: undefined,
            userId: user?._id as string
        },
        validationSchema: yup.object({
            text: yup.string().required().min(1),
            image: yup.string().optional()
        }),
        onSubmit: (values) => {
            createPost(values).then((res) => {
                onHide()
                refresh()
                succesMsg("Post was created")
            }).catch((err) => {
                console.log(err)
                ErrorMsg("Soemthing went wrong")
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

export default CreatePost;