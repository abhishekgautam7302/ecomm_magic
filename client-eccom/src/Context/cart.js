import { createContext, useContext, useState, useEffect } from "react";

// Create context with proper naming convention
const CartContext = createContext();

// Context provider component
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on initial mount
    useEffect(() => {
        const existingCart = localStorage.getItem('cart');
        if (existingCart) {
            try {
                setCart(JSON.parse(existingCart));
            } catch (error) {
                console.error('Error parsing cart data:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Persist cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook with proper naming convention
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };