const mongoose=require('mongoose');
const user = require('../Model/userSchema');
const listingSchema=new mongoose.Schema(
    {
        owner:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user"
        },
        category:{
            type:String,
            required:true
        },
        streetAddress:{
            type:String,
            required:true
        }
        ,
        aptSuite:{
            type:String,
            required:true
        }
        ,city:{
            type:String,
            required:true
        },
        
       province :{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
        ,
        guestCount:{
            type:Number,
            required:true
        },
        bedroomCount:{
            type:Number,
            required:true
        }
        ,
        bedCount:{
            type:Number,
            required:true,
        },
        bathroomCount:{
            type:Number,
            required:true,
        },
        amenities:{
            type:Array,
            default:[]
        },
        listingPhotos:[{type:String}],//saving photos path
 
           
       title:{
        type:String,
        required:true,
    },
    
       description:{
            type:String,
            required:true,
        },
        
       highlight:{
            type:String,
            required:true,
        },
        
       highlightDesc :{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true
        },
        bookingstatus:{
            type:Boolean,
            default:true
        }
    
    },{
        timestamps:true
    }
    
)
const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;