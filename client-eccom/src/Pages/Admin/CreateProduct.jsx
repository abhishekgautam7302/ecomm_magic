import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Select } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(""); // Changed from null to ""
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(""); // Ensured it's always a string

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle product creation
  const handleCreate = async (e) => {
    e.preventDefault();
    // Validate fields before sending request
    if (!name || !description || !price || !category || !quantity) {
      return toast.error("All fields are required!");
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      const res = await axios.post("/api/v1/product/create-product", productData);

      if (res.data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data?.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <Layout>
    <div className="container-fluid admin-dashboard">
      <div className="row">
        <AdminMenu />
        
        <div className="col-md-10 content-area p-4">
          <div className="card shadow-lg border-0 create-product-card">
            <div className="card-header bg-gradient-primary text-white">
              <h2 className="mb-0 py-3">Create New Product</h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleCreate} className="row g-4">
                {/* Left Column - Image Upload */}
                <div className="col-lg-5">
                  <div className="image-upload-card border-dashed rounded-3 p-4">
                    <div className="text-center mb-4">
                      <InboxOutlined className="display-4 text-muted" />
                      <h5 className="mt-2">Product Image</h5>
                      <p className="text-muted">Recommended size: 600x400px</p>
                    </div>
                    
                    <label className="upload-btn btn btn-outline-primary w-100">
                      <UploadOutlined className="me-2" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                      />
                    </label>

                    {photo && (
                      <div className="preview-container mt-4">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="Product Preview"
                          className="img-fluid rounded-3 shadow-sm"
                        />
                      </div>
                    )}
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
                        className="form-control form-control-lg"
                        placeholder="Enter product name"
                        value={name}
                        name="name"
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
                           name="price"
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
                           name="quantity"
                          className="form-control form-control-lg"
                          placeholder="Enter quantity"
                          value={quantity}
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
                         name="shipping"
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
                         name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-between mt-4 px-5 gap-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-md rounded-md py-2 w-100"
                      >
                        Create Product Now
                      </button>
                      <button
                      onClick={()=>navigate('/dashboard/admin/products')}
                        className="btn btn-primary btn-md rounded-md py-2 w-100"
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

      .create-product-card {
        border-radius: 6px;
        overflow: hidden;
      }

      .bg-gradient-primary {
    background: linear-gradient(90deg,rgb(25, 25, 45) 0%,rgb(17, 42, 53) 50%,rgb(2, 58, 62) 100%);
      }

      .image-upload-card {
        background: rgba(241, 243, 245, 0.5);
        border: 2px dashed #ced4da;
        height: 100%;
        transition: all 0.3s ease;
      }

      .image-upload-card:hover {
        border-color: #3b82f6;
        background: rgba(59, 130, 246, 0.05);
      }

      .border-dashed {
        border-style: dashed !important;
      }

      .upload-btn {
        transition: all 0.2s ease;
        padding: 1rem 1.5rem;
      }

      .upload-btn:hover {
        transform: translateY(-2px);
      }

      .preview-container {
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }


      .form-label {
        font-weight: 500;
        color: #2d3748;
        margin-bottom: 0.5rem;
      }

      .form-control-lg {
        font-size:15px;
        padding: 0.15rem 1.25rem;
        border-radius: 5px;
        border: 2px solid #e2e8f0;
      }

      .form-control-lg:focus {
        border-color:rgba(1, 30, 76, 0.39);
        box-shadow: 0 0 0 3px rgba(0, 18, 47, 0.15);
      }

      .ant-select-selector {
        border-radius: 5px !important;
        border: 2px solid #e2e8f0 !important;
        height: 38px !important;
        padding: 0 1.25rem !important;
      }

      .ant-select-selection-item {
        display: flex !important;
        align-items: center !important;
      }
    `}</style>
  </Layout>
  );
};

export default CreateProduct;
