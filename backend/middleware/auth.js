const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    
    // 1. Get token from header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Not authorized to access this route' 
        });
    }

    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Get user from database (password excluded automatically)
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exists'
            });
        }

        // 4. Check if user changed password after token was issued
        if (user.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                success: false,
                message: 'User recently changed password. Please log in again'
            });
        }

        // 5. Grant access
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
            error: error.message
        });
    }
};

// Admin authorization middleware
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};

// Generate JWT token
exports.signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};