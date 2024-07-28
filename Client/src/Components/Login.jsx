import React, { useState } from 'react';
import './styles/login.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1220/api/v1/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("username", res.username);

      window.location = "/";

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
      <header className="login-header">
      </header>
      <main className="login-main">
        <div className="login-card">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label-text">Username:</label>
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
              Login
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default Login;
