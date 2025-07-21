import React, { useState, useContext } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { ToastContext } from '../../components/Toast';

const BlogForm = ({ blog, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    author: blog?.author || '',
    tags: blog?.tags?.join(', ') || '',
    coverImage: blog?.coverImage || ''
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
    
    if (!formData.title.trim()) {
      addToast('Title is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      if (blog) {
        await apiRequest(`/blogs/${blog._id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        addToast('Blog updated successfully!');
      } else {
        await apiRequest('/blogs', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        addToast('Blog created successfully!');
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
          {blog ? 'Edit Blog' : 'Add New Blog'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Blog title"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="react, javascript, tutorial"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/cover.jpg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your blog content here..."
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            {loading ? 'Saving...' : 'Save Blog'}
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

export default BlogForm;