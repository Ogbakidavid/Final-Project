import React, { useState, useEffect, useContext } from 'react';
import { Home, FileText, Briefcase, Plus } from 'lucide-react';
import { apiRequest } from '../services/api';
import { ToastContext } from '../components/Toast';

const DashboardSection = () => {
  const [stats, setStats] = useState({ projects: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);
  const { addToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsData, blogsData] = await Promise.all([
          apiRequest('/projects'),
          apiRequest('/blogs')
        ]);
        
        setStats({
          projects: projectsData.count || 0,
          blogs: blogsData.count || 0
        });
      } catch (error) {
        addToast('Failed to fetch dashboard stats', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary text-gray-950 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-950 text-sm uppercase tracking-wider">Total Projects</p>
              <p className="text-3xl font-bold mt-2">
                {loading ? '...' : stats.projects}
              </p>
            </div>
            <Briefcase size={40} className="text-gray-950" />
          </div>
        </div>

        <div className="bg-primary text-gray-950 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-950 text-sm uppercase tracking-wider">Total Blogs</p>
              <p className="text-3xl font-bold mt-2">
                {loading ? '...' : stats.blogs}
              </p>
            </div>
            <FileText size={40} className="text-gray-950" />
          </div>
        </div>

        <div className="bg-primary text-gray-950 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-950 text-sm uppercase tracking-wider">Total Content</p>
              <p className="text-3xl font-bold mt-2">
                {loading ? '...' : stats.projects + stats.blogs}
              </p>
            </div>
            <Home size={40} className="text-gray-950" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-primary text-gray-950 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm text-gray-900">
            <p>• Dashboard loaded successfully</p>
            <p>• Content management system active</p>
            <p>• All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;