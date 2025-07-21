const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login
exports.login = async (req, res) => {
    console.log('Login request received:', req.body);
    try {
        const { username, password } = req.body;

        // Check if username and password exist
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        // Find user
        const user = await User.findOne({ username }).select('+password');
        console.log('User found:', user)
        
        // Explicitly select the password field
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Separate the password check for better error handling
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Remove password before Send response
        user.password = undefined;

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};

// Register
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // Create new user
        const user = await User.create({
            username,
            password // Password will be hashed automatically by the model
        });

        // Create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};