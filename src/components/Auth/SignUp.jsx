import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { postUserRegister } from "../services/APIService";
import { useState } from "react";
import { VscEyeClosed, VscEye } from 'react-icons/vsc';

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleGoToLoginPage = () => {
        navigate("/login")
    }

    const handleUserRegister = async (email, username, password) => {
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) return toast.error("Invalid email")
        if (!password || password.length < 3) return toast.error("Invalid password")

        const data = await postUserRegister(email, username, password)
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleClose = () => {
        setEmail("")
        setPassword("")
        setUsername("")
    }

    const handleGoToHomePage = () => {
        navigate("/")
    }

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form>
                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg" value={email} onChange={(event) => setEmail(event.target.value)} required />
                                            <label className="form-label">Email</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control form-control-lg" value={username} onChange={(event) => setUsername(event.target.value)} required />
                                            <label className="form-label">Username</label>
                                        </div>

                                        <div className="password-container form-outline mb-4">
                                            <input type={isShowPassword ? "text" : "password"} className="form-control form-control-lg" value={password} onChange={(event) => setPassword(event.target.value)} required />
                                            {isShowPassword ?
                                                <span className="icons-eye" onClick={() => setIsShowPassword(false)}><VscEye /></span>
                                                :
                                                <span className="icons-eye" onClick={() => setIsShowPassword(true)}><VscEyeClosed /></span>
                                            }
                                            <label className="form-label">Password</label>

                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value="" />
                                            <label className="form-check-label">
                                                I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                onClick={() => handleUserRegister(email, username, password)}
                                            >
                                                Register
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <span
                                            onClick={() => handleGoToLoginPage()}
                                            className="fw-bold text-body login-navigation"
                                        ><u>Login here</u></span></p>
                                        <div className="text-center text-muted mt-5 mb-0">
                                            <span className="back" onClick={() => handleGoToHomePage()}> &#60;&#60; Go to home page</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;