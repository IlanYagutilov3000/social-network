import { FunctionComponent, useEffect, useState } from "react";
import { getUserById, updateUSer } from "../services/userServices";
import { ErrorMsg, succesMsg } from "../services/feedback";
import { User, UserDetails } from "../interfaces/User";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";

interface EditUserProps {
    onHide: Function;
    refresh: Function;
}

const EditUser: FunctionComponent<EditUserProps> = ({ onHide, refresh }) => {
    const [user, setUser] = useState<UserDetails>({
        firstname: "",
        lastname: "",
        gender: "",
        profilePicture: "",
        email: "",
    })

    useEffect(() => {
        getUserById().then((res) => {
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
            updateUSer({...values, _id: user._id as string}).then(() => {
                onHide()
                refresh()
                /* window.location.reload(); */
                succesMsg("User has been updated")
            }).catch((err) => {
                console.log(err);
                ErrorMsg("Opss.. something went wrong")
            })
        }
    })
    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <h1 className="text-primary text-center display-2 fw-bold">facebook</h1>
                <div className="registerContainer bg-white shadow rounded my-3">
                    <div className="registerFromContainer d-flex flex-column align-items-center p-3 ">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <div className="inputControl d-flex">
                                <div className="firstAndLast d-flex flex-column">
                                    <input type="text" placeholder="First name" className="me-2 p-1" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} name="firstname" />
                                    {formik.touched.firstname && formik.errors.firstname && <p className="text-danger errorMsgRegister mb-0" >{formik.errors.firstname}</p>}
                                </div>
                                <div className="firstAndLast d-flex flex-column">
                                    <input type="text" placeholder="Last name" className="p-1" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} name="lastname" />
                                    {formik.touched.firstname && formik.errors.firstname && <p className="text-danger errorMsgRegister mb-0" >{formik.errors.firstname}</p>}
                                </div>
                            </div>
                            <div className="gContainer d-flex align-items-center mt-3 mb-0">
                                <span className="gender mb-0">Gender</span>
                                <i className="fa-solid fa-circle-info infoZise ps-1"></i>
                            </div>
                            <div className="genderConainer d-flex justify-content-between mt-0">
                                <label htmlFor="male" className={`p-1 ${formik.touched.gender && formik.errors.gender ? "border border-danger " : ""}`}>
                                    Male
                                    <input type="radio" name="gender" id="male" className="me-2" value="male" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.gender === "male"} />
                                </label>
                                <label htmlFor="female" className={`p-1 ${formik.touched.gender && formik.errors.gender ? "border border-danger " : ""}`}>
                                    Female
                                    <input type="radio" name="gender" id="female" className="me-2" value="female" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.gender === "female"} />
                                </label>
                                <label htmlFor="custom" className={`p-1 ${formik.touched.gender && formik.errors.gender ? "border border-danger " : ""}`}>
                                    Custom
                                    <input type="radio" name="gender" id="custom" className="me-2" value="custom" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.gender === "custom"} />
                                </label>
                            </div>
                            <div className="emailAndPasswordContainer d-flex flex-column mt-2">
                                <input type="email" placeholder="Email or Phone number" className=" p-1" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                                {formik.touched.email && formik.errors.email && <p className="text-danger errorMsg mb-0" >{formik.errors.email}</p>}
                            </div>
                            <div className="col-md">
                                <div className="emailAndPasswordContainer d-flex flex-column mt-2 form-floating">
                                    <input type="text" className="form-control" id="profilePicture" placeholder="profile Picture"
                                        name="profilePicture" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.profilePicture} />
                                    <label htmlFor="profilePicture">Upload URL</label>
                                </div>
                            </div>
                            <button type="submit" disabled={!formik.dirty || !formik.isValid} className="btn btn-primary w-100" >Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditUser;