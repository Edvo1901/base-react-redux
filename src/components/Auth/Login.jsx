import { useState } from "react";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        alert("me")
    }

    return (
        <div className="login-container">
            <div className="header">
                Don't have an account?
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
                    <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <span className="forgot-password">Forgot your password?</span>
                <div className="text-center">
                    <button className="btn-submit" onClick={() => handleLogin()}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Login;