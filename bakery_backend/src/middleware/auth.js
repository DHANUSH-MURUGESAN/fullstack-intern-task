const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwt_secret = process.env.JWT_SECRET;

const generateToken = (id) =>{
    const token = jwt.sign({id:id}, jwt_secret, {expiresIn:"1h"});

    return token;
}

const verifyToken = async(req, res, next) => {
    try{
        const tokenHeader = req.headers.authorization;
        if(!tokenHeader || !tokenHeader.startsWith("Bearer ")){
            return res.status(404).send({message: "Invalid Token"}); 
        }
        const token = tokenHeader.split(" ")[1];
        if(!token){
            return res.status(404).send({message: "Token is not found"});
        }
        const decode = await jwt.verify(token, jwt_secret);
        req.user = decode;
        next();
    }
    catch(error){
        res.status(401).send({message: "Token error", error});
    }
}

module.exports = {generateToken, verifyToken}