import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const Services = () => {
    const [services, setServices] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [serviceDelete, setServiceDelete] = useState(null);
    const navigate = useNavigate();

    // Fetch services
    const getServices = async () => {
        try {
            const { data } = await axios.get('/api/v1/services/get-admin-services');
            if (data.success) setServices(data.servicesWithUrls);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error loading services");
        }
    };

    // Toggle status handler
    const toggleStatus = async (id, currentStatus) => {
        try {
            const { data } = await axios.put(`/api/v1/services/toggle-status/${id}`, {
                status: !currentStatus
            });

            if (data.success) {
                setServices(services.map(service =>
                    service._id === id ? { ...service, status: !currentStatus } : service
                ));
                toast.success("Status updated successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Status update failed");
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    // -----------handle delelte---------------
    const handleDeleteConfirmation = async (id) => {
        setServiceDelete(id);
        setDeleteModalVisible(true)
    }

    const handleDelete = async () => {
        if (!serviceDelete) return
        try {
            await axios.delete(`/api/v1/services/delete-services/${serviceDelete}`);
            toast.success("Service deleted successfully");
            setDeleteModalVisible(false);
            getServices();
        } catch (error) {
            toast.error("Deletion failed");
            setDeleteModalVisible(false);
            setServiceDelete(null);
        }

    };

    return (
        <Layout>
            <div className="container-fluid admin-dashboard">
                <div className="row">
                    <AdminMenu />
                    <div className="col-md-10 content-area p-4">
                        <div className="card shadow-glass border-0">
                            <div className="card-body p-4">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="bg-soft-dark">
                                            <tr>
                                                <th>Image</th>
                                                <th>Service</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service) => (
                                                <tr key={service._id}>
                                                    <td>
                                                        <img
                                                            src={service.photos?.[0]}
                                                            alt={service.name}
                                                            className="service-thumbnail rounded-2"
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex flex-column">
                                                            <strong>{service.name}</strong>
                                                            <small className="text-muted">{service.shortDescription}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-dark">{service.category}</span>
                                                        <div className="text-muted small">{service.subcategory}</div>
                                                    </td>
                                                    <td>₹{service.price.toLocaleString()}</td>
                                                    <td>
                                                        <div
                                                            className="toggle-switch"
                                                            onClick={() => toggleStatus(service._id, service.status)}
                                                            role="button"
                                                            tabIndex={0}
                                                            onKeyPress={(e) => e.key === 'Enter' && toggleStatus(service._id, service.status)}
                                                        >
                                                            <div
                                                                className={`slider ${service.status ? 'active' : ''}`}
                                                                role="switch"
                                                                aria-checked={service.status}
                                                            >
                                                                <div className="slider-button"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex ">
                                                            <button
                                                                className="btn btn-icon btn-hover-primary"
                                                                onClick={() => navigate(`/dashboard/admin/update-service/${service._id}`)}
                                                                aria-label="Edit service"
                                                            >
                                                                <EditOutlined />
                                                            </button>
                                                            <button
                                                                className="btn btn-icon btn-hover-danger"
                                                                onClick={() => handleDeleteConfirmation(service._id)}
                                                                aria-label="Delete service"
                                                            >
                                                                <DeleteOutlined />
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
                    setServiceDelete(null);
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
                    {serviceDelete && (
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



                .service-thumbnail {
                    width: 80px;
                    height: 60px;
                    object-fit: cover;
                    border: 2px solid #e2e8f0;
                }

                .toggle-switch {
                    display: inline-block;
                    cursor: pointer;
                    width: 60px;
                    height: 30px;
                    outline: none;
                }

                .slider {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background-color: #e9ecef;
                    border-radius: 15px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .slider.active {
                    background-color: #4CAF50;
                }

                .slider-button {
                    position: absolute;
                    height: 26px;
                    width: 26px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    border-radius: 50%;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                }

                .slider.active .slider-button {
                    transform: translateX(30px);
                    background-color: #4CAF50;
                }

                .btn-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                }

                .btn-hover-primary:hover {
                    background: rgba(59, 130, 246, 0.1) !important;
                    color: #3b82f6 !important;
                }

                .btn-hover-danger:hover {
                    background: rgba(239, 68, 68, 0.1) !important;
                    color: #ef4444 !important;
                }
            `}</style>
        </Layout>
    );
};

export default Services;