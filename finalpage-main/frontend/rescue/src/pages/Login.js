import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get('http://localhost:3001/signup')
            .then((res) => {
                console.log(res.data);
            });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios
                .post('http://localhost:3001/login', { email, password });
            const token = response.data.token;
            alert('Login successful');
            setEmail('');
            setPassword('');
            fetchUsers();
            navigate('/home');
            window.location.reload();
            localStorage.setItem('token', token);
        } catch (error) {
            console.log('Login Error', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-header">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <br />
                    <br />
                    {/* Password Input */}
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <br />
                    <br />
                    {/* Login Button */}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                    <p className="text-center mt-3">You agree to our terms and policies.</p>
                    <Link to="/signup" className="signup-button">
                        Create Account
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
