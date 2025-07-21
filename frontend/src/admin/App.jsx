import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { AuthProvider } from './auth/AuthContext';
import AdminApp from './AdminApp';
import Register from './auth/Register';
import Login from './auth/Login';

export default function AdminLayout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<AdminApp />} />
        </Routes>
      </AuthProvider>
    </ToastProvider>
  );
}