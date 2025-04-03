import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';

const CategoryProduct = () => {
    const [cart,setCart] = useCart();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const getProductByCategory = async () => {
        try {
            const res = await axios.get(`/api/v1/product/product-category/${slug}`);
            if (res.data.success) {
                setProducts(res.data.products);
                setCategory(res.data.category);
            }
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    useEffect(() => {
        if (slug) getProductByCategory();
    }, [slug]);

    return (
        <Layout>
            <div className="container-fluid px-5 my-5">
                {/* Category Header */}
                <div className="text-center mb-6">
                    <h1 className="display-4 fw-bold text-gradient">
                        {category?.name || 'Category Name'}
                    </h1>
                    <p className="lead text-muted">
                        {products.length} {products.length === 1 ? 'item' : 'items'} available
                    </p>
                </div>

                {/* Product Grid */}
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product._id} className="col-xl-3 col-lg-4 col-md-6">
                            <div className="card h-100 shadow-sm border-1 ">
                                <div className="card-img-top overflow-hidden" style={{ height: '250px' }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        className="img-fluid w-100 h-100 object-fit-cover"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-3">{product.name}</h5>
                                    <p className="text-muted small mb-3 line-clamp-3">
                                    {product.description?.length > 70 ?
                                                        `${product.description.substring(0, 70)}...` :
                                                        product.description}                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="text-primary mb-0">${product.price}</h6>
                                        <div className="d-flex gap-2">
                                            <button
                                                onClick={() => navigate(`/product/${product.slug}`)}
                                                className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                            >
                                                Details
                                            </button>
                                            <button
                                            onClick={()=>
                                                {setCart([...cart,product]);
                                                    localStorage.setItem('cart',JSON.stringify([...cart,product]))
                                                }

                                            }
                                                className="btn btn-color btn-sm rounded-pill px-3 text-white"
                                            >
                                                <i className="bi bi-cart-plus me-2 text-white"></i>Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-6">
                        <div className="display-1 text-muted mb-3">😕</div>
                        <h2 className="h4 text-muted">No products found in this category</h2>
                    </div>
                )}
            </div>

            <style>{`

            .btn-color{
            background: linear-gradient(45deg,rgb(26, 36, 54),rgb(2, 72, 107));
            }
                .text-gradient {
                    background: linear-gradient(45deg,rgb(21, 30, 48), #4BCFCF);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hover-scale {
                    transition: transform 0.5s ease-in-out;
                }
                .hover-scale:hover {
                    transform: translateY(-1px);
                }
                .object-fit-cover {
                    object-fit: cover;
                    object-position: center;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .shadow-sm {
                    box-shadow: 0 0.1rem 0.01rem rgba(0.1, 0.1, 0.11, 1) !important;
                }
            `}</style>
        </Layout>
    );
};

export default CategoryProduct;