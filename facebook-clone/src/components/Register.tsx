import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import * as yup from "yup";
import { registerUser } from "../services/userServices";
import { ErrorMsg, succesMsg } from "../services/feedback";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    const navigate = useNavigate();
    const formik: FormikValues = useFormik<User>({
        initialValues: {
            firstname: "",
            lastname: "",
            birthday: new Date().getDate(),
            birthMonth: new Date().getMonth() + 1,
            birthYear: new Date().getFullYear(),
            gender: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            firstname: yup.string().required("What's your name?").min(2),
            lastname: yup.string().required().min(2),
            birthday: yup.number().required(),
            birthMonth: yup.number().required(),
            birthYear: yup.number().required().test("is-18", "You must be at least 18 years old", function (value) {
                const { birthday, birthMonth } = this.parent;
                const birthDate = new Date(value, birthMonth - 1, birthday);
                const today = new Date();
                const ageDiff = today.getFullYear() - birthDate.getFullYear();

                if (ageDiff < 18) return false;
                if (ageDiff === 18) {
                    const thisYearBirthday = new Date(today.getFullYear(), birthMonth - 1, birthday);
                    if (thisYearBirthday > today) return false;
                }
                return true;
            }),
            gender: yup.string().required(),
            email: yup.string().required("Enter a valid Email").email(),
            password: yup.string().required("Enter a combination of at least six letters, numbers, and punctuation marks.").min(6).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4})(?=.*[!@%$#^&*\-_+()]).{8,}$/, "Enter a combination of at least six letters, numbers, and punctuation marks.")
        }),
        onSubmit: (values) => {
            const formattedUser = {
                firstname: values.firstname,
                lastname: values.lastname,
                birthday: new Date(values.birthYear, values.birthMonth - 1, values.birthday).toISOString(), // Convert date
                gender: values.gender,
                email: values.email,
                password: values.password,
            };
            registerUser(formattedUser as any).then((res) => {
                navigate("/login")
                /* localStorage.setItem("token", JSON.stringify(res.data)) */
                succesMsg("You've registered, Please sign in")
            }).catch((error) => {
                console.log(error)
                ErrorMsg("Something went wrong")
            })
        }
    });

    const years = Array.from(new Array(76), (val, index) => formik.initialValues.birthYear - index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    // retuns the number of days that's in the month
    const getDays = () => {
        return new Date(formik.initialValues.birthYear, formik.initialValues.birthMonth, 0).getDate()
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                <h1 className="text-primary text-center display-2 fw-bold">facebook</h1>
                <div className="registerContainer bg-white shadow rounded my-3">
                    <h4 className="fw-bold my-0 text-center">Create a new account</h4>
                    <p className="text-center">It’s quick and easy.</p>
                    <div className="line"></div>
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
                            <div className="biDayContainer d-flex align-items-center mt-3 mb-0">
                                <p className="bDate mb-0">Birthday</p>
                                <i className="fa-solid fa-circle-info infoZise ps-1 icon-bg"></i>
                            </div>
                            <div className="birthdayContainer d-flex justify-content-between mt-0">
                                <select name="birthday" id="birthday" className="p-1" value={formik.values.birthday} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                    {days.map((day, i) => (
                                        <option value={day} key={i}>{day}</option>
                                    ))}
                                </select>
                                <select name="birthMonth" id="birthMonth" value={formik.values.birthMonth} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                    {months.map((month, i) => (
                                        <option value={month} key={i}>{month}</option>
                                    ))}
                                </select>
                                <select name="birthYear" id="birthYear" value={formik.values.birthYear} onChange={formik.handleChange} onBlur={formik.handleBlur} >
                                    {years.map((year, i) => (
                                        <option value={year} key={i}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            {formik.touched.birthYear && formik.errors.birthYear && <p className="text-danger errorMsgRegister mb-0" >{formik.errors.birthYear}</p>}
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

                                <input type="password" placeholder="Password" className="p-1 mt-2" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" />
                                {formik.touched.password && formik.errors.password && <p className="text-danger errorMsg mb-0" >{formik.errors.password}</p>}
                            </div>
                            <div className="userUseContainer mt-3">
                                <p className="">People who use our service may have uploaded your contact information to Facebook. Learn more.</p>
                                <p>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</p>
                            </div>
                            <div className="btnRegisterContainer text-center">
                                <button className="btn btnRegister fw-bolder" type="submit" >Sign Up</button>
                            </div>
                        </form>
                        <p className="btn my-2"><Link to={"/login"}>Already have an account?</Link></p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Register;