import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../../Context/auth';

const Orders = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserOrder = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/my-orders');
      setUserOrders(data.orders);
      setError(null);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token){
      getUserOrder();
      }
  }, [auth?.token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'primary';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

    return (
      <Layout>
        <div className="container-fluid">
          <div className="row min-vh-100">
            <div className="col-lg-2 col-xl-2 p-0">
              <UserMenu />
            </div>
  
            <div className="col-lg-10 ps-5 col-xl-10 p-4">
              <div className="card">
                <div className="card-header bg-white">
                  <h5 className="mb-0">
                    <i className="bi bi-box-seam me-2"></i>
                    Order History
                  </h5>
                </div>
  
                <div className="card-body">
                  {/* Error and loading states remain same */}
  
                  {userOrders.map((order) => (
                    <div key={order._id} className="order-item mb-4 p-3 border rounded">
                      <div className="row">
                        {/* Left Side - Product Details */}
                        <div className="col-md-8 border-end pe-4">
                          <h6 className="mb-3 fw-bold">Ordered Products</h6>
                          {order.products.map((item, index) => (
                            <div key={item.product?._id || index} className="d-flex mb-3">
                              <div className="flex-shrink-0">
                                <img
                                  src={`/api/v1/product/product-photo/${item.product?._id}` || '/images/placeholder-product.jpg'}
                                  alt={item.product?.name}
                                  className="img-fluid rounded"
                                  style={{ width: '450px', height: '320px', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="flex-grow-1 ms-5 ">
                                <h4 className="mb-2">{item.product?.name || 'Product not available'}</h4>
                                <h4 className="mb-2">{item.product?.description || 'Product not available'}</h4>

                                <div className="d-flex justify-content-between text-muted small">
                                  <span>quantity: {item.quantity}</span>
                                  </div>
                                <div className="text-muted small">
                                  SKU: {item.product?.sku || 'N/A'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
  
                        {/* Right Side - Payment and User Details */}
                        <div className="col-md-4 ps-4">
                          <div className="mb-4">
                            <h6 className="fw-bold mb-3">Order Summary</h6>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Order ID:</span>
                              <span className="text-muted text-truncate" style={{ maxWidth: '150px' }}>
                                {order._id}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Order Date:</span>
                              <span className="text-muted">
                                {moment(order.createdAt).format('MMM Do YYYY')}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Status:</span>
                              <span className={`text-${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Total Amount:</span>
                              <span className="fw-bold">${order.total?.toFixed(2)}</span>
                            </div>
                          </div>
  
                          <div className="border-top pt-3">
                            <h6 className="fw-bold mb-3">Shipping Details</h6>
                            <div className="small text-muted">
                              <div className="mb-1">
                                <i className="bi bi-person me-2"></i>
                                {auth.user?.name || 'N/A'}
                              </div>
                              <div className="mb-1">
                                <i className="bi bi-geo-alt me-2"></i>
                                {auth.user?.address || 'N/A'}
                              </div>
                              <div className="mb-1">
                                <i className="bi bi-phone me-2"></i>
                                {auth.user?.phone || 'N/A'}
                              </div>
                              <div>
                                <i className="bi bi-envelope me-2"></i>
                                {auth.user?.email || 'N/A'}
                              </div>
                            </div>
                          </div>
  
                          <div className="text-end mt-3">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate(`/order/${order._id}`)}
                            >
                              View Full Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <style jsx>{`
          .order-item {
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.2s ease;
          }
          .order-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          }
        `}</style>
      </Layout>
    );
  };
  
  export default Orders;