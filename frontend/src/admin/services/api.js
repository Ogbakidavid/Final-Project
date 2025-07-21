export const API_BASE = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};