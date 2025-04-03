import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { NavLink } from 'react-router-dom'

const Users = () => {
  return (
  <Layout>
    <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <AdminMenu/>
          {/* Content Area */}
          <div className="col-md-9 content">
            <div className="content-header">
              <h3>ALL USERS</h3>
              <p>Here's an overview of your recent activity and updates.</p>
            </div>
            <div className="row">
              {/* Example Cards */}
              <div className="col-md-4">
                <div className="card p-3">
                  <h5 className="card-title">Card Title 1</h5>
                  <p className="card-text">This is a short description for the card content.</p>
                  <NavLink to="#" className="btn btn-primary">View Details</NavLink>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h5 className="card-title">Card Title 2</h5>
                  <p className="card-text">This is NavLink short description for the card content.</p>
                  <NavLink to="#" className="btn btn-primary">View Details</NavLink>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h5 className="card-title">Card Title 3</h5>
                  <p className="card-text">This is NavLink short description for the card content.</p>
                  <NavLink to="#" className="btn btn-primary">View Details</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </Layout>
  )
}

export default Users