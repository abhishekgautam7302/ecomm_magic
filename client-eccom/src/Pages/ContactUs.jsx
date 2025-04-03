import React from 'react';
import Layout from '../components/Layout/Layout';
import './ContactUs.css';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
    };

    return (
        <Layout title="Contact Us">
            <div>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="container text-center text-white">
                        <h1 className="hero-title">Get in Touch</h1>
                        <p className="lead mt-3">We're here to help and answer any questions you might have</p>
                    </div>
                </section>
                {/* Contact Content */}
                <div className="container contact-container">
                    <div className="contact-box">
                        <div className="row g-0">
                            {/* Left Side */}
                            <div className="col-lg-5 contact-left">
                                <div className="contact-info-wrapper p-4">
                                    <h3 className="text-white mb-4">Contact Information</h3>
                                    <div className="contact-info-item p-3 mb-3 rounded">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary p-2 rounded-circle me-3">
                                                <i className="fas fa-phone text-white" />
                                            </div>
                                            <div>
                                                <h5 className="text-white mb-0">Phone</h5>
                                                <p className="text-muted mb-0">+1 234 567 890</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-info-item p-3 mb-3 rounded">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary p-2 rounded-circle me-3">
                                                <i className="fas fa-envelope text-white" />
                                            </div>
                                            <div>
                                                <h5 className="text-white mb-0">Email</h5>
                                                <p className="text-muted mb-0">contact@example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-info-item p-3 mb-4 rounded">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary p-2 rounded-circle me-3">
                                                <i className="fas fa-map-marker-alt text-white" />
                                            </div>
                                            <div>
                                                <h5 className="text-white mb-0">Address</h5>
                                                <p className="text-muted mb-0">123 Business Street, New York, USA</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="text-white mb-3">Follow Us</h5>
                                    <div className="social-links">
                                        <a href="#" className="social-link"><i className="fab fa-facebook-f text-white" /></a>
                                        <a href="#" className="social-link"><i className="fab fa-twitter text-white" /></a>
                                        <a href="#" className="social-link"><i className="fab fa-linkedin-in text-white" /></a>
                                        <a href="#" className="social-link"><i className="fab fa-instagram text-white" /></a>
                                    </div>
                                </div>
                            </div>
                            {/* Right Side */}
                            <div className="col-lg-7 contact-right">
                                <div className="p-4">
                                    <h3 className="mb-4">Send Us a Message</h3>
                                    <form>
                                        <div className='d-flex gap-3'>
                                            <div className="form-floating mb-4 widthss">
                                                <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                                <label htmlFor="name" className="floating-label">Your Name</label>
                                            </div>
                                            <div className="form-floating mb-4 widthss">
                                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                                <label htmlFor="email" className="floating-label">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                            <label htmlFor="subject" className="floating-label">Subject</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <textarea className="form-control" id="message" placeholder="Your Message" style={{ height: 120 }} defaultValue={""} />
                                            <label htmlFor="message" className="floating-label">Your Message</label>
                                        </div>
                                        <div className="text-end">
                                            <button type="submit" className="submit-btn">
                                                Send Message <i className="fas fa-paper-plane ms-2" />
                                            </button>
                                        </div>
                                    </form>
                                    <div className="map-container mt-5">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.259865825!3d40.69714941974409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1717012684471!5m2!1sen!2suk" width="100%" height={250} style={{ border: 0 }} allowFullScreen loading="lazy" className="rounded">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;