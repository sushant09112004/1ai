const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "sushant@123";

export function generateToken(user){
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role : user.role,
        },
        JWT_SECRET,
        {
            expiresIn : '7d'
        }
    );
}

export function verifyToken(token){
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed in jwt.js",error);    
        return null;    
    }
}