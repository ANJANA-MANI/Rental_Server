const mongoose=require("mongoose")
const user = require('./userSchema');
const Listing=require('./listingSchema')

const BookingSchema=new mongoose.Schema(
    {
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        hostId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },

        listingId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Listing"
        },
        startDate:{
            type:String,
            required:true
        },
        endDate:{
            type:String,
            required:true
        },
        totalPrice:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)
const Booking=mongoose.model("Booking",BookingSchema)
module.exports=Booking