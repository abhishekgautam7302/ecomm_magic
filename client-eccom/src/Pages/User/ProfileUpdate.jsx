import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SaveOutlined, UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useAuth } from '../../Context/auth';
import UserMenu from '../../components/Layout/UserMenu';

const ProfileUpdate = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form with user data
    useEffect(() => {
        if (auth?.user) {
            setFormData({
                name: auth.user.name || '',
                email: auth.user.email || '',
                phone: auth.user.phone || '',
                address: auth.user.address || '',
            });
        }
    }, [auth?.user]);  // Proper dependency array

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Updated handleUpdate function with proper error handling
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Corrected API endpoint URL
            const { data } = await axios.put('/api/v1/auth/profiles', formData, {
                headers: {
                    Authorization: auth?.token // Add authentication header
                }
            });

            toast.success('Profile updated successfully');
            // Update auth context with fresh data
            setAuth(prev => ({
                ...prev,
                user: data.updatedUser
            }));
            navigate('/dashboard/user/profile');
        } catch (error) {
            console.error('Profile update error:', error);

            // Enhanced error handling
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors.join(', ')
                : error.response?.data?.message
                || 'Failed to update profile. Please try again.';

            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="profile-wrapper bg-light">
                <div className="row g-0 min-vh-100">
                    <div className='col-lg-3 col-xl-2 p-0 bg-dark'>
                        <UserMenu className="text-white" />
                    </div>
                    <div className="col-lg-9 col-xl-10 content-area p-4 p-md-5">
                        <div className="card shadow-lg border-0 rounded overflow-hidden">
                            <div className="card-header bg-primary-gradient py-2">
                                <h1 className="h3 mb-0 text-white text-center">
                                    Update Your Profile
                                    <p className="text-sm text-white-50 mt-2 mb-0">Keep your information up to date</p>
                                </h1>
                            </div>
                            <div className="card-body p-5 p-lg-5">
                                <form onSubmit={handleUpdate} className="row g-4">
                                    <div className="col-md-8 mx-auto">
                                        {/* Name Input */}
                                        <div className="d-flex gap-3 form-group mb-3">
                                            <div>
                                                <label className="form-label text-dark mb-2">
                                                    <UserOutlined className="me-2 text-primary" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg border-2 rounded-pill px-4 py-1"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            {/* Email Input */}
                                            <div className="form-group mb-4">
                                                <label className="form-label text-dark mb-2 fw-medium">
                                                    <MailOutlined className="me-2 text-primary" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg border-2 rounded-pill px-4"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div className="form-group mb-4">
                                                <label className="form-label text-dark">
                                                    <PhoneOutlined className="me-2 text-primary" />
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control form-control-lg border-2 rounded-pill px-4"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    pattern="[0-9]{10}"
                                                    title="Please enter a 10-digit phone number"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Input */}

                                        {/* Address Input */}
                                        <div className="form-group mb-4">
                                            <label className="form-label text-dark">
                                                <EnvironmentOutlined className="me-2 text-primary" />
                                                Delivery Address
                                            </label>
                                            <textarea
                                                className="form-control form-control-lg border-1 px-4 py-1"
                                                id="address"
                                                name="address"
                                                rows="3"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isSubmitting}
                                                style={{ minHeight: '100px' }}
                                            ></textarea>
                                        </div>

                                        <div className="d-flex justify-content-center mt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary w-50 rounded-pill fw-bold px-5 py-1 shadow-sm"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true" />
                                                        Updating Profile...
                                                    </>
                                                ) : (
                                                    <>
                                                        <SaveOutlined className="me-2"/>
                                                        Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Add these styles to your CSS file */
                .bg-primary-gradient {
                    background: linear-gradient(135deg,rgb(10, 16, 24),rgb(14, 42, 88));
                }

                .form-control-lg {
                    font-size:15px !important;
                    min-height: none !important;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .form-control-lg:focus {
                    border-color:rgb(16, 22, 29);
                    box-shadow: 0 0 0 0.25rem rgba(11, 72, 141, 0.25);
                }

                .btn-primary {
                    transition: all 0.3s ease;
                }

                .btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
                }

                .rounded-3 {
                    border-radius: 8px !important;
                }

                .rounded-pill {
                    border-radius: 8px !important;
                }          
            `}</style>
        </Layout>
    );
};

export default ProfileUpdate;