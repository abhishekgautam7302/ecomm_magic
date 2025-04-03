import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/auth';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        '/api/v1/auth/login', 
        { email, password }
      );

      if (result.data.success) {
        toast.success(result.data.message);
        setAuth({
          ...auth,
          user: result.data.user,
          token: result.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(result.data));
        navigate(location.state ||'/');
      } else {
        toast.error(result.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error("Error during Login:", error);
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
                <h2 className="text-center mb-4 text-primary">Login</h2>
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
                  <div className="mb-1">
                    <label htmlFor="password" className="form-label">Password</label>
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

                  {/* Remember Me */}

                  {/* Submit Button */}
                  <span type="submit" className="text-primary mb-4 text-end d-flex align-item-end" onClick={()=>{navigate('/forgot-Passowrd')}}>Forget Password</span>
                  <button type="submit" className="btn btn-primary w-100 py-2">Login</button>
                </form>

                {/* Link to Register */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account?{' '}
                    <NavLink to="/signup" className="text-primary">Sign up here</NavLink>
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

export default Login;
