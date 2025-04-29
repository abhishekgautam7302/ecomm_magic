import React from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../Context/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth';
import { FaTrash, FaShoppingBag, FaMapMarkerAlt, FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [cart, setCart] = useCart();

    // Add quantity update function
    const updateQuantity = (pid, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedCart = cart.map(item => 
            item._id === pid ? { ...item, quantity: newQuantity } : item
        );
        
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeCartItem = (pid) => {
        try {
            const updatedCart = cart.filter(item => item._id !== pid);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove item');
        }
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const formattedTotal = totalPrice.toFixed(2);

    const checkoutHandler = async () => {
        try {
            if (!auth?.user?.address) {
                toast.error('Please add delivery address');
                return navigate('/dashboard/user/profile');
            }

            const { data: { key } } = await axios.get('/api/v1/payment/getKey');
            const { data: { order } } = await axios.post('/api/v1/payment/createOrder', {
                amount: totalPrice*100 // Convert to paise
            });

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Your Store Name",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const { data } = await axios.post('/api/v1/payment/verifyPayment', {
                            ...response,
                            products: cart.map(item => ({
                                product: item._id,
                                quantity: item.quantity
                            })),
                            total: totalPrice,
                            address: auth.user.address
                        });

                        if (data.success) {
                            toast.success('Payment Successful');
                            setCart([]);
                            localStorage.removeItem('cart');
                            navigate('/dashboard/user/orders');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: auth.user.name,
                    email: auth.user.email,
                    contact: auth.user.phone || '0000000000'
                },
                theme: { color: '#F37254' }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error(error.response?.data?.message || 'Payment initialization failed');
        }
    };

    return (
        <Layout>
            <div className="container-fluid px-lg-5 my-5">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h1 className="display-5 fw-bold mb-3">
                            <FaShoppingBag className="me-3 text-primary" />
                            {`Hello ${auth?.token ? auth.user?.name : ''}, Your Cart`}
                        </h1>
                        <div className="lead">
                            {cart.length > 0 ? (
                                <span className="text-muted">
                                    {`${cart.length} item${cart.length > 1 ? 's' : ''} in your cart `}
                                    {!auth?.token && <span className="text-warning">(Login to checkout)</span>}
                                </span>
                            ) : (
                                <div className="empty-cart-message">
                                    <h2 className="text-muted mb-4">Your cart feels lonely...</h2>
                                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {cart.length > 0 && (
                    <div className="row g-4">
                        <div className="col-lg-8">
                            {cart.map((product) => (
                                <div className="card shadow-sm mb-4 border-1" key={product._id}>
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex align-items-center p-3 bg-light">
                                            <img
                                                src={`/api/v1/product/product-photo/${product._id}`}
                                                alt={product.name}
                                                className="img-fluid rounded-3"
                                                style={{ maxHeight: '200px', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <h4 className="card-title fw-bold mb-3">{product.name}</h4>
                                                        <p className="text-muted mb-2">₹{product.price.toFixed(2)}</p>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="quantity-controls d-flex align-items-center">
                                                                <button
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                                >
                                                                    <FaMinus />
                                                                </button>
                                                                <span className="mx-3">{product.quantity}</span>
                                                                <button
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                                >
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn btn-link text-danger p-0"
                                                        onClick={() => removeCartItem(product._id)}
                                                    >
                                                        <FaTrash size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-4">
                            <div className="card shadow-sm border-1 sticky-top" style={{ top: '1rem' }}>
                                <div className="card-header bg-gradient-primary text-white py-3">
                                    <h3 className="mb-0">Order Summary</h3>
                                </div>
                                <div className="card-body p-4">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <span>Total Items:</span>
                                            <span className="fw-medium">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-4">
                                            <span>Total Price:</span>
                                            <span className="fw-bold text-primary">₹{formattedTotal}</span>
                                        </div>
                                        <hr className="my-4" />

                                        <div className="address-section bg-light rounded p-3">
                                            <h6 className="d-flex align-items-center gap-2 mb-3">
                                                <FaMapMarkerAlt className="text-secondary" />
                                                Delivery Address
                                            </h6>
                                            {auth?.user?.address ? (
                                                <p className="text-muted small mb-0">{auth.user.address}</p>
                                            ) : (
                                                <p className="text-danger small mb-0">No address provided</p>
                                            )}
                                            <button
                                                className="btn btn-outline-primary w-100 mt-3"
                                                onClick={() => navigate(auth?.token ? '/dashboard/user/profile' : '/login', { state: "/cart" })}
                                            >
                                                {auth?.token ? 'Update Address' : 'Login to Checkout'}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg w-100 py-3"
                                        onClick={checkoutHandler}
                                        disabled={!auth?.user || cart.length === 0}
                                    >
                                        Proceed to Pay (₹{formattedTotal})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .quantity-controls button {
                    width: 38px;
                    height: 38px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card {
                    border-radius: 12px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                }

                .address-section {
                    border: 1px solid rgba(0,0,0,0.1);
                }

                .empty-cart-message {
                    padding: 4rem 0;
                    background: rgba(255,255,255,0.8);
                    border-radius: 12px;
                    backdrop-filter: blur(5px);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #0e1a25 0%, #0f2839 50%, #00305d 100%);
                    border: none;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #00305d 0%, #0f2839 100%);
                    transform: translateY(-1px);
                }

                .btn-primary:disabled {
                    opacity: 0.65;
                    transform: none;
                }
            `}</style>
        </Layout>
    );
};

export default CartPage;