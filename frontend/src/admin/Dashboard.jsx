import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardSection from './sections/Dashboard';
import ProjectsSection from './sections/Projects/Projects';
import BlogsSection from './sections/Blogs/Blogs';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsSection />;
      case 'blogs':
        return <BlogsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-black shadow-md p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-xl font-semibold text-white capitalize">
              {activeSection}
            </h1>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">
                Welcome, Admin
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;