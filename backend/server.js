const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy... 🚀'});
});

// Welcome Route
app.get('/', (req, res) => {
    res.json({
        message: 'Portfolio API 🚀',
        endpoints: {
            projects: {
                getAll: 'GET /api/projects',
                getOne: 'GET /api/projects/:id',
                create: 'POST /api/projects',
                update: 'PUT /api/projects/:id',
                delete: 'DELETE /api/projects/:id'
            },
            blogs: {
                getAll: 'GET /api/blogs',
                getOne: 'GET /api/blogs/:id',
                create: 'POST /api/blogs',
                update: 'PUT /api/blogs/:id',
                delete: 'DELETE /api/blogs/:id'
            },
            auth: {
                login: 'POST /api/login'
            }
        }
    });
});

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port:${PORT}`));


