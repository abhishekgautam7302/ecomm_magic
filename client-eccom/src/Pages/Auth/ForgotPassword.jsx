import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgotPassword', { email, oldPassword, newPassword});
            if(res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
            else {
                toast.error(res.data.message || 'Reset Passwrod failed. Please try again.');
            }

        }
        catch (error) {
            console.error("Error during Reset Passwrod:", error);
            toast.error('Something went wrong. Please try again.');

        }
    }
    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center my-5">
                <div className="row w-100">
                    <div className="col-md-6 col-lg-4 mx-auto">
                        <div className="card shadow-lg border-light">
                            <div className="card-body p-5">
                                <h2 className="text-center mb-4 text-primary">Reset Password</h2>
                                <form onSubmit={handleSubmit}>
                                    {/* Email Input */}
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Email Address</label>
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
                                        <label htmlFor="newPassword" className="form-label">Old Password</label>
                                        <input
                                            type="Password"
                                            id="oldPassword"
                                            className="form-control"
                                            placeholder="Enter your Old Password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Password Input */}
                                    <div className="mb-4">
                                        <label htmlFor="answer" className="form-label">New Password</label>
                                        <input
                                            type="Password"
                                            id="newPassword"
                                            className="form-control"
                                            placeholder="Enter your New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Submit Button */}
                                    <button type="submit" className="btn btn-primary w-100 py-2">Reset Password</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword