import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { Price } from '../components/Prices';
import { Checkbox, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';
import { FiFilter, FiDollarSign, FiTag } from 'react-icons/fi';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import toast from 'react-hot-toast';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data?.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data.category || []);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', {
                checked,
                radio
            });
            setProducts(data?.products || []);
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        }
    };

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) {
            filterProduct();
        } else {
            getAllProducts();
        };
        // eslint-disable-next-line
    }, [checked, radio]);

    const handleFilter = (value, id) => {
        const updatedChecked = value ?
            [...checked, id] :
            checked.filter(c => c !== id);
        setChecked(updatedChecked);
    };

    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginatedProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleNextPage = () => {
        currentPage < totalPages && setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        currentPage > 1 && setCurrentPage(currentPage - 1);
    };

    const resetFilters = () => {
        setChecked([]);
        setRadio([]);
    };

    // Inside the HomePage component, add this state
    const [currentSlide, setCurrentSlide] = useState(0);

    // Add this useEffect for auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const sliderImages = [
        'https://source.unsplash.com/1920x400/?shopping',
        'https://source.unsplash.com/1920x400/?fashion',
        'https://source.unsplash.com/1920x400/?electronics'
    ];

    return (
        <Layout title="Shop-Now">
            <div className="overflow-hidden bg-light">
                {/* Hero Slider - Responsive Adjustments */}
                <div className="hero-slider position-relative">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{ delay: 5000 }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        loop
                    >
                        {sliderImages.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div 
                                    className="hero-slide position-relative" 
                                    style={{ 
                                        height: 'clamp(250px, 50vh, 400px)',
                                        background: `url(${img}) center/cover`,
                                    }}
                                >
                                    <div className="hero-overlay position-absolute w-100 h-100 bg-dark opacity-50" />
                                    <div className="position-relative d-flex align-items-center h-100 text-center text-white">
                                        <div className="container px-3">
                                            <h1 className="display-4 fw-bold mb-3 mb-md-4 animate__animated animate__fadeIn">
                                                Discover Amazing Products
                                            </h1>
                                            <p className="lead mb-3 mb-md-4 fs-5">
                                                Explore our curated collection of premium items at unbeatable prices
                                            </p>
                                            <button
                                                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                                                className="btn btn-light btn-lg rounded-pill px-4 shadow-lg"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='containeraaa'>

                    {/* Filters & Products Section */}
                    <div className="container-fluid px-3 my-5" id="products">
                        <div className="row g-3">
                            {/* Filters Sidebar */}
                            <div className="col-lg-3">
                                <div className="card shadow-sm mb-4">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between gap-2 mb-2 mt-2">
                                            <div className='d-flex align-items-center gap-2'>
                                                <FiFilter className="fs-4" />
                                                <h3 className="mb-0">Filters</h3>
                                            </div>
                                            <button
                                                onClick={resetFilters}
                                                className="btn btn-outline-danger  "
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                        <div className='border border-1 mb-3'></div>

                                        {/* Category Filter */}
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <FiTag className="fs-5" />
                                                <h4 className="mb-0">Categories</h4>
                                            </div>
                                            {categories.length > 0 ? (
                                                <div className="d-flex flex-column gap-2">
                                                    {categories.map(c => (
                                                        <Checkbox
                                                            key={c._id}
                                                            onChange={e => handleFilter(e.target.checked, c._id)}
                                                            checked={checked.includes(c._id)}
                                                        >
                                                            {c.name}
                                                        </Checkbox>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted small">Loading categories...</p>
                                            )}
                                        </div>

                                        {/* Price Filter */}
                                        <div>
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <FiDollarSign className="fs-5" />
                                                <h4 className="mb-0">Price Range</h4>
                                            </div>
                                            <div className='border border-1 mb-3'></div>
                                            {Price?.length > 0 ? (
                                                <Radio.Group
                                                    onChange={e => setRadio(e.target.value)}
                                                    value={radio}
                                                    className="d-flex flex-column gap-2"
                                                >
                                                    {Price.map((p) => (
                                                        <Radio
                                                            key={p._id}
                                                            value={p.array}
                                                        >
                                                            {p.name}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            ) : (
                                                <p className="text-muted small">No price ranges available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="col-lg-9">
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                    {paginatedProducts.map((product) => (
                                        <div className="col" key={product._id}>
                                            <div className="card h-100 shadow-sm">
                                                <img
                                                    src={`/api/v1/product/product-photo/${product._id}`}
                                                    alt={product.name}
                                                    className="card-img-top object-fit-cover images"
                                                    style={{ height: '250px' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title fw-bold">{product.name}</h5>
                                                    <p className="card-text text-muted small line-clamp-2">
                                                        {product.description?.length > 70 ?
                                                            `${product.description.substring(0, 70)}...` :
                                                            product.description}
                                                    </p>
                                                </div>
                                                <div className="card-footer bg-transparent">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <button
                                                            onClick={() => navigate(`/product/${product.slug}`)}
                                                            className="btn btn-link text-decoration-none"
                                                        >
                                                            Details
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const newCart = [...cart, product];
                                                                setCart(newCart);
                                                                localStorage.setItem('cart', JSON.stringify(newCart));
                                                                toast.success('Item added to cart');
                                                            }}
                                                            className="btn btn-color btn-sm text-white"
                                                        ><FaShoppingCart className="me-2" />
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {products.length > 0 && (
                                    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className="btn btn-link text-decoration-none"
                                        >
                                            <BsArrowLeftCircle className="fs-4" />
                                        </button>
                                        <span className="fw-medium">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className="btn btn-link text-decoration-none"
                                        >
                                            <BsArrowRightCircle className="fs-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-light py-5">
                        <div className="container">
                            <h2 className="text-center mb-5 fw-bold">Why Choose Us</h2>
                            <div className="row g-4">
                                {[
                                    {
                                        id: 1,
                                        icon: '🚚',
                                        title: 'Fast Shipping',
                                        text: 'Free next-day delivery on all orders over $50'
                                    },
                                    {
                                        id: 2,
                                        icon: '🔒',
                                        title: 'Secure Payments',
                                        text: '256-bit SSL encryption for safe transactions'
                                    },
                                    {
                                        id: 3,
                                        icon: '💬',
                                        title: '24/7 Support',
                                        text: 'Dedicated customer support team always ready'
                                    }
                                ].map((feature) => (
                                    <div className="col-md-4" key={feature.id}>
                                        <div className="card h-100 shadow-sm">
                                            <div className="card-body text-center">
                                                <div className="fs-1 mb-3">{feature.icon}</div>
                                                <h3 className="h5 fw-bold mb-3">{feature.title}</h3>
                                                <p className="text-muted small mb-0">{feature.text}</p>
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

                .btn-color{
                background: linear-gradient(45deg,rgb(26, 36, 54),rgb(2, 72, 107));
                }

                .transition-opacity {
                transition: opacity 0.5s ease-in-out;
                }

                .hero-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                z-index: 2;
                }
            .images{
                 padding:12px;
                 border-radius: 18px;
            }
                 .containeraaa{
                 padding:0 !important;
                 width:100% !important;
                 }
      `}</style>
        </Layout>
    );
};

export default HomePage;