import React, { useState, useEffect, useContext } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { ToastContext } from '../../components/Toast';
import BlogForm from './BlogForm';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const { addToast } = useContext(ToastContext);

  const fetchBlogs = async () => {
    try {
      const data = await apiRequest('/blogs');
      setBlogs(data.data || []);
    } catch (error) {
      addToast('Failed to fetch blogs', 'error');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await apiRequest(`/blogs/${id}`, { method: 'DELETE' });
      addToast('Blog deleted successfully!');
      fetchBlogs();
    } catch (error) {
      addToast(error.message, 'error');
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingBlog(null);
    fetchBlogs();
  };

  if (showForm) {
    return (
      <BlogForm
        blog={editingBlog}
        onSave={handleFormSave}
        onCancel={() => {
          setShowForm(false);
          setEditingBlog(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Blogs</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-primary text-gray-950 rounded-lg hover:bg-gray-950 hover:text-primary transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Blog
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No blogs found. Write your first blog post!
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  {blog.author && (
                    <p className="text-sm text-gray-600 mb-2">By {blog.author}</p>
                  )}
                  {blog.content && (
                    <p className="text-gray-700 mb-4 line-clamp-3">{blog.content}</p>
                  )}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                {blog.coverImage && (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-24 h-24 object-cover rounded-lg ml-4"
                  />
                )}
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingBlog(blog);
                    setShowForm(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsSection;