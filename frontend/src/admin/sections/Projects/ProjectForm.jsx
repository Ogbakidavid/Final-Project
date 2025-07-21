import React, { useState, useContext } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { ToastContext } from '../../components/Toast';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    subTitle: project?.subTitle || '',
    image: project?.image || '',
    about: project?.about || '',
    description: project?.description || '',
    link: project?.link || ''
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToastContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['title', 'subTitle', 'image', 'about', 'description', 'link'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        addToast(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`, 'error');
        return;
      }
    }

    setLoading(true);
    try {
      if (project) {
        await apiRequest(`/projects/${project._id}`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        });
        addToast('Project updated successfully!');
      } else {
        await apiRequest('/projects', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        addToast('Project created successfully!');
      }
      onSave();
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project subtitle"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About *
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description about the project"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed project description"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Link *
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://project-demo.com"
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            {loading ? 'Saving...' : 'Save Project'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;