import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Card, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios';

const MainPage = () => {

    const [services, setServices] = useState([]);

    const getAllServices = async () => {
        try {
            const res = await axios.get('/api/v1/services/get-services')
            if (res.data.success) {
                setServices(res.data.servicesWithUrls);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllServices();
        const handleScroll = () => {
            const elements = document.querySelectorAll('.scroll-animate');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    el.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="homepage mainbody overflow-x-hidden">
            {/* Enhanced Mega Navigation */}
            <Navbar expand="lg" className="fixed-top py-3 mega-nav" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white fs-2 fw-bold">
                        <span className="gradient-text">FinTech Pro</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        className="bg-dark-2"
                    >
                        <Offcanvas.Header closeButton className="text-white">
                            <Offcanvas.Title id="offcanvasNavbarLabel">FinTech Pro</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="mx-auto align-items-lg-center">
                                <Nav.Link href="#solutions" className="text-white mx-lg-3 nav-link-expand py-2 py-lg-0">
                                    Solutions
                                </Nav.Link>
                                <Nav.Link href="#developers" className="text-white mx-lg-3 nav-link-expand py-2 py-lg-0">
                                    Developers
                                </Nav.Link>
                                <Nav.Link href="#company" className="text-white mx-lg-3 nav-link-expand py-2 py-lg-0">
                                    Company
                                </Nav.Link>
                            </Nav>

                            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-4 mt-lg-0">
                                <Button variant="outline-light" className="rounded-pill px-4 py-2 w-100 w-lg-auto">
                                    Sign In
                                </Button>
                                <Button variant="gradient-primary" className="rounded-pill px-4 py-2 w-100 w-lg-auto">
                                    Get Started
                                </Button>
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            {/* Enhanced Hero Section */}
            <section className="fullscreen-hero vh-100 d-flex align-items-center position-relative">
                <div className="hero-bg-animation"></div>
                <Container className="position-relative">
                    <Row className="align-items-center g-5">
                        <Col xl={6} className="scroll-animate slide-up text-center text-xl-start">
                            <h1 className="display-3 display-xxl-1 fw-bold text-white mb-4">
                                Revolutionizing
                                <span className="gradient-text d-inline-block"> Digital Payments</span>
                            </h1>
                            <p className="lead text-white-50 mb-5 fs-4 fs-lg-3">
                                {
                                    services.map((ser) => (
                                            <div key={ser._id}>
                                                <h2>{ser.name}</h2>
                                                <img src={ser.photos} alt="" height={40} />
                                            </div>
                            ))
                                }
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-xl-start">
                                <Button variant="light" size="lg" className="rounded-pill px-5 py-3 shadow-lg">
                                    Start Free Trial
                                </Button>
                                <Button variant="outline-light" size="lg" className="rounded-pill px-5 py-3 hover-scale">
                                    Watch Demo
                                </Button>
                            </div>
                        </Col>
                        <Col xl={6} className="scroll-animate float-in mt-5 mt-xl-0">
                            <div className="hero-visual position-relative">
                                <div className="floating-card card-analytics">
                                    <div className="card-inner-content"></div>
                                </div>
                                <div className="floating-card card-dashboard">
                                    <div className="card-inner-content"></div>
                                </div>
                                <div className="floating-card card-payment">
                                    <div className="card-inner-content"></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Enhanced Features Section */}
            <section className="py-6 bg-dark-2 position-relative">
                <Container>
                    <Row className="scroll-animate scale-in mb-5">
                        <Col className="text-center m-5">
                            <h2 className="display-4 fw-bold mb-3 gradient-text">Why Choose Us?</h2>
                            <p className="text-white-50 fs-5">Enterprise-grade solutions for modern businesses</p>
                        </Col>
                    </Row>

                    <Row className="g-4 g-lg-5 mb-5">
                        {['Global Payments', 'Smart Routing', 'Fraud Detection', 'API First'].map((feature, i) => (
                            <Col xl={3} lg={6} key={i} className="scroll-animate fade-in mb-5">
                                <div className="feature-mega-card h-100">
                                    <div className="feature-icon bg-gradient d-flex align-items-center justify-content-center">
                                        <i className={`bi bi-${['globe', 'diagram-3', 'shield-lock', 'cpu'][i]} fs-3 text-white`}></i>
                                    </div>
                                    <h3 className="text-white fs-3 fw-bold mt-4">{feature}</h3>
                                    <p className="text-white-50 fs-5 mb-4">Advanced technology for seamless transactions</p>
                                    <div className="feature-line bg-gradient"></div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Enhanced Interactive Demo Section */}
            <section className="py-6 bg-dark-3">
                <Container>
                    <Row className="g-5 align-items-center ">
                        <Col lg={6} className="scroll-animate slide-left order-lg-1 order-2 ">
                            <div className="demo-visual position-relative mt-5 mb-5">
                                <div className="demo-card demo-main shadow-lg">
                                    <div className="card-screen"></div>
                                </div>
                                <div className="demo-card demo-secondary"></div>
                                <div className="demo-card demo-tertiary"></div>
                            </div>
                        </Col>
                        <Col lg={6} className="scroll-animate slide-right order-lg-2 order-1 mb-5 mb-lg-0">
                            <h2 className="display-4 fw-bold text-white mb-4">
                                Intelligent <span className="gradient-text">Dashboard</span>
                            </h2>
                            <p className="text-white-50 fs-5 mb-5">
                                Real-time analytics and complete financial control in one powerful interface
                            </p>
                            <div className="d-flex gap-4 flex-wrap">
                                <Button variant="gradient-primary" size="lg" className="rounded-pill px-5 py-3 hover-scale">
                                    Try Live Demo
                                </Button>
                                <Button variant="outline-light" size="lg" className="rounded-pill px-5 py-3 hover-scale">
                                    View Features
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Enhanced Pricing Section */}
            <section className="py-6 bg-dark-4">
                <Container>
                    <Row className="scroll-animate fade-in-up mb-5">
                        <Col className="text-center mt-5">
                            <h2 className="display-4 fw-bold text-white mb-3">
                                Flexible <span className="gradient-text">Pricing</span>
                            </h2>
                            <p className="text-white-50 fs-5">Choose the perfect plan for your business needs</p>
                        </Col>
                    </Row>
                    <Row className="g-4 justify-content-center ">
                        {['Starter', 'Professional', 'Enterprise'].map((plan, i) => (
                            <Col xxl={3} lg={4} md={8} key={i} className="scroll-animate scale-in mb-5 ">
                                <div className={`pricing-card ${i === 1 ? 'popular-plan' : ''} h-100`}>
                                    <div className="pricing-header ">
                                        {i === 1 && <div className="popular-badge">Most Popular</div>}
                                        <h3 className="text-white fs-2 fw-bold">{plan}</h3>
                                        <div className="price-wrapper my-4">
                                            <span className="price-currency">$</span>
                                            <span className="price-amount">{[29, 99, 299][i]}</span>
                                            <span className="price-period">/mo</span>
                                        </div>
                                    </div>
                                    <ul className="pricing-features list-unstyled">
                                        {['Basic Analytics', '100 Transactions', '24/7 Support', 'API Access'].map((feature, j) => (
                                            <li key={j} className="d-flex gap-2 mb-3">
                                                <i className="bi bi-check2-circle text-success fs-5"></i>
                                                <span className="text-white-50">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant={i === 1 ? "light" : "gradient-primary"} className="w-100 rounded-pill py-3 mt-auto hover-scale">
                                        Get Started
                                    </Button>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Enhanced Testimonial Section */}
            <section className="py-6 ">
                <Container>
                    <Row className="scroll-animate slide-up mb-3">
                        <Col className="text-center mt-5">
                            <h2 className="display-4 fw-bold text-white mb-3">
                                What Our <span className="gradient-text">Clients Say</span>
                            </h2>
                        </Col>
                    </Row>
                    <Row className="g-4 mt-5 mb-5">
                        {[1, 2, 3].map((testimonial, i) => (
                            <Col lg={4} key={i} className="scroll-animate fade-in-left mb-5">
                                <div className="testimonial-card h-100 ">
                                    <div className="testimonial-rating mb-3">
                                        {[...Array(5)].map((_, j) => (
                                            <i key={j} className="bi bi-star-fill text-warning"></i>
                                        ))}
                                    </div>
                                    <p className="testimonial-text fs-5 text-white-50 mb-4">
                                        "This platform transformed our payment processing. Incredible efficiency and support!"
                                    </p>
                                    <div className="testimonial-author">
                                        <div className="author-image"></div>
                                        <div className="author-info">
                                            <h5 className="text-white mb-0">John Smith</h5>
                                            <small className="text-white-50">CEO, Tech Corp</small>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Animated Feature Grid Section */}
            <section className="py-6 bg-dark-5">
                <Container>
                    <Row className="scroll-animate fade-in-up mb-5">
                        <Col className="text-center mt-5">
                            <h2 className="display-4 fw-bold text-white mb-3">
                                Powerful <span className="gradient-text">Features</span>
                            </h2>
                        </Col>
                    </Row>
                    <Row className="g-4 ">
                        {['Real-time Analytics', 'Multi-currency Support', 'Fraud Detection', 'Smart Invoicing'].map((feature, i) => (
                            <Col md={6} lg={3} key={i} className="scroll-animate pop-in mb-5">
                                <div className="feature-grid-card">
                                    <div className="feature-icon-wrapper">
                                        <i className="bi bi-graph-up-arrow fs-1 gradient-text"></i>
                                    </div>
                                    <h5 className="text-white mt-3">{feature}</h5>
                                    <p className="text-white-50">Lorem ipsum dolor sit amet consectetur</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Animated Timeline Section */}
            <section className="py-6 bg-dark-6">
                <Container>
                    <Row className="scroll-animate slide-up mb-5">
                        <Col className="text-center mt-5">
                            <h2 className="display-4 fw-bold text-white mb-3">
                                Our <span className="gradient-text">Journey</span>
                            </h2>
                        </Col>
                    </Row>
                    <div className="timeline-wrapper">
                        {[2015, 2018, 2020, 2023].map((year, i) => (
                            <div key={i} className="timeline-item scroll-animate fade-in-right mb-5">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4 className="text-white">{year}</h4>
                                    <p className="text-white-50">Major platform milestone achieved</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Animated Stats Grid */}
            <section className="bg-gradient">
                <Container>
                    <Row className="g-5 text-center  mb-5">
                        <Col md={4} className="scroll-animate pop-in">
                            <div className="stat-mega">
                                <h3 className="display-1 fw-bold text-white">99.9%</h3>
                                <p className="text-white-50 fs-5">Uptime Guarantee</p>
                            </div>
                        </Col>
                        <Col md={4} className="scroll-animate pop-in">
                            <div className="stat-mega">
                                <h3 className="display-1 fw-bold text-white">5B+</h3>
                                <p className="text-white-50 fs-5">Transactions</p>
                            </div>
                        </Col>
                        <Col md={4} className="scroll-animate pop-in">
                            <div className="stat-mega">
                                <h3 className="display-1 fw-bold text-white">150+</h3>
                                <p className="text-white-50 fs-5">Countries Supported</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Animated Brand Wall */}
            <section className="py-6 bg-dark-3">
                <Container fluid>
                    <Row className="scroll-animate fade-in mt-5">
                        <Col className="text-center mb-3 mt-5">
                            <p className="text-white-50 text-uppercase fs-5">Trusted by industry leaders</p>
                        </Col>
                    </Row>

                    <Row className="g-0 align-items-center brand-slider-container overflow-hidden mb-5">
                        <div className="brand-slider-track">
                            {[...Array(2)].map((_, loopIndex) => (
                                // Double the array to create seamless loop
                                [...['Microsoft', 'Google', 'Amazon', 'Netflix', 'Spotify', 'Uber']].map((brand, i) => (
                                    <div key={`${loopIndex}-${i}`} className="brand-slider-item ">
                                        <div className="brand-mega-card">
                                            <span className="brand-logo">{brand}</span>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>
                    </Row>
                </Container>
            </section>

            {/* Enhanced Footer */}
            <footer className="bg-black py-6">
                <Container fluid>
                    <Row className="g-5 ">
                        <Col xl={3} lg={4} className="mb-5 mb-lg-0">
                            <h4 className="gradient-text fs-3  mt-5 mb-4">FinTech Pro</h4>
                            <p className="text-white-50 fs-5">Redefining financial infrastructure</p>
                            <div className="d-flex gap-3 mt-4">
                                {['twitter', 'linkedin', 'github', 'facebook'].map((icon, i) => (
                                    <Button
                                        key={i}
                                        variant="outline-light"
                                        className="rounded-circle social-icon hover-scale"
                                    >
                                        <i className={`bi bi-${icon}`}></i>
                                    </Button>
                                ))}
                            </div>
                        </Col>
                        <Col xl={9} lg={8}>
                            <Row className="g-5">
                                {['Product', 'Developers', 'Company', 'Resources'].map((section, i) => (
                                    <Col md={3} key={i}>
                                        <h5 className="text-white mb-4">{section}</h5>
                                        <ul className="list-unstyled">
                                            {[1, 2, 3, 4].map((item, j) => (
                                                <li key={j} className="mb-3">
                                                    <a href="#" className="text-white-50 hover-gradient fs-5 text-decoration-none">
                                                        Link {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-6">
                        <Col className="text-center">
                            <p className="text-white-50 mb-0">&copy; 2024 FinTech Pro. All rights reserved</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default MainPage;