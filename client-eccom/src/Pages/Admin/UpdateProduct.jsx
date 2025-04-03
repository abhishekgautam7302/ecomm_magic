import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { InboxOutlined, SaveOutlined,UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");


    // Fetch all categories
    const getAllCategories = async () => {
        try {
            const res = await axios.get('/api/v1/category/get-category');
            if (res.data?.success) {
                setCategories(res.data.category);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategories();
        // eslint-disable-next-line
    }, []);

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            if (res.data?.success) {
                const product = res.data.product;
                setId(product._id);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category._id);
                setQuantity(product.quantity);
                setShipping(product.shipping);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in fetching the product");
        }
    };

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            photo && productData.append("photo", photo);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);

            const res = await axios.put(`/api/v1/product/update-product/${id}`, productData);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in updating the product");
        }
    };

    return (
        <Layout>
        <div className="container-fluid admin-dashboard">
            <div className="row">
                <AdminMenu />
                
                <div className="col-md-10 content-area p-4">
                    <div className="card shadow-lg border-0 update-product-card">
                        <div className="card-header bg-gradient-danger text-white">
                            <h2 className="mb-0 py-3">Update Product</h2>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleUpdate} className="row g-4">
                                {/* Left Column - Image Upload */}
                                <div className="col-lg-5">
                                    <div className="image-upload-card border-dashed rounded-3 p-4">
                                        <div className="text-center mb-4">
                                            <InboxOutlined className="display-4 text-muted" />
                                            <h5 className="mt-2">Product Image</h5>
                                            <p className="text-muted">Recommended size: 600x400px</p>
                                        </div>
                                        
                                        <label className="upload-btn btn btn-outline-danger w-100">
                                            <UploadOutlined className="me-2" />
                                            Change Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => setPhoto(e.target.files[0])}
                                            />
                                        </label>

                                        <div className="preview-container mt-4">
                                            <img
                                                src={photo ? URL.createObjectURL(photo) : `/api/v1/product/product-photo/${id}`}
                                                alt="Product Preview"
                                                className="img-fluid rounded-3 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Form Inputs */}
                                <div className="col-lg-7">
                                    <div className="form-grid">
                                        {/* Category Select */}
                                        <div className="mb-4">
                                            <label className="form-label">Category</label>
                                            <Select
                                                size="large"
                                                name='category'
                                                className="w-100"
                                                placeholder="Select Category"
                                                value={category}
                                                onChange={(value) => setCategory(value)}
                                                required
                                            >
                                                {categories.map((c) => (
                                                    <Option key={c._id} value={c._id}>
                                                        {c.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>

                                        {/* Product Name */}
                                        <div className="mb-4">
                                            <label className="form-label">Product Name</label>
                                            <input
                                                type="text"
                                                name='name'
                                                className="form-control form-control-lg"
                                                placeholder="Enter product name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>

                                        {/* Price & Quantity Row */}
                                        <div className="row g-3 mb-4">
                                            <div className="col-md-6">
                                                <label className="form-label">Price ($)</label>
                                                <input
                                                    type="number"
                                                    name='price'
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Quantity</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter quantity"
                                                    value={quantity}
                                                    name='quantity'
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Shipping Select */}
                                        <div className="mb-4">
                                            <label className="form-label">Shipping</label>
                                            <Select
                                                size="large"
                                                className="w-100"
                                                placeholder="Select Shipping Option"
                                                value={shipping}
                                                onChange={(value) => setShipping(value)}
                                                required
                                            >
                                                <Option value="0">No Shipping</Option>
                                                <Option value="1">Yes, Include Shipping</Option>
                                            </Select>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control form-control-lg"
                                                placeholder="Product description..."
                                                rows="4"
                                                name='description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="d-flex gap-3 mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-md rounded-md py-2 flex-grow-1"
                                            >
                                                <SaveOutlined className="me-2" />
                                                Update Product
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-md rounded-md py-2"
                                                onClick={() => navigate('/dashboard/admin/products')}
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style jsx="true" global="true">{`
            .admin-dashboard {
                background: #f8fafc;
                min-height: 100vh;
            }

            .update-product-card {
                border-radius: 1rem;
                overflow: hidden;
            }

            .bg-gradient-danger {
    background: linear-gradient(90deg,rgb(25, 25, 45) 0%,rgb(17, 42, 53) 50%,rgb(2, 58, 62) 100%);
            }

            .image-upload-card {
                background: rgba(254, 226, 226, 0.3);
                border: 2px dashed #fca5a5;
                height: 100%;
                transition: all 0.3s ease;
            }

            .image-upload-card:hover {
                border-color: #ef4444;
                background: rgba(239, 68, 68, 0.05);
            }

            .upload-btn {
                transition: all 0.2s ease;
                padding: 1rem 1.5rem;
                border: 2px solid #ef4444;
                color: #ef4444;
            }

            .upload-btn:hover {
                background: #ef4444 !important;
                color: white !important;
                transform: translateY(-2px);
            }

            .preview-container {
                border-radius: 0.5rem;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                border: 2px solid #fee2e2;
            }

            .form-label {
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
            }

            .form-control-lg {
                padding: 0.15rem 1.25rem;
                font-size:15px;
                border-radius: 6px;
                border: 2px solid #e2e8f0;
                transition: all 0.2s ease;
            }

            .form-control-lg:focus {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
            }

            .ant-select-selector {
                border-radius: 6px !important;
                border: 2px solid #e2e8f0 !important;
                height: 40px !important;
                padding: 0 1.25rem !important;
            }
        `}</style>
    </Layout>
    );
};

export default UpdateProduct;
