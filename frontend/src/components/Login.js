import React from "react";

const Login = () => {

    return (
        <div>
            <div className="login-div">
                <h1>Login</h1>
                <input type="text" className="login-input" placeholder="Enter your name"></input>
                <input type="text" className="login-input" placeholder="Enter your password"></input>
                <button type="button" className="btn">Login</button>
            </div>
        </div>
    )
}
export default Login;