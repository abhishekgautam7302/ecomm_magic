import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaTag, FaTruck, FaStar, FaHeart,FaCreditCard } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useCart } from '../Context/cart';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart,setCart] = useCart();

    useEffect(() => {
        if (slug) {
            fetchProductDetails();
        }
        // eslint-disable-next-line
    },[slug]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/v1/product/get-product/${slug}`);
            if (res.data?.success) {
                const fetchedProduct = res.data.product;
                setProduct(fetchedProduct);
                fetchRelatedProducts(fetchedProduct._id, fetchedProduct.category?._id);
            } else {
                setError('Failed to fetch product details.');
            }
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError('An error occurred while fetching product details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (productId, categoryId) => {
        try {
            const res = await axios.get(`/api/v1/product/related-product/${productId}/${categoryId}`);
            setRelatedProducts(res.data?.products || []);
        } catch (err) {
            console.error('Error fetching related products:', err);
        }
    };

    return (
        <Layout>
            <div className="container my-4 my-lg-5">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline-dark px-3 py-2 text-secondary text-decoration-none mb-4 d-flex align-items-center gap-2 px-0"
                >
                    <FaArrowLeft /> Back to Products
                </button>

                {loading ? (
                    <div className="row">
                        <div className="col-md-6">
                            <Skeleton height={500} className="rounded-4" />
                        </div>
                        <div className="col-md-6">
                            <Skeleton count={3} height={30} className="mb-3" />
                            <Skeleton width={100} height={30} />
                            <Skeleton count={2} height={20} className="mt-4" />
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger text-center py-4">
                        <h4 className="mb-0 fw-bold">{error}</h4>
                    </div>
                ) : (
                    <>
                        {/* Main Product Section */}
                        <div className="card shadow-lg mb-5 border-1 overflow-hidden">
                            <div className="row g-0">
                                {/* Product Image */}
                                <div className="col-md-6 p-4 bg-light">
                                    <div className="position-relative">
                                        <img
                                            src={`/api/v1/product/product-photo/${product._id}`}
                                            alt={product.name}
                                            className="img-fluid rounded-4 shadow-sm"
                                            style={{
                                                height: '500px',
                                                objectFit: 'contain',
                                                width: '100%',
                                            }}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-product.jpg';
                                            }}
                                        />

                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="col-md-6 p-4">
                                    <div className="h-100 d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="d-flex align-items-center mb-3">
                                                <span className="badge bg-warning text-dark me-2">
                                                    <FaStar className="me-1" />
                                                    4.8
                                                </span>
                                                <span className="text-muted">(128 reviews)</span>
                                            </div>

                                            <p className="fw-bold mb-3 display-5 text-gradient">{product.name}</p>

                                            <p className="lead text-muted mb-4 text-1">
                                                {product.description}
                                            </p>

                                            <div className="">
                                                <h5 className="d-flex align-items-center gap-2">
                                                    <FaTruck className="text-success" />
                                                    <span className="fw-bold">{product.shipping ? 'Free Shipping' : 'Shipping Calculated at Checkout'}</span>
                                                </h5>
                                                <small className="text-muted">Delivery within 3-5 business days</small>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <h4 className="fw-bold text-success mb-0 d-flex align-items-center gap-2">
                                                        <FaTag />
                                                        ${product.price.toFixed(2)}
                                                    </h4>
                                                    <small className="text-muted">Incl. VAT + Shipping</small>
                                                </div>
                                                <span className="badge bg-info fs-6">
                                                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>

                                            <div className="d-flex gap-3">

                                                <button
                                                    className="btn btn-primary btn-md flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                                    onClick={() => {
                                                        setCart([...cart, product]);
                                                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                    }}
                                                >
                                                    <FaShoppingCart size={20} />
                                                    Add to Cart
                                                </button>
                                                <button
                                                    className=" btn btn1 btn-success btn-md flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                                    // onClick={() => {
                                                    //     setCart([...cart, product]);
                                                    //     localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                                    // }}
                                                >
                                                    <FaCreditCard size={20} />
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Products */}
                        <div className="mb-5">
                            <h3 className="fw-bold mb-4 text-gradient">You Might Also Like</h3>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {relatedProducts.map((p) => (
                                    <div className="col" key={p._id}>
                                        <div className="card h-100 shadow-md border-1 hover-scale position-relative">
                                            <div className="position-absolute top-0 end-0 m-3">
                                                <button className="btn btn-danger btn-sm rounded-circle">
                                                    <FaHeart size={16} />
                                                </button>
                                            </div>
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                alt={p.name}
                                                className="card-img-top imagess"
                                               
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold text-dark mb-3">{p.name}</h5>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <span className="h5 text-success mb-0">
                                                        ${p.price.toFixed(2)}
                                                    </span>
                                                    <span className="badge bg-warning text-dark">
                                                        <FaStar className="me-1" />
                                                        4.5
                                                    </span>
                                                </div>
                                                <div className="d-flex justify-content-between gap-2">
                                                    <button
                                                        className="btn btn-outline-primary"
                                                        onClick={() => navigate(`/product/${p.slug}`)}
                                                    >
                                                        View Details
                                                    </button>
                                                    <button className=" btn btn1 btn-success"
                                                    onClick={()=>{
                                                        setCart([...cart,p]);
                                                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                                    }}>
                                                        <FaShoppingCart className="me-2" />
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                        .btn1{
                         background: linear-gradient(45deg,rgb(26, 36, 54),rgb(2, 72, 107));

                        }
                        .imagess{
                        padding:10px;
                        border-radius:15px
                        }
                        .text-gradient {
                            background: linear-gradient(45deg, #2c3e50, #3498db);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            font-size: 2rem;
                        }
                        
                        .hover-scale {
                            transition: all 0.3s ease;
                            cursor: pointer;
                        }
                        
                        .hover-scale:hover {
                            transform: translateY(-1px);
                            box-shadow: 0 0.1rem 0.01rem rgba(0.1, 0.1, 0.11, 1) !important;
                        }
                        
                        .card {
                            border-radius: 4px;
                            transition: all 0.3s ease;
                            box-shadow: 0 0.1rem 0.01rem rgba(0.1, 0.1, 0.11, 1) !important;

                        }
                        
                        .badge {
                            font-size: 0.9rem;
                            padding: 0.6em 1em;
                            border-radius: 0.75rem;
                        }
                        
                        .btn {
                         fontSize: '5px',
                          padding: '5px 10px'
                            border-radius: 5px;
                            transition: all 0.5s ease;
                        }
                        
                        .btn:hover {
                            transform: translateY(-1px);
                        }
                            .lead {
                                 font-size: 1rem;
                                font-weight: 400;
                            }
                    `}</style>
        </Layout>

    );
};

export default ProductDetails;
