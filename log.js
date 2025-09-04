const fetch = require('node-fetch');

/**
 * Log significant events to the Test Server.
 * @param {string} stack - "backend"
 * @param {string} level - "info", "warn", "error", "fatal"
 * @param {string} pkg - "middleware", "handler", "db", "server"
 * @param {string} message - Descriptive log message
 */
function Log(stack, level, pkg, message) {
    fetch('http://20.244.56.144/evaluation-service/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            stack: String(stack).toLowerCase(),
            level: String(level).toLowerCase(),
            package: String(pkg).toLowerCase(),
            message,
            timestamp: new Date().toISOString()
        })
    }).catch(() => {});
}

module.exports = Log;