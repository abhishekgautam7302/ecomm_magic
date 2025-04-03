import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../Context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Photo upload handler
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG/PNG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      setLoading(true);
      const { data } = await axios.put(
        '/api/v1/auth/update-profile',
        formData,
      );

      setAuth(prev => ({ ...prev, user: data.user }));
      localStorage.setItem('auth',JSON.stringify(data));
      toast.success('Profile photo updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update photo');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  // Photo deletion handler
  const handleDeletePhoto = async () => {
    if (!auth.user.photo || !window.confirm('Are you sure you want to remove your profile photo?')) return;

    try {
      setLoading(true);
      const { data } = await axios.delete('/api/v1/auth/delete-profile');

      setAuth(prev => ({ ...prev, user: data.user }));
      toast.success('Profile photo removed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove photo');
    } finally {
      setLoading(false);
    }
  };

  if (!auth?.user) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-wrapper">
        <div className="row g-0 min-vh-100">
          <div className="col-lg-3 col-xl-2 p-0">
            <UserMenu />
          </div>

          <div className="col-lg-9 col-xl-10 content-area">
            <div className="profile-container p-4 p-md-5">
              <div className="profile-header text-center mb-5">
                <div className="avatar-wrapper mx-auto position-relative">
                  <img
                    src={auth.user.photo ? `/uploads/${auth.user.photo}` : '/default-avatar.png'}
                    alt={`${auth.user.name}'s profile`}
                    className="avatar-img img-fluid rounded-circle"
                    onError={(e) => {
                      e.target.src = '/default-avatar.png';
                    }}
                  />
                  <div className="avatar-controls">
                    <button
                      className="avatar-edit-btn btn btn-primary rounded-circle p-0"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                      aria-label="Change profile photo"
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" />
                      ) : (
                        <i className="bi bi-camera fs-5" />
                      )}
                    </button>
                    {auth.user.photo && (
                      <button
                        className="avatar-delete-btn btn btn-danger rounded-circle p-0"
                        onClick={handleDeletePhoto}
                        disabled={loading}
                        aria-label="Remove profile photo"
                      >
                        <i className="bi bi-trash fs-5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/jpeg, image/png"
                    onChange={handlePhotoUpload}
                  />
                </div>
                <h1 className="profile-name mt-4">{auth.user.name}</h1>
                <div className="profile-meta text-muted d-flex align-items-center justify-content-center">
                  <span className="badge bg-primary bg-opacity-10 text-primary">
                    Member since {new Date(auth.user.createdAt).getFullYear()}
                  </span>
                </div>
              </div>

              {/* Rest of the profile content remains the same */}
              <div className="row g-4">
                {/* Personal Info */}
                <div className="col-12 col-md-6">
                  <div className="profile-card h-100">
                    <div className="card-header">
                      <i className="bi bi-person-gear me-2"></i>
                      Personal Information
                    </div>
                    <div className="card-body">
                      <div className="info-item">
                        <label>Name</label>
                        <p className="info-value">{auth?.user.name}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p className="info-value">{auth?.user?.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <p className="info-value">
                          {auth?.user?.phone || 'Not provided'}
                        </p>
                      </div>
                      <div className="info-item">
                        <label>Address</label>
                        <p className="info-value">
                          {auth?.user?.address || 'Not provided'}
                        </p>
                      </div>
                      <button className="btn btn-primary w-100 mt-3" onClick={() => navigate('/dashboard/profile/update')} >
                        <i className="bi bi-pencil-square me-2"></i>
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
                {/* Security */}
                <div className="col-12 col-md-6">
                  <div className="profile-card h-100">
                    <div className="card-header">
                      <i className="bi bi-shield-check me-2"></i>
                      Security Settings
                    </div>
                    <div className="card-body">
                      <div className="info-item">
                        <label>Password</label>
                        <p className="info-value">••••••••</p>
                      </div>
                      <button className="btn btn-outline-secondary w-100">
                        <i className="bi bi-arrow-repeat me-2"></i>
                        Change Password
                      </button>

                      <div className="security-section mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">
                              <i className="bi bi-phone me-2"></i>
                              Two-Factor Auth
                            </h6>
                            <p className="text-muted small mb-0">
                              Extra layer of security
                            </p>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Connections */}
                <div className="col-12">
                  <div className="profile-card">
                    <div className="card-header">
                      <i className="bi bi-people me-2"></i>
                      Social Connections
                    </div>
                    <div className="card-body">
                      <div className="social-grid">
                        <button className="social-btn google">
                          <i className="bi bi-google me-2"></i>
                          Connect Google
                        </button>
                        <button className="social-btn facebook">
                          <i className="bi bi-facebook me-2"></i>
                          Connect Facebook
                        </button>
                        <button className="social-btn twitter">
                          <i className="bi bi-twitter-x me-2"></i>
                          Connect Twitter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`

        .profiles {
          font-size: 25px;
          font-weight: 600;
          color: rgb(16, 22, 32);
          border-bottom: 0.5px solid rgb(156, 193, 242); /* Fixed space */
          padding-bottom: 1rem;
        }
     
         .profile-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .avatar-wrapper {
          width: 140px;
          height: 140px;
          position: relative;
          margin: 0 auto;
        }

        .avatar-controls {
          position: absolute;
          bottom: -1rem;
          right: -1rem;
          display: flex;
          gap: 0.5rem;
        }

        .avatar-edit-btn,
        .avatar-delete-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          transition: transform 0.2s ease;
        }

        .avatar-edit-btn:hover,
        .avatar-delete-btn:hover {
          transform: scale(1.1);
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .avatar-wrapper {
            width: 120px;
            height: 120px;
          }
          
          .profile-name {
            font-size: 1.75rem;
          }
        }

        .profile-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .profile-card {
          background: white;
          border-radius: 5px;
          border: 1px solid rgba(0,0,0,0.05);
          
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          font-weight: 600;
          color: #1e293b;
          font-size: 1.1rem;
          background: rgba(99, 102, 241, 0.03);
          border-radius: 1rem 1rem 0 0;
        }

        .card-body {
          padding: 1.5rem;
        }

        .info-item {
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .info-item:last-child {
          border-bottom: 0;
        }

        .info-item label {
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 0.25rem;
          display: block;
        }

        .info-value {
          font-size: 1rem;
          color: #1e293b;
          margin: 0;
          font-weight: 500;
        }

        .social-grid {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .social-btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .google { background: #DB4437; }
        .facebook { background: #1877F2; }
        .twitter { background: #1DA1F2; }

        .form-switch .form-check-input {
          width: 3em;
          height: 1.5em;
          background-color: #e2e8f0;
          border-color: #e2e8f0;
        }

        .form-switch .form-check-input:checked {
          background-color: #6366f1;
          border-color: #6366f1;
        }

        @media (max-width: 768px) {
          .profile-name {
            font-size: 1.75rem;
          }
          
          .avatar-wrapper {
            width: 120px;
            height: 120px;
          }
          
          .social-btn {
            width: 100%;
            min-width: auto;
          }
        .profile-container {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .avatar-wrapper {
          width: 140px;
          height: 140px;
          position: relative;
          margin: 0 auto;
        }

        .avatar-controls {
          position: absolute;
          bottom: -1rem;
          right: -1rem;
          display: flex;
          gap: 0.5rem;
        }

        .avatar-edit-btn,
        .avatar-delete-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        // Rest of the styles remain similar with minor adjustments
      `}</style>
    </Layout>
  );
};

export default Profile;