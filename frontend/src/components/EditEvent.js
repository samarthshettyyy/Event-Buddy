import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [description, setDescription] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/my-event/${params.id}`);
        result = await result.json();

        setName(result.name);
        setType(result.type);
        setDate(result.date);
        setTime(result.time);
        setLocation(result.location);
        setDescription(result.description);

        console.warn(result);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/my-event/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, type, date, time, location, description}),
            headers: {
                'Content-Type': "application/json"
            }
        });

        result = await result.json();
        console.warn(result);

        navigate("/");
    }

    return (
        <div>
            <div className="signup-div">
                <h1>Edit Product</h1>

                <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter product name" className="inputBox"></input>

                <input value={type} onChange={(e)=>{setType(e.target.value)}} placeholder="Enter product price" className="inputBox"></input>

                <input value={date} onChange={(e)=>{setDate(e.target.value)}} placeholder="Enter product category" className="inputBox"></input>

                <input value={time} onChange={(e)=>{setTime(e.target.value)}} placeholder="Enter product brand" className="inputBox"></input>

                <input value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder="Enter product brand" className="inputBox"></input>

                <input value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter product brand" className="inputBox"></input>

                <button onClick={updateProduct} type="button" className="signup-btn">Edit</button>
            </div>
        </div>
    )
}

export default EditEvent;