const { verifyToken } = require('../utils/jwt.utils');

module.exports = (req, res, next) => {
    var token = req.headers['authorization'];
    
    if(!token) {
        console.log(token);
        
        return res.status(403).send({
            message: 'No token provided!',
        });
    }
    token = token.replace('Bearer ', '');
    
    const decoded = verifyToken(token);
    if(!decoded) {
        return res.status(401).send({
            message: 'Unauthorized!',
        });
    }

    req.id = decoded.id;
    next();
}