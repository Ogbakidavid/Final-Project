import React, { useContext } from 'react';
import { Menu, X, Home, FileText, Briefcase, LogOut } from 'lucide-react';
import { AuthContext } from '../auth/AuthContext';

const Sidebar = ({ activeSection, setActiveSection, isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useContext(AuthContext);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: FileText },
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-black text-white w-64 transform transition-transform duration-200 ease-in-out z-50 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                  activeSection === item.id ? 'bg-gray-800 border-r-4 border-blue-500' : ''
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;