import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: Fetch user profile if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Set default authorization header for the initial request
          // (Our interceptor should handle this, but being explicit doesn't hurt)
          const response = await api.get('/user');
          setUser(response.data.data);
        } catch (error) {
          console.error("Authentication check failed:", error);
          // If the token is invalid, clear it
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  // Login method
  const login = async (credentials) => {
    try {
      // Laravel Sanctum usually returns { token, user } or just token
      const response = await api.post('/login', credentials);
      const { token: newToken, user: userData } = response.data.data;

      sessionStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Identifiants invalides",
        errors: error.response?.data?.errors // Laravel validation errors
      };
    }
  };

  // Register method
  const register = async (data) => {
    try {
      // Map name to nom for Laravel backend
      const payload = { 
        nom: data.name,
        email: data.email,
        password: data.password 
      };

      const response = await api.post('/register', payload);
      const { token: newToken, user: userData } = response.data.data;

      sessionStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erreur lors de l'inscription",
        errors: error.response?.data?.errors
      };
    }
  };

  // Logout method
  const logout = async () => {
    try {
      // Optional: notify backend
      await api.post('/logout').catch(() => {}); 
    } finally {
      sessionStorage.removeItem('token');
      setToken(null);
      setUser(null);
      // Optional: window.location.href = '/login'; 
      // But we'll handle this via navigation in App.jsx or App state
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
