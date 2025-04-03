import axios from 'axios';
import React, { useState, useEffect, useContext, createContext } from 'react';

// Create a Context for Auth
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    axios.defaults.headers.common['Authorization']=auth?.token

    // Load auth data from localStorage on mount
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({
                user: parsedData.user,
                token: parsedData.token,
            });
        }
       
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
