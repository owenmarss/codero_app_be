const { verifyToken } = require('../utils/jwt.utils');

const checkPosisi = (position) => {
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

        if(!position.includes(decoded.role)) {
            console.log("This is your user id: " ,decoded.id);
            console.log("This is your role: " ,decoded.role);
            
            return res.status(403).send({
                message: 'Access forbidden: You are not authorized!',
            });
        }

        req.id = decoded.id;
        req.employee_id = decoded.employee_id;
        req.position = decoded.position;
        req.working_hour = decoded.working_hour;
        console.log("berhasil");
        
        next();
    }
}

module.exports = checkPosisi;