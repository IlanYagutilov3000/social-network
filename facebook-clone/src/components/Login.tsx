import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, UserLogin } from "../interfaces/User";
import * as yup from "yup";
import { login } from "../services/userServices";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { ErrorMsg, succesMsg } from "../services/feedback";

interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik: FormikValues = useFormik<UserLogin>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required("The email or mobile number you entered isn’t connected to an account. Find your account and log in.").email(),
            password: yup.string().required("password in incorrect").min(6).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=(.*\d){4})(?=.*[!@%$#^&*\-_+()]).{8,}$/)
        }),
        onSubmit: (values) => {
            login(values as UserLogin).then((res) => {
                const token = res.data
                dispatch(loginUser({token}))
                // we need to save the suer in a global state later
                navigate("/")
                succesMsg("You've logged in")
            }).catch((err) => {
                console.log(err)
                ErrorMsg("Email or password are incorrect")
            })
        }
    });

    return (
        <>
            <div className="container d-flex justify-content-center d-flex align-items-center flex-wrap">
                <div className="facebookName pe-5">
                    <h1 className="text-primary fw-bold h1">social</h1>
                    <p className="fw-semibold">Connect with friends and the world around you on Social.</p>
                </div>
                <div className="d-flex flex-column bg-white formContainer  align-items-center shadow rounded">
                    <form action="" onSubmit={formik.handleSubmit} >
                        <div className="htmlForm-floating my-2">
                            <input type="email" className="form-control" id="email" placeholder="Email Or Phone Number" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                            {formik.touched.email && formik.errors.email && <p className="text-danger errorMsg" >{formik.errors.email}</p>}
                        </div>
                        <div className="htmlForm-floating mb-2">
                            <input type="password" className="form-control" id="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" />
                            {formik.touched.password && formik.errors.password && <p className="text-danger errorMsg" >{formik.errors.password}</p>}
                        </div>
                        <div className="btnContainer mb-2">
                            <button type="submit" className="btn btn-primary w-100 fw-bold">Log In</button>
                        </div>
                        <p className="text-primary text-decoration-underline spanPass text-center">Forgot password?</p>
                        <div className="line"></div>
                    </form>
                    <div className="text-center my-3 btnContainerTwo ">
                        <p className="btn  my-3 fw-bold"><Link to={"/register"}>Create new account</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;