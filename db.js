const urls = new Map();

function generateId() {
    return Math.random().toString(36).substr(2, 6);
}

async function add(url) {
    const id = generateId();
    urls.set(id, url);
    return id;
}

async function find(id) {
    return urls.get(id) || null;
}

module.exports = { add, find };