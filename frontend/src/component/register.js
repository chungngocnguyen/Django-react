import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

    // Kiểm tra tính trùng khớp của mật khẩu
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        // const checkUsernameResponse = await axios.post('http://localhost:8000/create/', { username });

        // if (checkUsernameResponse.data.exists) {
        //   setError("Username already exists");
        //   return;
        // }
        const user = {
            username: username,
            password: password,
        };

        const response = await axios.post('http://localhost:8000/create/', user, {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        console.log(response.data);

        navigate("/login");

        } catch (error) {
        console.error("Error during registration:", error);
        }
    };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="form-control mt-1"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-danger">{error}</div>}
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
