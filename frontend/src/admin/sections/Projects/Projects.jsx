import React, { useState, useEffect, useContext } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { ToastContext } from '../../components/Toast';
import ProjectForm from './ProjectForm';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { addToast } = useContext(ToastContext);

  const fetchProjects = async () => {
    try {
      const data = await apiRequest('/projects');
      setProjects(data.data || []);
    } catch (error) {
      addToast('Failed to fetch projects', 'error');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await apiRequest(`/projects/${id}`, { method: 'DELETE' });
      addToast('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

if (showForm) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl">
        <ProjectForm
          project={editingProject}
          onSave={handleFormSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      </div>
    </div>
  );
}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-gray-950 rounded-lg hover:bg-gray-950 hover:text-primary transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No projects found. Create your first project!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-2">{project.subTitle}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">{project.about}</p>
              
              <div className="flex justify-between items-center">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Project
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;