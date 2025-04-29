import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    // const [answer, setAnswer] = useState('');
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            const res = await axios.post(
                '/api/v1/auth/register',
                { name, email, password, phone, address }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center my-5">
                <div className="row w-100">
                    <div className="col-md-6 col-lg-4 mx-auto">
                        <div className="card shadow-lg border-light">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-primary">Sign Up</h2>
                                <form onSubmit={handleSubmit}>
                                    {/* Name Input */}
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="mb-4">
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="form-control"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Address Input */}
                                    <div className="mb-4">
                                        <textarea
                                            id="address"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Enter your address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* anser Input
                                    <div className="mb-4">
                                        <input
                                            type="tel"
                                            id="answer"
                                            className="form-control"
                                            placeholder="what is your favirate sports"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            required
                                        />
                                    </div> */}

                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100 py-2">Sign Up</button>
                                </form>

                                {/* Link to Login */}
                                <div className="text-center mt-3">
                                    <small className="text-muted">
                                        Already have an account? <a href="/login" className="text-primary">Login here</a>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignUp;
