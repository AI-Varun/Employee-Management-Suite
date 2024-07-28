import React, { useState } from 'react';
import './styles/login.css';
import logo from '../assets/2950171.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:1220/api/v1/signup";
            const { data: res } = await axios.post(url, data);
            navigate("/login");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className="login-container">

            <main className="login-main">
                <div className="login-card">
                    <h2>Sign Up</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="label-text">Name:</label>
                            <input
                                // type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                required
                                className="input-field1"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-text">Email:</label>
                            <input
                                // type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className="input-field1"
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-text">Password:</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="btn-login">
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="right">
                    <h1>Already have an account?</h1>
                    <Link to="/login">
                        <button type="button" className="white_btn">
                            Sign In
                        </button>
                    </Link>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default Signup;
