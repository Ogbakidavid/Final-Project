import { createContext, useState, useEffect } from 'react';
import { apiRequest } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (username, password) => {
    const data = await apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};