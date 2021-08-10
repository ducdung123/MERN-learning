const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res
            .status(401)
            .json({ success: false, message: "Access token not found" })
    }
    try{
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    }
    catch(err){
        return res
        .status(500)
        .json({ success: false, message: 'Invalid token' })
    }
}

module.exports = verifyToken