const jwt = require('jsonwebtoken')
const JWT_Secret = "asj#jsdf";
const fetchUser = (req,res,next)=>{
   // get the user from jwt token and add id to req object.
   const token =  req.header('auth-token');
   if (!token){
    res.status(401).send({error: "access denied please authenticate the token"})
   }
   try {
    
       const data = jwt.verify(token,JWT_Secret)
       req.user = data.user
    
        next()
   } catch (error) {
    res.status(401);
   }
}

module.exports= fetchUser