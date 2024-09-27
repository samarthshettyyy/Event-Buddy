import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const profilePic = '/uploads/add.png';

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/');
        }
    })

    const collectData = async () => {
        console.warn(name, email, password, profilePic);
        let result = await fetch('http://localhost:5000/signup', {
            method: 'post',
            body: JSON.stringify({name, email, password, profilePic}),
            headers: {
                'Content-Type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result));
        if(result) {
            navigate('/');
        }
    }

    return (
        <div>
            <div className="signup-div">
                <h1>Register</h1>
                <input type="text" className="inputBox" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name"></input>
                <input type="text" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"></input>
                <input type="password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"></input>
                <button onClick={collectData} className="signup-btn" type="button">Register</button>
            </div>
        </div>
    );
}

export default Signup;