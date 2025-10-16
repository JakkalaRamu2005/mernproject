const jwt = require("jsonwebtoken");

function verifyToken(request, response, next){
    const  token = request.cookies.token;
    if(!token){
        return response.status(401).json({message: "Unauthorized. No token provieded"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
        
    }catch(error){
        return response.status(401).json({message: "expired or . Invalid token"})
    }

    

}

module.exports = verifyToken;