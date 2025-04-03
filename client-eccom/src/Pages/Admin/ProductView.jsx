import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from "antd";
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const ProductView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productDelete, setProductDelete] = useState(null);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const res = await axios.get('/api/v1/product/get-product');
      if (res.data.success) {
        setProducts(res.data?.products);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ===DELETE CONFIRMATION
  const handleDeleteConfirmation = async (id) => {
    setProductDelete(id);
    setDeleteModalVisible(true)
  }

  // Delete product
  const handleDelete = async () => {

    if (!productDelete) return
    try {
      const res = await axios.delete(`/api/v1/product/delete-product/${productDelete}`);
      if (res.data.success) {
        toast.success("Product deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      toast.error("Error deleting product");
      setDeleteModalVisible(false);
      setProductDelete(null);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid admin-dashboard">
        <div className="row">
          <AdminMenu />

          <div className="col-md-10 content-area p-4">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-gradient-primary text-white">
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h4 className="mb-0">Product Management</h4>
                  <button
                    className="btn btn-light btn-lg fs-6 rounded-pill px-3 py-1"
                    onClick={() => navigate('/dashboard/admin/create-product')}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Product
                  </button>
                </div>
              </div>

              <div className="card-body p-0 mt-4">
                <div className="table-responsive rounded-3">
                  <table className="table table-hover align-middle mb-0">
                    <thead>
                      <tr>
                        <th className="ps-4">Product</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th className="pe-4 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="hover-lift">
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <img
                                src={`/api/v1/product/product-photo/${product._id}`}
                                alt={product.name}
                                className="product-table-image rounded-3"
                              />
                              <span className="ms-3 fw-semibold">{product.name}</span>
                            </div>
                          </td>

                          <td>${product.price}</td>
                          <td>{product.category?.name}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <span className={`badge ${product.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="pe-4 text-end">
                            <div className="d-flex gap-2 justify-content-end">
                              <button
                                className="btn btn-icon btn-hover-warning rounded-circle"
                                onClick={() => navigate(`/dashboard/admin/product/${product.slug}`)}
                              >
                                <i className="bi bi-pencil fs-5"></i>
                              </button>
                              <button
                                className="btn btn-icon btn-hover-danger rounded-circle"
                                onClick={() => handleDeleteConfirmation(product._id)}
                              >
                                <i className="bi bi-trash fs-5"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Delete Confirmation Modal */}
      <Modal
        title={(
          <div className="d-flex align-items-center gap-2 text-danger">
            <i className="bi bi-incognito fs-4"></i>
            <span className="fw-bold text-destroy">Termination Protocol</span>
          </div>
        )}
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setProductDelete(null);
        }}
        okText="Engage Termination"
        okButtonProps={{
          danger: true,
          className: "btn-destroy rounded-pill px-4",
          icon: <i className="bi bi-plasma me-2"></i>
        }}
        cancelButtonProps={{
          className: "rounded-pill px-4 btn-ghost"
        }}
        centered
        className="destruction-modal"
      >
        <div className="p-3">
          <p className="mb-2 fs-5 text-center">This action will initiate permanent deletion sequence!</p>
          {productDelete && (
            <div className="alert alert-destroy d-flex align-items-center">
              <i className="bi bi-hazard me-2"></i>
              <div>
                <strong>Warning:</strong> All connected sub-dimensions will be<br />
                erased from the continuum!
              </div>
            </div>
          )}
        </div>
      </Modal>

      <style jsx="true" global="true">{`

      
        .alert-destroy {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ff6363;
          border-radius: 8px;
        }

        .cyber-modal .ant-modal-content {
          border-radius: 16px;
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid rgba(99, 102, 241, 0.1);
          box-shadow: 0 12px 24px rgba(31, 38, 135, 0.2);
        }

        .destruction-modal .ant-modal-content {
          background: linear-gradient(45deg, #2a0a0a 0%, #1a0606 100%);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ff6363;
        }
        .admin-dashboard {
          background: #f8fafc;
          min-height: 100vh;
        }
        
        .content-area {
          background: linear-gradient(to right, #f8fafc 0%, #f1f5f9 100%);
        }

        .bg-gradient-primary {
          background: linear-gradient(90deg,rgb(10, 28, 55) 0%,rgb(10, 30, 55) 50%,rgb(2, 45, 62) 100%);

        }

        .product-table-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .hover-lift {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .hover-lift:hover {
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
        }

        .btn-icon {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-hover-primary:hover {
          background: rgba(59, 130, 246, 0.1) !important;
        }

        .btn-hover-warning:hover {
          background: rgba(245, 158, 11, 0.1) !important;
        }

        .btn-hover-danger:hover {
          background: rgba(239, 68, 68, 0.1) !important;
        }

        .bg-light-primary {
          background-color: rgba(59, 130, 246, 0.05) !important;
        }
      `}</style>
    </Layout>
  );
};

export default ProductView;