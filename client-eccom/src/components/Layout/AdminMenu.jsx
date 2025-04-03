import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const AdminMenu = () => {
    return (
        <div className="admin-menu bg-dark text-white d-flex flex-column flex-shrink-0 p-3 col-md-2" 
             style={{ minHeight: "100vh", background: "linear-gradient(195deg,rgb(5, 27, 41) 0%,rgb(3, 50, 81) 100%)" }}>
            
            {/* Header Section */}
            <div className="mb-4 text-center">
                <div className="mb-3">
                    {/* <i className="bi bi-shield-lock-fill fs-1 text-primary"></i> */}
                    <h4 className="mb-0 fw-bold text-light">Admin Dashboard </h4>
                </div>
                <div class="border-top"></div>
            </div>

            {/* Main Navigation */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                    <NavLink 
                        to="/dashboard/admin" 
                        className='nav-link'
                    >
                        <i className="bi bi-speedometer2 me-3"></i>
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="/dashboard/admin/create-category" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'active bg-primary' : 'hover-bg'}`}
                    >
                        <i className="bi bi-diagram-3 me-3"></i>
                        Categories
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="#" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'hover-bg ' : 'hover-bg'}`}
                    >
                        <i className="bi bi-tags me-3"></i>
                        Sub Categories
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="/dashboard/admin/products" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'active bg-primary' : 'hover-bg'}`}
                    >
                        <i className="bi bi-box-seam me-3"></i>
                        Products
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="/dashboard/admin/services" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'active bg-primary' : 'hover-bg'}`}
                    >
                        <i className="bi bi-gear-wide-connected me-3"></i>
                        Services
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="#" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? ' hover-bg' : 'hover-bg'}`}
                    >
                        <i className="bi bi-pencil-square me-3"></i>
                        Blog
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="#" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'hover-bg' : 'hover-bg'}`}
                    >
                        <i className="bi bi-envelope me-3"></i>
                        Enquiries
                    </NavLink>
                </li>

                <li className="nav-item mb-2">
                    <NavLink 
                        to="/dashboard/admin/orders" 
                        className={({ isActive }) => `nav-link text-light rounded-3 ${isActive ? 'active bg-primary' : 'hover-bg'}`}
                    >
                        <i className="bi bi-receipt me-3"></i>
                        Orders
                    </NavLink>
                </li>
            </ul>

            {/* Bottom Section */}
            <div className="border-top pt-3 mt-auto">
                <div className="mb-3">
                    <NavLink 
                        to="/dashboard/admin/profile" 
                        className="d-flex align-items-center text-white text-decoration-none"
                    >
                        <i className="bi bi-person-circle fs-4 me-2"></i>
                        <span className="fw-medium">Admin Profile</span>
                    </NavLink>
                </div>

                <div className="d-flex justify-content-center gap-3">
                    <NavLink to="#" className="text-muted hover-primary">
                        <i className="bi bi-github fs-5"></i>
                    </NavLink>
                    <NavLink to="#" className="text-muted hover-primary">
                        <i className="bi bi-twitter fs-5"></i>
                    </NavLink>
                    <NavLink to="#" className="text-muted hover-primary">
                        <i className="bi bi-box-arrow-right fs-5"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;