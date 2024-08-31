const users=require('../Model/userSchema')
const jwt=require('jsonwebtoken');
exports.register=async(req,res)=>{
    
 
  const{firstname,lastname,email,password}=req.body;
  const profileImage=req.file.filename
 
try {

const existingUser=await users.findOne({email})

if(existingUser)
{
res.status(406).json("User already exist...please login")
}
else{
console.log('creating new user');
const newUser=new users({
    firstname,lastname,email,password,profileImage,Tripllist:[],Wishllist:[],Propertylist:[],Reservationlist:[]
})
await newUser.save()
res.status(200).json(newUser)
}
} catch (error) {
    res.status(401).json(`Request Failed,Error:${error}`)
 
}
}
exports.login=async(req,res)=>{
 // console.log('requestbody:',req.body);
  const{email,password}=req.body;
  //console.log('inside login controller function');
  try {
  const existingUser=await users.findOne({email:email,password:password})
  if(existingUser)
  {
  //console.log(existingUser._id);
  const token=jwt.sign({userId:existingUser._id},"secret123")
  res.status(202).json({existingUser,token})
  }
  else{
      res.status(404).json("incorrect email or password !")
     } 
  }
  catch (err) {
      res.status(401).json(`Login API Failed !,err:${err}`)
     }
 
  }

 