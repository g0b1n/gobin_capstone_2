import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context object
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap around the app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is logged in based on the presence of the user object
    const isLoggedIn = Boolean(user);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await fetch('http://localhost:5000/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${storedToken}`
                        }
                    });
                    const userData = await response.json();

                    if (response.ok) {
                        // Set user data in context
                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user data', userData);
                    }
                } catch (error) {
                    console.log("Could not fetch user data:", error);
                }
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
