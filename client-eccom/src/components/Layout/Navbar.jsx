import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useCart } from '../../Context/cart';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [cart] = useCart();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: '' });
        localStorage.removeItem('auth');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-gradient-primary fixed-top shadow-lg">
            <div className="container-fluid container-lg">
                {/* Brand Logo - Left Side */}
                <NavLink to="/" className="navbar-brand p-0">
                    <img src={logo} alt="Logo" height="50" className="glow" />
                </NavLink>

                {/* Mobile Toggler */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon text-white"></span>
                </button>

                {/* Navigation Content */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Mobile Search */}
                    <div className="d-lg-none w-100 my-3">
                        <SearchInput />
                    </div>

                    {/* Right Section - Search, Cart, Auth */}
                    <div className="d-flex align-items-center gap-4 ms-lg-auto">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link" activeclassname="active">
                                        Home
                                    </NavLink>
                                </li>

                                {/* Categories Dropdown */}
                                <li className="nav-item dropdown">
                                    <NavLink
                                        to="/categories"
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Collections
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-glass shadow-lg">
                                        <li>
                                            <NavLink to="/categories" className="dropdown-item">
                                                <span className="gradient-text">All Collections</span>
                                            </NavLink>
                                        </li>
                                        {categories?.map((c) => (
                                            <li key={c._id}>
                                                <NavLink
                                                    to={`/category/${c.slug}`}
                                                    className="dropdown-item"
                                                >
                                                    <span className="gradient-text">{c.name}</span>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        {/* Desktop Search */}
                        <div className="d-none d-lg-block" style={{ minWidth: '250px' }}>
                            <SearchInput />
                        </div>

                        {/* Cart */}
                        <div className="position-relative">
                            <NavLink to="/cart" className="nav-link p-2 position-relative">
                                <FiShoppingCart size={24} className="text-white" />
                                {cart.length > 0 && (
                                    <span className="cart-badge animate-pulse">
                                        {cart.length}
                                    </span>
                                )}
                            </NavLink>
                        </div>

                        {/* Auth Section */}
                        {!auth.user ? (
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-light rounded-pill px-3"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-light rounded-pill px-3 text-primary d-none d-md-block"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign Up
                                </button>
                            </div>
                        ) : (
                            <div className="nav-item dropdown">
                                <div
                                    className="d-flex align-items-center gap-2 cursor-pointer"
                                    data-bs-toggle="dropdown"
                                >
                                    {auth.user.photo ? (
                                        <img
                                            src={`/uploads/${auth.user.photo}`}
                                            alt="User Avatar"
                                            className="rounded-circle"
                                            style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="user-avatar-placeholder">
                                            <FiUser size={24} className="text-white" />
                                        </div>
                                    )}
                                </div>
                                <ul className="dropdown-menu dropdown-glass dropdown-menu-end shadow-lg">
                                    <li>
                                        <span className="dropdown-item d-flex align-items-center gradient-text">
                                            {auth.user.name}
                                        </span>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider my-2" />
                                    </li>
                                    <li>
                                        <NavLink
                                            to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                                            className="dropdown-item"
                                        >
                                            <span className="gradient-text">Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider my-2" />
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-item d-flex align-items-center text-danger"
                                        >
                                            <FiLogOut className="me-2" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx="true" global="true">{`
                .bg-gradient-primary {
                    background: linear-gradient(135deg, rgb(14, 26, 37) 0%, rgb(15, 40, 57) 50%, rgb(0, 48, 93) 100%);
                }

                .nav-link {
                    color: rgba(255, 255, 255, 0.9) !important;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .nav-link:hover,
                .nav-link.active {
                    color: #fff !important;
                    transform: translateY(-2px);
                }

                .dropdown-glass {
                    background: rgba(255, 255, 255, 0.95) !important;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 8px;
                }

                .cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .animate-pulse {
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .gradient-text {
                    background: linear-gradient(45deg, #1a2436, #02386b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 600;
                }

                .glow {
                    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5));
                }

                .user-avatar-placeholder {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (max-width: 991px) {
                    .navbar-nav {
                        width: 100%;
                        text-align: center;
                    }

                    .dropdown-menu {
                        text-align: center;
                        margin: 0 auto;
                        width: 90%;
                    }

                    .btn {
                        width: 100%;
                        margin-bottom: 0.5rem;
                    }

                    .ms-lg-auto {
                        margin-left: 0 !important;
                        justify-content: center;
                        width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .container-fluid {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;