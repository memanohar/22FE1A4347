function validate(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function parse(url) {
    return url.trim();
}

module.exports = { validate, parse };