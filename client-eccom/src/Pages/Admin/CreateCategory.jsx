import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import CreateCategoryForm from "../../components/Form/CreateCotegoryForm";

const CreateCategory = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Added for proper delete handling

  // ===== Create Category =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/category/create-category", { name });
      if (res.data.success) {
        toast.success(`${name} category created successfully`);
        getAllCategories();
        setName("");
        setVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creating category");
    }
  };

  // ===== Get All Categories =====
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ===== Update Category =====
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selected) return;
    
    try {
      const res = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name }
      );
      if (res.data.success) {
        toast.success("Category updated successfully");
        setSelected(null);
        setName("");
        setVisible(false);
        setIsEditMode(false);
        getAllCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating category");
    }
  };

  // ===== Delete Category =====
  const handleDeleteConfirmation = (id) => {
    setCategoryToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    try {
      const res = await axios.delete(
        `/api/v1/category/delete-category/${categoryToDelete}`
      );
      if (res.data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error deleting category");
    } finally {
      setDeleteModalVisible(false);
      setCategoryToDelete(null);
    }
  };

  return (
<Layout>
  <div className="container-fluid admin-dashboard">
    <div className="row">
      <AdminMenu />

      {/* Content Area with Glassmorphism Effect */}
      <div className="col-md-10 content-area p-3">
        <div className="card glass-card shadow-xl border-0 overflow-hidden">
          <div className="card-header bg-gradient-metal border-0 position-relative">
            <div className="d-flex justify-content-between align-items-center py-1">
              <div className="d-flex align-items-center">
                <i className="bi bi-diagram-3-fill fs-2 me-3 text-white"></i>
                <h2 className="mb-0 fw-bold text-white ">Category Nexus</h2>
              </div>
              <button
                className="btn btn-holographic d-flex align-items-center rounded-pill px-3 py-2"
                onClick={() => {
                  setVisible(true);
                  setIsEditMode(false);
                  setName("");
                }}
              >
                <i className="bi bi-plus-circle-dotted me-2 fs-5"></i>
                Forge New Category
              </button>
            </div>
            <div className="header-deco"></div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive rounded-3">
              <table className="table table-hover align-middle mb-0 cosmic-table">
                <thead className="bg-gradient-metal-2">
                  <tr>
                    <th scope="col" className="ps-4 py-3 fw-bold text-uppercase text-dark">Category Name</th>
                    <th scope="col" className="pe-4 py-3 fw-bold text-uppercase text-dark text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id} className="hover-lift-neon">
                      <td className="ps-4 fw-semibold text-dark">
                        <div className="d-flex align-items-center">
                          <span className="status-pulse me-3"></span>
                          <span className="category-name">{c.name}</span>
                        </div>
                      </td>
                      <td className="pe-4">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-icon btn-hover-cyber rounded-pill"
                            onClick={() => {
                              setVisible(true);
                              setIsEditMode(true);
                              setName(c.name);
                              setSelected(c);
                            }}
                          >
                            <i className="bi bi-pencil-fill fs-5"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-hover-cyber-danger rounded-pill"
                            onClick={() => handleDeleteConfirmation(c._id)}
                          >
                            <i className="bi bi-trash3 fs-5"></i>
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

      {/* Futuristic Modals */}
      <Modal
        title={(
          <div className="d-flex align-items-center gap-2">
            <i className={`bi ${isEditMode ? 'bi-pencil-fill' : 'bi-plus-diamond-fill'} text-gradient fs-4`}></i>
            <span className="fw-bold text-gradient">{isEditMode ? 'Reconfigure Category' : 'Initialize New Dimension'}</span>
          </div>
        )}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setSelected(null);
          setIsEditMode(false);
          setName("");
        }}
        footer={null}
        centered
        className="cyber-modal"
      >
        <div className="p-4 modal-content-inner">
          <CreateCategoryForm
            value={name}
            setValue={setName}
            handleSubmit={isEditMode ? handleUpdate : handleSubmit}
          />
        </div>
      </Modal>

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
          setCategoryToDelete(null);
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
          {categoryToDelete && (
            <div className="alert alert-destroy d-flex align-items-center">
              <i className="bi bi-hazard me-2"></i>
              <div>
                <strong>Warning:</strong> All connected sub-dimensions will be<br/>
                erased from the continuum!
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  </div>

  <style jsx="true" global="true">{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');

    .admin-dashboard {
      background: radial-gradient(circle at top right, #f8fafc 0%, #e9eef5 100%);
      min-height: 100vh;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    .content-area {
      background: rgba(227, 227, 227, 0.85);
      backdrop-filter: blur(12px);
    }

    .glass-card {
      background: rgba(9, 120, 168, 0.9);
      border-radius: 6px;
      border: 2px solid rgba(3, 64, 87, 0.3);
      box-shadow: 0 4px 6px rgb(48, 96, 144);
    }

    .bg-gradient-metal {
    background: linear-gradient(90deg,rgb(25, 25, 45) 0%,rgb(17, 42, 53) 50%,rgb(2, 58, 62) 100%);

    }

    .btn-holographic {
      background: linear-gradient(45deg,rgb(14, 15, 28),rgb(5, 25, 81));
      color: white;
      border: none;
      position: relative;
      overflow: hidden;
    }

    .btn-holographic:before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, 
        transparent 25%,
        rgba(255,255,255,0.1) 50%,
        transparent 75%);
      transform: rotate(45deg);
      animation: hologram 5s infinite linear;
    }

    @keyframes hologram {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }

    .cosmic-table tbody tr {
      border-bottom: 1px solid rgba(0, 45, 77, 0.14);
    }

    .cosmic-table tbody tr:nth-child(odd) {
      background: var(--stripe-color);
    }

    .status-pulse {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background:rgb(11, 52, 110);
      position: relative;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
      70% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    }

    .destruction-modal .ant-modal-content {
      background: linear-gradient(45deg, #2a0a0a 0%, #1a0606 100%);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ff6363;
    }

    .text-gradient {
      background: linear-gradient(45deg, #6366f1, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .btn-hover-cyber:hover {
      background: rgba(99, 102, 241, 0.1) !important;
      transform: scale(1.1);
    }

    .btn-hover-cyber-danger:hover {
      background: rgba(239, 68, 68, 0.1) !important;
      transform: scale(1.1);
    }

    .alert-destroy {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ff6363;
      border-radius: 8px;
    }

    .category-name {
      position: relative;
      padding-left: 8px;
    }

    .category-name:before {
      content: "»";
      position: absolute;
      left: -12px;
      color: #6366f1;
      opacity: 0;
      transition: all 0.3s ease;
    }

    tr:hover .category-name:before {
      opacity: 1;
      left: -8px;
    }
  `}</style>
</Layout>
);
};

export default CreateCategory;