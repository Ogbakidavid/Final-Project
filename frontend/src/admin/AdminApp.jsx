import React, { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import Login from './auth/Login';
import Dashboard from './Dashboard';

export default function AdminApp() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
}