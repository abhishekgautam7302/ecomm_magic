import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import moment from 'moment'

const OrdersUsers = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/v1/auth/all-orders');
      setOrders(data?.orders || []); // Ensure we always have an array
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (auth?.token) getAllOrders()
  }, [auth?.token]);

  // Calculate statistics safely
  const pendingOrders = orders.filter((pen) => pen?.status === 'pending').length;
  const processingOrder = orders.filter((o) => o?.status === 'processing').length;
  const deliveredOrders = orders.filter((o) => o?.status === 'delivered').length;
  const shippedOrders = orders.filter((o) => o?.status === 'shipped').length;

  return (
    <Layout>
      <div className="container-fluid admin-dashboard">
        <div className="row">
          <AdminMenu />
          <div className="col-md-10 content-area p-4">
            <div className="card glass-orders-card shadow-xxl border-0 overflow-hidden">
              {/* Card Header with Stats */}
              <div className="card-headers bg-gradient-timeline border-0 position-relative">
                <div className="d-flex justify-content-between align-items-center py-1 px-3">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-clock-history fs-3 text-white"></i>
                    <div>
                      <h2 className="mb-0 fw-bold fs-5 text-white">Order Orchestrator</h2>
                      <p className="mb-0 text-white-50">Real-time order tracking & management</p>
                    </div>
                  </div>
                  <div className="d-flex gap-4 text-center">
                    <div className="order-stat ">
                      <div className="stat-value text-warning">{pendingOrders}</div>
                      <div className="stat-label">Pending</div>
                    </div>
                    <div className="order-stat">
                      <div className="stat-value text-success">{processingOrder}</div>
                      <div className="stat-label">Processing</div>
                    </div>
                    <div className="order-stat">
                      <div className="stat-value text-success">{deliveredOrders}</div>
                      <div className="stat-label">Delivered</div>
                    </div>
                    <div className="order-stat">
                      <div className="stat-value text-info">{shippedOrders}</div>
                      <div className="stat-label">Shipped</div>
                    </div>
                  </div>
                </div>
                <div className="header-wave"></div>
              </div>

              {/* Orders Table */}
              <div className="card-body p-0">
                <div className="table-responsive orders-table">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-soft">
                      <tr>
                        <th className="ps-4">Order ID</th>
                        <th>Customer</th>
                        <th>Customer Email</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th className="text-end pe-4">Total</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        orders?.map((order) => (
                          <tr key={order?._id} className="order-row hover-lift">
                            <td className="ps-4 fw-bold text-primary">
                            {order.products.map((item, index) => (
                            <div key={item.product?._id || index} className="d-flex mb-3">
                              <div className="flex-shrink-0">
                                <img
                                  src={`/api/v1/product/product-photo/${item.product?._id}` || '/images/placeholder-product.jpg'}
                                  alt={item.product?.name}
                                  className="img-fluid rounded"
                                  style={{ width: '120px', height: '60px', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="flex-grow-1 ms-5 ">
                                <h6 className="mb-2">{item.product?.name || 'Product not available'}</h6>
                                <div className="d-flex justify-content-between text-muted small">
                                  <span>quantity: {item.quantity}</span>
                                  </div>
                              </div>
                            </div>
                          ))}
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {order?.user?.name || 'Guest User'}
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {order?.user?.email || 'Guest User'}
                              </div>
                            </td>
                            <td>
                              <div className="text-muted">
                                {moment(order?.createdAt).format('DD/MM/YYYY hh:mm A')}
                              </div>
                            </td>
                            <td>
                              <div className={`status-badge ${order?.status?.toLowerCase()}`}>
                                {order?.status}
                              </div>
                            </td>
                            <td className="text-end pe-4 fw-bold">
                              ₹{order?.total?.toFixed(2)}
                            </td>
                            <td className="text-center">
                              <div className="d-flex gap-2 justify-content-center">
                                <button className="btn btn-icon btn-sm btn-soft-primary rounded-circle">
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-icon btn-sm btn-soft-warning rounded-circle">
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-icon btn-sm btn-soft-danger rounded-circle">
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination remains same */}
              <div className="card-footer bg-soft border-0">
                <div className="d-flex justify-content-between align-items-center px-4 py-3">
                  <div className="text-muted">Showing 1-10 of 224 orders</div>
                  <nav>
                    <ul className="pagination pagination-sm">
                      <li className="page-item"><NavLink className="page-link" to="#">Previous</NavLink></li>
                      <li className="page-item active"><NavLink className="page-link" to="#">1</NavLink></li>
                      <li className="page-item"><NavLink className="page-link" to="#">2</NavLink></li>
                      <li className="page-item"><NavLink className="page-link" to="#">3</NavLink></li>
                      <li className="page-item"><NavLink className="page-link" to="#">Next</NavLink></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles remain same */}
       <style jsx="true" global="true">{`

          .content-area {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
        }
        .glass-orders-card {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(15px);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
        }
  
      .bg-gradient-timeline {
        background: linear-gradient(90deg,rgb(25, 25, 45) 0%,rgb(17, 42, 53) 50%,rgb(17, 54, 111) 100%);
 
      }
  
      .header-wave {
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 20px;
        opacity: 0.1;
      }
  
      .order-stat {
        padding: 5px 10px;
        background: rgba(255, 255, 255, 0.14);
        border-radius: 5px;
        min-width: 100px;
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1;
        }
        .stat-label {
          color:rgb(255, 255, 255);
          font-size: 0.8rem;
          opacity: 0.8;
        }
      }
  
      .orders-table {
        .customer-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
  
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: capitalize;
          
          &.pending { background: rgba(255, 193, 7, 0.15); color: #ffc107; }
          &.processing { background: rgba(13, 202, 240, 0.15); color: #0dcaf0; }
          &.shipped { background: rgba(13, 110, 253, 0.15); color: #0d6efd; }
          &.delivered { background: rgba(25, 135, 84, 0.15); color: #198754; }
        }
      }
  
      .order-row {
        transition: all 0.2s ease;
        &:hover {
          transform: translateX(4px);
          box-shadow: 4px 0 0 0 #6366f1 inset;
        }
      }
  
      .search-box {
        position: relative;
        flex: 1;
        max-width: 300px;
        i {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
        input {
          padding-left: 40px;
          border: 1px solid rgba(0,0,0,0.1);
          &:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
          }
        }
      }
  
      .btn-ghost {
        background: transparent;
        border: 1px solid rgba(0,0,0,0.1);
        &:hover {
          background: rgba(0,0,0,0.03);
        }
      }
  
      .bg-soft {
        background: rgba(248, 249, 250, 0.6);
      }
  
      .pagination {
        .page-item {
          margin: 0 2px;
          .page-link {
            border-radius: 8px !important;
            border: none;
            &:hover {
              background: rgba(99, 102, 241, 0.1);
            }
          }
          &.active .page-link {
            background: #6366f1;
            color: white;
          }
        }
      }
    `}</style>
    </Layout>
  )
}

export default OrdersUsers