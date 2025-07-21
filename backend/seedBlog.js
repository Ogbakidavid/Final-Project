const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Blog = require('./models/Blog');

const sampleBlogs = [
    {
        title: "Building Scalable React Applications",
        content: "Learn the best practices for creating React applications that can grow with your business needs. From component architecture to state management.",
        author: "Demilade Abatan",
        tags: ["React", "Architecture", "Best Practices"],
        coverImage: "reactImage.jpg",
    },
    {
        title: "Why CMS Matters for Personal Brands",
        author: "Elfa Abdulkarem",
        content: "A content management system helps streamline your workflow and keeps your portfolio fresh...",
        tags: ["cms", "personal branding", "workflow"],
        coverImage: "cmsImage.jpg"
    },
    {
        title: "Blockchain: Revolutionizing the Future of Digital Trust",
        author: "David Ogbaki",
        content: "Blockchain technology is transforming industries by providing decentralized, secure, and transparent systems. In this article, we dive into how blockchain works and why it’s shaping the future of digital trust and transactions.",
        tags: ["blockchain", "decentralization", "technology"],
        coverImage: "blockchainImage.jpg"
    }
];



const seedBlogs = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        const existingBlogs = await Blog.countDocuments();
        
        if (existingBlogs > 0) {
            console.log('Database already contains blogs. Skipping seeding to prevent data loss.');
            process.exit();
        }

        console.log('No blogs found - inserting sample data...');
        await Blog.insertMany(sampleBlogs);
        console.log('Successfully added sample blogs');

        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seedBlogs();
