import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postUserLogin } from "../services/APIService";
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        let data = await postUserLogin(email, password)
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }

        if (data && +data.EC === 0) {
            toast.success(data.EM)
            handleGoToHomePage()
        }
    }

    const handleGoToHomePage = () => {
        navigate("/")
    }

    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account?</span>
                <button>Sign up</button>
            </div>
            <div className="title text-center col-4 mx-auto">
                React-redux
            </div>
            <div className="welcome text-center col-4 mx-auto">
                Welcome to my project
            </div>
            <div className="content-form col-4 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <span className="forgot-password">Forgot your password?</span>
                <div className="text-center">
                    <button className="btn-submit" onClick={() => handleLogin()}>Log in</button>
                </div>
                <div className="text-center">
                    <span className="back" onClick={() => handleGoToHomePage()}> &#60;&#60; Go to home page</span>
                </div>
            </div>
        </div>
    )
}

export default Login;