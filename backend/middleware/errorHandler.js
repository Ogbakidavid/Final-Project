export const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode !== 200 ? res.statuscode : 500;

    res.status(statuscode).json({
        message: err.message,
        stack: process.NODE_ENV === 'production' ? null : err.stack
    });
};