const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const Project = require('./models/Project');

const sampleProjects = [
    {
        title: "Project Name:",
        subTitle: "Travel",
        image: "image4.jpg",
        about: "About:",
        description: "Travel is a digital platform that helps users plan and book their trips with ease, providing information on destinations, accommodations, flights, tours, and local experiences",
        link: "https://travel-website-two-phi.vercel.app/",
    },
    {
        title: "Project Name:",
        subTitle: "Tally it Easy",
        image: "image1.jpg",
        about: "About:",
        description: "Tally it easy is a digital tool designed to help small businesses and retailers monitor their sales, expenses, inventory, and customer activity in real time",
        link: "https://retail-tracker.lovable.app/",
    },
    {
        title: "Project Name:",
        subTitle: "Haven Ebook",
        image: "image2.jpg",
        about: "About:",
        description: "Haven eBook Website is an online platform where users can access, read, or download digital books across various genres.",
        link: "https://havenebookswebsite.netlify.app/",
    },
    {
        title: "Project Name:",
        subTitle: "Freelancers Bot",
        image: "image3.jpg",
        about: "About:",
        description: "FreelancersBot is an AI-powered assistant designed to connect clients with the right freelancers quickly and efficiently",
        link: "https://freelancersbot.netlify.app/"
    },
];

const seedDB = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');

        const existingProjects = await Project.countDocuments();
        
        if (existingProjects > 0) {
            console.log('Database already contains projects. Skipping seeding to prevent data loss.');
            process.exit();
        }

        console.log('No projects found - inserting sample data...');
        await Project.insertMany(sampleProjects);
        console.log('Successfully added sample projects');
        
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}


seedDB();