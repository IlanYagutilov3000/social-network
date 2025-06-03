import { FunctionComponent, useEffect, useState } from "react";
import { getFriendsDetails, getUserById, updateUSer } from "../services/userServices";
import { ErrorMsg, succesMsg } from "../services/feedback";
import { User, UserDetails } from "../interfaces/User";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";

interface EditFriendsProfileProps {
    onHide: Function;
    refresh: Function;
    userId: string
}

const EditFriendsProfile: FunctionComponent<EditFriendsProfileProps> = ({onHide, refresh, userId}) => {

 const [user, setUser] = useState<UserDetails>({
        firstname: "",
        lastname: "",
        gender: "",
        profilePicture: "",
        email: "",
    })

    useEffect(() => {
        getFriendsDetails(userId as string).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log(err);
            ErrorMsg("Something went wrong")
        })
    }, [])

    const formik: FormikValues = useFormik<UserDetails>({
        initialValues: {
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            profilePicture: user.profilePicture,
            email: user.email,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            firstname: yup.string().required().min(2),
            lastname: yup.string().required().min(2),
            gender: yup.string().required().min(2),
            profilePicture: yup.string().min(2).url().nullable(),
            email: yup.string().required().min(2).email()
        }),
        onSubmit: (values) => {
            updateUSer({...values, _id: userId as string}).then(() => {
                onHide()
                refresh()
                succesMsg("User has been updated")
            }).catch((err) => {
                console.log(err);
                ErrorMsg("Opss.. something went wrong")
            })
        }
    })


    return (
        <>
            <div className="d-flex flex-column align-items-center EditingUserContainer">
                <h1 className="text-primary text-center display-2 fw-bold">social</h1>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <div className="col-md">
                            <div className="inputControl d-flex">
                                <div className="firstAndLast d-flex flex-column">
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="me-2 p-1"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="firstname"
                                    />
                                    {formik.touched.firstname && formik.errors.firstname && (
                                        <p className="text-danger errorMsgRegister mb-0">{formik.errors.firstname}</p>
                                    )}
                                </div>
                                <div className="firstAndLast d-flex flex-column">
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="p-1"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="lastname"
                                    />
                                    {formik.touched.lastname && formik.errors.lastname && (
                                        <p className="text-danger errorMsgRegister mb-0">{formik.errors.lastname}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group mt-2">
                        <select
                            name="gender"
                            className={`form-select ${formik.touched.gender && formik.errors.gender ? "is-invalid" : ""}`}
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="custom">Custom</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                            <div className="invalid-feedback">{formik.errors.gender}</div>
                        )}
                    </div>

                    <div className="emailAndPasswordContainer d-flex flex-column mt-2">
                        <input
                            type="email"
                            placeholder="Email or Phone number"
                            className="p-1"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-danger errorMsg mb-0">{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="col-md">
                        <div className="emailAndPasswordContainer d-flex flex-column mt-2 form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="profilePicture"
                                placeholder="profile Picture"
                                name="profilePicture"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.profilePicture}
                            />
                            <label htmlFor="profilePicture">Upload URL</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                        className="btn btn-primary w-100 mt-3"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditFriendsProfile;