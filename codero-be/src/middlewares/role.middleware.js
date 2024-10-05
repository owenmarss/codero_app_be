const { verifyToken } = require('../utils/jwt.utils');

const checkPosisi = (posisi) => {
    return (req, res, next) => {
        var token = req.headers['authorization'];
        token = token.replace('Bearer ', '');
        
        if(!token) {
            return res.status(403).send({
                message: 'No token provided!',
            });
        }

        const decoded = verifyToken(token);
        if(!decoded) {
            return res.status(401).send({
                message: 'Unauthorized!',
            });
        }

        if(!posisi.includes(decoded.role)) {
            console.log("This is your user id: " ,decoded.id);
            console.log("This is your role: " ,decoded.role);
            
            return res.status(403).send({
                message: 'Access forbidden: You are not authorized!',
            });
        }

        req.userId = decoded.id;
        req.posisi = decoded.role;
        console.log("berhasil");
        
        next();
    }
}

module.exports = checkPosisi;