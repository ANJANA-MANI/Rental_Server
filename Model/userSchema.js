const mongoose=require('mongoose')
const validator=require('validator')
const userSchema= new mongoose.Schema({

    firstname:{
        type:String,
        required:true,
     
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        

    },
    profileImage:{
        type:String,
        default:"",
    },
    Triplist:{
        type:Array,
        default:[]

    },
    Wishlist:{
        type:Array,
        default:[]
        
    },
    Propertylist:{
        type:Array,
        default:[]
        
    },
    Reservationlist:{
        type:Array,
        default:[]
        
    }
})
const user=mongoose.model("user",userSchema)
module.exports=user