import React from 'react';
import Navbar from "../Layout/Navbar.jsx";
import Footer from "../Layout/Footer.jsx";
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div className="layout-container">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Navbar />
            <main className="main-content" style={{ minHeight: '74vh' }}>
                <Toaster 
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                    }}
                />
                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Ecommerce App - Shop Now",
    description: "Buy quality smartphones and electronics",
    keywords: "laptop, phone, iphone, electronics, mobile",
    author: "Abhishek Gautam"
};

export default Layout;