import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"


const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    })

    const handleLogin = async () => {
        console.warn(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify( {email, password}),
            headers: {
                'Content-type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if(result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/")
            window.location.reload();
        } else {
            alert("Please enter correct details");
        }
    } 

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <input 
                    type="text" 
                    className="inputBox" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="Enter your email" 
                />
                <input 
                    type="password" 
                    className="inputBox" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="Enter your password" 
                />
                <button onClick={handleLogin} className="login-btn" type="button">Login</button>
            </div>
        </div>
    )
}

export default Login