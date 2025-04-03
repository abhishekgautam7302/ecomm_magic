import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section bg-dark text-white pt-5">
            <div className="container">
                <div className="row g-5">
                    {/* Company Info */}
                    <div className="col-md-4">
                        <h3 className="text-primary mb-4">Abhshek</h3>
                        <p>Discover the world's most amazing destinations with our expert travel guidance.</p>
                        <div className="social-icons mt-4">
                            <a href="https://facebook.com" className="text-white me-3" aria-label="Facebook">
                                <i className="fab fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://twitter.com" className="text-white me-3" aria-label="Twitter">
                                <i className="fab fa-twitter fa-lg"></i>
                            </a>
                            <a href="https://instagram.com" className="text-white me-3" aria-label="Instagram">
                                <i className="fab fa-instagram fa-lg"></i>
                            </a>
                            <a href="https://linkedin.com" className="text-white" aria-label="LinkedIn">
                                <i className="fab fa-linkedin fa-lg"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2">
                        <h5 className="mb-4">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <NavLink to="/about" className="text-white text-decoration-none">About Us</NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/services" className="text-white text-decoration-none">Services</NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/destinations" className="text-white text-decoration-none">Destinations</NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/blog" className="text-white text-decoration-none">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="text-white text-decoration-none">Contact</NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-3">
                        <h5 className="mb-4">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                                Greater Noida 
                            </li>
                            <li className="mb-3">
                                <i className="fas fa-phone me-2 text-primary"></i>
                                <a href="tel:+12345678901" className="text-white text-decoration-none">+91 7309851526</a>
                            </li>
                            <li className="mb-3">
                                <i className="fas fa-envelope me-2 text-primary"></i>
                                <a href="mailto:info@travelworld.com" className="text-white text-decoration-none">abhishekgautam730249@gmail.com</a>
                            </li>
                            <li>
                                <i className="fas fa-clock me-2 text-primary"></i>
                                Mon-Sat: 9AM - 6PM
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-md-3">
                        <h5 className="mb-4">Newsletter</h5>
                        <p className="text-muted">Best for Shopping</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your email" 
                                    aria-label="Email address"
                                />
                                <button className="btn btn-primary" type="submit">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                        <div className="payment-methods mt-4">
                            <h6>We Accept:</h6>
                            <div className="d-flex gap-2 mt-2">
                                <i className="fab fa-cc-visa fa-2x text-muted" aria-label="Visa"></i>
                                <i className="fab fa-cc-mastercard fa-2x text-muted" aria-label="Mastercard"></i>
                                <i className="fab fa-cc-paypal fa-2x text-muted" aria-label="PayPal"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-top mt-5 pt-4">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="text-muted">&copy; {currentYear} Abhishek. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <NavLink to="/privacy" className="text-decoration-none text-muted">Privacy Policy</NavLink>
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to="/terms" className="text-decoration-none text-muted">Terms of Service</NavLink>
                                </li>
                                <li className="list-inline-item">
                                    <NavLink to="/cookies" className="text-decoration-none text-muted">Cookie Policy</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-section {
                    background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
                                url('../../assets/altantis.jpg') center/cover;
                    position: relative;
                }
            
                .footer-section h5 {
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 0.5rem;
                    margin-bottom: 1.5rem;
                }
            
                .footer-section ul li a {
                    transition: all 0.3s ease;
                }
            
                .footer-section ul li a:hover {
                    color: #3498db !important;
                    padding-left: 5px;
                }
            
                .social-icons a {
                    width: 40px;
                    height: 40px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.1);
                }
            
                .social-icons a:hover {
                    background: #3498db;
                    transform: translateY(-3px);
                }
            
                .newsletter-form .form-control {
                    border-radius: 30px 0 0 30px;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }
            
                .newsletter-form .btn {
                    border-radius: 0 30px 30px 0;
                    padding: 0 20px;
                }
            
                .payment-methods i {
                    transition: transform 0.3s ease;
                }
            
                .payment-methods i:hover {
                    transform: translateY(-3px);
                    cursor: pointer;
                }
            `}</style>
        </footer>
    );
};

export default Footer;