const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    content: String,
    author: String,
    tags: [String],
    coverImage: String,
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema);