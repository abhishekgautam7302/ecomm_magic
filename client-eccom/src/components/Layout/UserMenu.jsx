// UserMenu.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="sidebar sidebar-color vh-100 p-3 border-end ">
      <h4 className="text-center profile-name mb-4 text-gradient fw-bold my-4">User Dashboard</h4>
     
      <nav className="nav flex-column gap-2">
      <NavLink 
          to="/dashboard/user" 
          className="nav-link d-flex align-items-center py-1 px-3 rounded-3"
          activeClassName="active"
        >
        <i className="bi bi-person-circle me-3 fs-5"></i>
        <span className="d-none d-lg-inline">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/dashboard/user/profile" 
          className="nav-link d-flex align-items-center py-1 px-3 rounded-3"
          activeClassName="active"
        >
          <i className="bi bi-person-circle me-3 fs-5"></i>
          <span className="d-none d-lg-inline">Profile</span>
        </NavLink>
        <NavLink 
          to="/dashboard/user/orders" 
          className="nav-link d-flex align-items-center py-1 px-3 rounded-3"
          activeClassName="active"
        >
          <i className="bi bi-receipt me-3 fs-5"></i>
          <span className="d-none d-lg-inline">Orders</span>
        </NavLink>
        <NavLink 
          to="/logout" 
          className="nav-link d-flex align-items-center py-1 px-3 rounded-3 text-danger"
        >
          <i className="bi bi-box-arrow-right me-3 fs-5"></i>
          <span className="d-none d-lg-inline">Logout</span>
        </NavLink>
      </nav>

      <style jsx="true" global="true">{`
        .profile-name {
          font-size: 20px;
          font-weight: 600;
          color:rgb(16, 22, 32);
          border-bottom: 0.5px solidrgb(156, 193, 242);
          padding-bottom: 0.5rem;
        }
          .sidebar-color{
          background: linear-gradient(135deg,rgba(0, 35, 39, 0.99) 0%,rgb(0, 64, 92) 100%);
          min-height: 100vh;
          }
        .sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          left:0px;
        }

        .nav-link {
          color: #475569;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
        }

        .nav-link.active {
          background: rgba(101, 102, 210, 0.1) !important;
          color:rgb(255, 255, 255) !important;
          border-left: 5px solid rgb(144, 15, 15);
        }

        .text-gradient {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 991.98px) {
          .sidebar {
            width: 80px;
            padding: 1rem !important;
          }
          
          .nav-link {
            justify-content: center;
            padding: 1rem !important;
          }
          
          .nav-link i {
            margin-right: 0 !important;
          }
        }

        @media (min-width: 992px) {
          .sidebar {
            min-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserMenu;