const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
console.log('inside jwtmiddleware function');
const token=req.headers['authorization'].split(" ")[1]
console.log("After split",token);

try {

const jwtResponse=jwt.verify(token,"secret123")
console.log(jwtResponse);
req.payload=jwtResponse.userId
next()
    
} catch (err) {
    res.status(401).json("Authorization Failed login")
}


}
module.exports=jwtMiddleware