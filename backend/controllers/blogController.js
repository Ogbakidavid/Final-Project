const Blog = require('../models/Blog');

// Get all Blogs
exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        next(error); 
    }
}

// Get single Blog
exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

// Create new Blog
exports.createBlog = async (req, res, next) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

// Update Blog
exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        next(error);
    }
}

// Delete Blog
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
}
