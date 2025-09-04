const Log = require('./log');

/**
 * Express middleware for logging requests and responses.
 */
function loggingMiddleware(req, res, next) {
    Log("backend", "info", "middleware", `Incoming ${req.method} request to ${req.url}`);
    res.on('finish', () => {
        Log("backend", "info", "middleware", `Response ${res.statusCode} for ${req.method} ${req.url}`);
    });
    next();
}

module.exports = loggingMiddleware;