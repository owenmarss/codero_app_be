const jwt = require('jsonwebtoken');

const secretKey = 'coderoeducation121314';

const generateToken = (user) => {
    return jwt.sign({ id: user.id, employee_id: user.employee_id, position: user.position, working_hour: user.working_hour }, secretKey, {
        expiresIn: '24h', // Token expired in 24 hours
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