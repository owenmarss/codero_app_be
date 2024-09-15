const jwt = require('jsonwebtoken');

const secretKey = 'coderoeducation121314';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.posisi}, secretKey, {
        expiresIn: '1h', // Token expired in 24 hours
    });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}