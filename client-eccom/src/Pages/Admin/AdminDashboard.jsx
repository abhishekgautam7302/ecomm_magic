// AdminDashboard.jsx
import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { NavLink } from 'react-router-dom'
import './Dashboard.css';

const AdminDashboard = () => {
  const stats = [
    { title: "Total Products", value: "1,234", icon: "bi-box-seam", color: "bg-primary" },
    { title: "Active Users", value: "893", icon: "bi-people", color: "bg-success" },
    { title: "Pending Orders", value: "56", icon: "bi-cart", color: "bg-warning" },
    { title: "Total Revenue", value: "$12,450", icon: "bi-currency-dollar", color: "bg-info" }
  ]

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <AdminMenu />
          
          <div className="col-md-10 content p-5">
            <div className="content-header mb-5">
              <h2 className="fw-bold mb-3">Welcome back, Admin!</h2>
              <p className="lead text-muted">Here's your dashboard overview for today</p>
            </div>

            <div className="row g-4">
              {stats.map((stat, index) => (
                <div className="col-xl-3 col-md-6" key={index}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className={`${stat.color} rounded-circle p-3 me-3`}>
                          <i className={`bi ${stat.icon} fs-4 text-white`}></i>
                        </div>
                        <div>
                          <h6 className="text-uppercase text-muted mb-0">{stat.title}</h6>
                          <h2 className="mb-0 fw-bold">{stat.value}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent">
                      <NavLink to="#" className="small text-decoration-none">
                        View details <i className="bi bi-arrow-right-short"></i>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row mt-5 g-4">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-header border-0 bg-white">
                    <h5 className="fw-bold mb-0">Recent Activities</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      {[1, 2, 3].map((item) => (
                        <li key={item} className="list-group-item border-0 d-flex align-items-center py-3">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <div>
                            <h6 className="mb-1">New order received (#123{item})</h6>
                            <small className="text-muted">2 hours ago</small>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-header border-0 bg-white">
                    <h5 className="fw-bold mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-3">
                      <button className="btn btn-outline-primary text-start d-flex align-items-center">
                        <i className="bi bi-plus-circle me-2"></i> Add New Product
                      </button>
                      <button className="btn btn-outline-success text-start d-flex align-items-center">
                        <i className="bi bi-graph-up me-2"></i> View Sales Report
                      </button>
                      <button className="btn btn-outline-info text-start d-flex align-items-center">
                        <i className="bi bi-envelope me-2"></i> Check Messages
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard