// Dashboard.js
import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../Context/auth';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard"}>
      <div className=" dashboard-container">
        <div className="row min-vh-100">
        <div className="col-lg-3 col-xl-2 p-0">
            <UserMenu />
          </div>

          <div className="col-lg-9 col-xl-10 content-area p-5">
            {/* Header */}
            <div className="dashboard-header bg-gradient-primary text-white p-5 rounded-4 mb-5">
              <h1 className="display-6 fw-bold">Welcome back, {auth?.user?.name}!</h1>
              <p className="lead mb-0">Manage your account and explore features tailored for you</p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4">
              {/* User Card */}
              <div className="col-md-6 col-xl-4">
                <div className="card shadow-sm border-0 hover-scale h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="icon-circle bg-primary text-white me-3">
                        <i className="bi bi-person-fill fs-3"></i>
                      </div>
                      <h3 className="mb-0">Profile Details</h3>
                    </div>
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Email:</span>
                        <span className="text-muted">{auth?.user?.email}</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Phone:</span>
                        <span className="text-muted">{auth?.user?.phone || 'N/A'}</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center px-0">
                        <span>Address:</span>
                        <span className="text-muted text-end">{auth?.user?.address || 'N/A'}</span>
                      </div>
                    </div>
                    <button className="btn btn-primary mt-4 w-100 hover-scale">
                      <i className="bi bi-pencil-square me-2"></i>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Orders Card */}
              <div className="col-md-6 col-xl-4">
                <div className="card shadow-sm border-0 hover-scale h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="icon-circle bg-success text-white me-3">
                        <i className="bi bi-cart-check fs-3"></i>
                      </div>
                      <h3 className="mb-0">Recent Orders</h3>
                    </div>
                    <div className="text-center py-5">
                      <i className="bi bi-box-seam display-4 text-muted"></i>
                      <p className="mt-3">No recent orders found</p>
                      <button className="btn btn-success hover-scale">
                        <i className="bi bi-arrow-right me-2"></i>
                        View Orders
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="col-md-6 col-xl-4">
                <div className="card shadow-sm border-0 hover-scale h-100">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-4">
                      <div className="icon-circle bg-info text-white me-3">
                        <i className="bi bi-graph-up fs-3"></i>
                      </div>
                      <h3 className="mb-0">Statistics</h3>
                    </div>
                    <div className="stats-grid">
                      <div className="stat-item bg-light p-3 rounded-3 text-center">
                        <div className="text-primary fw-bold fs-4">12</div>
                        <div className="text-muted small">Total Orders</div>
                      </div>
                      <div className="stat-item bg-light p-3 rounded-3 text-center">
                        <div className="text-success fw-bold fs-4">$2,450</div>
                        <div className="text-muted small">Total Spent</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-info hover-scale w-100">
                        <i className="bi bi-activity me-2"></i>
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          background:rgb(243, 237, 255);
        }
        
        .sidebar {
          min-height: 100vh;
          border-right: 1px solid rgba(0,0,0,0.1);
        }
        
        .dashboard-header {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
        }
        
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hover-scale {
          transition: all 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: translateY(-5px);
          // box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        
        .active-link {
          background: #6366f1 !important;
          color: white !important;
        }
        
        .text-gradient {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .sidebar {
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          
          .dashboard-header {
            padding: 2rem !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;