const Booking = require('../Model/bookingSchema')
const Listing=require('../Model/listingSchema');
const user = require('../Model/userSchema');
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
exports.booking = async (req, res) => {

    try {

        console.log('Inside booking controller', req.body);
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
        const newBooking = new Booking({

            customerId, hostId, listingId, startDate, endDate, totalPrice
        })
        await newBooking.save()
        res.status(200).json(newBooking);

    } catch (error) {
        res.status(400).json('Request Failed', error)
    }

}

exports.trips = async (req, res) => {

    try {

        const { customerId } = req.params
        //console.log(req.params);
        console.log('selecting........');
        const trips = await Booking.find({ customerId: customerId }).populate("customerId hostId listingId")
        res.status(200).json(trips)
        console.log('Trips', trips);
      
    } catch (error) {
console.log(error);
        res.status(404).json({message:"Can't find trips"})
    }
}

exports.wishlist=async(req, res)=>{
   
try {
    const{userId,listingId}=req.params
    const User=await user.findById(userId)
    const listing=await Listing.findById(listingId)
    console.log('Inside wishlistinggg');
    //console.log('User',User);
    //console.log('Listing',listing);
 const favouriteListing=User.Wishlist.find((item)=>item._id.toString()===listingId)
if(favouriteListing)
{
    User.Wishlist=User.Wishlist.filter((item)=>item._id.toString()!==listingId)
     await User.save()
     res.status(200).json({message:"Listing is removedd from wish list",wishlist:User.Wishlist})
  }
  else{
    User.Wishlist.push(listing)
    await User.save();
    res.status(200).json({message:"Listing is added to wish list",wishlist:User.Wishlist})
  }

}
 catch (error)
  {
    console.log(error);
    res.status(404).json({error:error.message})
}


}

exports.bookings = async (req, res) => {

    try {

        const { userId } = req.params
        //console.log(req.params);
        console.log('selecting........');
        const reservation = await Booking.find({ hostId:userId }).populate("customerId hostId listingId")
        res.status(200).json(reservation)
      
    } catch (error) {
console.log(error);
        res.status(404).json({message:"Can't find bookings"})
    }
}
exports.payment = async (req, res) => {
    console.log('Inside payment controller');
    const{products}=req.body
    console.log('Products',products);
    const lineItems=products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title
            },
            unit_amount:product.totalPrice*100
        },
        quantity:1
    }))
    //const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
    const session=await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:`/Payment/Completed`,
    cancel_url:`/Payment/Failed`
    })
     res.json(({id:session}))
}