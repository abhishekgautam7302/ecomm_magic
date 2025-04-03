import React from 'react'
import Layout from '../components/Layout/Layout'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <Layout title={'go backpage-not-found'}>
            <div className="container text-center my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h1 className="display-1 text-danger">404</h1>
                                <h3 className="card-title">Oops! Page Not Found</h3>
                                <p className="card-text">Sorry, the page you're looking for doesn't exist.</p>
                                <NavLink to="/" className="btn btn-primary">Go Back to Home</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default PageNotFound