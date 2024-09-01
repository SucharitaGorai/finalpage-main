import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await axios
            .get('http://localhost:3001/signup')
            .then((res) => {
                // Handle response
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3001/signup', { name, email, password })
            .then(() => {
                alert('Registration Successful');
                setName('');
                setEmail('');
                setPassword('');
                fetchUsers();
                navigate('/login');
            })
            .catch((error) => {
                console.log('Unable to register user',error);
                alert('Registeration failed. Please try again.')
            });
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <label className="signup-label">Name</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="signup-input"
                    />
                    <br />
                    <br />
                    {/* Email Input */}
                    <label className="signup-label">Email</label>
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="signup-input"
                    />
                    <br />
                    <br />
                    {/* Password Input */}
                    <label className="signup-label">Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="signup-input"
                    />
                    <br />
                    <br />
                    {/* Sign Up Button */}
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                    <p>You agree to our terms and policies.</p>
                    <Link to="/login" className="signup-link">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
