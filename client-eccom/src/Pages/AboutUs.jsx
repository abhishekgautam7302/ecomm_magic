import React from 'react'
import Layout from '../components/Layout/Layout'
import firstImage from "../assets/Canada-Parliment-Building.jpg";
import secondImage from "../assets/BRAMHAPUTRA-RIVER-1.jpg";
import third from "../assets/Banff-River-forest.jpg";
import four from "../assets/Cape-Town.jpg";

const AboutUs = () => {
    return (
        <Layout title={'About-us'}>
            <div>
                <div className="hero">
                    <div className="container">
                        <h1>About Us</h1>
                        <p>Discover amazing features and create something wonderful with us.</p>
                    </div>
                </div>
                <div className="container py-5">
                    {/* Page Header */}


                    {/* Section 1: Mission */}
                    <div className="row align-items-center mb-5">
                        <div className="col-md-6">
                            <h3 className="display-5 font-weight-bold text-dark">Our Mission</h3>
                            <p className="text-muted">
                                At StudyNotion, we are passionate about transforming the way knowledge is shared and consumed. Our platform
                                allows students, educators, and content creators to collaborate and expand their learning horizons seamlessly.
                            </p>
                            <p className="text-muted">
                                We aim to bridge the gap between access to quality education and the innovative tools that make learning more
                                effective and engaging.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img
                                src={firstImage}
                                alt="Mission"
                                className="img-fluid rounded shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Section 2: Values */}
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h3 className="display-5 font-weight-bold text-dark">Our Core Values</h3>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow border-light mb-4">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Innovation</h5>
                                    <p className="card-text text-muted">
                                        We believe in pushing the boundaries of traditional learning by incorporating the latest tools and
                                        technology.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow border-light mb-4">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Collaboration</h5>
                                    <p className="card-text text-muted">
                                        We foster a community of learners, educators, and creators who work together to inspire each other and
                                        make learning a collective experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow border-light mb-4">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Accessibility</h5>
                                    <p className="card-text text-muted">
                                        We are dedicated to making educational content accessible to everyone, regardless of location or
                                        background.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Meet the Team */}

                    <div className="container py-5">
                        {/* <h2 className="text-center mb-5">Meet Our Team</h2> */}
                        <h3 className="display-5 font-weight-bold text-dark">Meet Our Team</h3>
                        <p className="text-muted">
                            Our team is a group of passionate educators, developers, and designers dedicated to creating a platform that
                            truly makes a difference in the world of education.
                        </p>
                        <p className="text-muted">
                            We bring together diverse talents and perspectives to continually innovate and evolve the learning
                            experience.
                        </p>
                        <div className="row g-4">
                            {/* Team Member 1 */}
                            <div className="col-lg-3 col-md-6">
                                <div className="card team-card">
                                    <img src={firstImage} className="card-img-top" alt="Team Member" />
                                    <div className="card-body text-center">
                                        <h5 className="team-card-title">John Doe</h5>
                                        <p className="team-card-content">John is a skilled frontend developer with 5 years of experience building responsive web apps.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Team Member 2 */}
                            <div className="col-lg-3 col-md-6">
                                <div className="card team-card">
                                    <img src={secondImage} className="card-img-top" alt="Team Member" />
                                    <div className="card-body text-center">
                                        <h5 className="team-card-title">Jane Smith</h5>
                                        <p className="team-card-content">Jane specializes in backend development, ensuring efficient server-side functionality.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Team Member 3 */}
                            <div className="col-lg-3 col-md-6">
                                <div className="card team-card">
                                    <img src={third} className="card-img-top" alt="Team Member" />
                                    <div className="card-body text-center">
                                        <h5 className="team-card-title">Mark Taylor</h5>
                                        <p className="team-card-content">Mark excels in UI/UX design, creating user-friendly and visually appealing interfaces.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Team Member 4 */}
                            <div className="col-lg-3 col-md-6">
                                <div className="card team-card">
                                    <img src={four} className="card-img-top" alt="Team Member" />
                                    <div className="card-body text-center">
                                        <h5 className="team-card-title">Emma Wilson</h5>
                                        <p className="team-card-content">Emma is a project manager who ensures smooth collaboration and timely delivery.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs