const userController=require('../Controller/userController')
const listngController=require('../Controller/listingController')
const multerConfig = require('../Middlewares/multerMiddleware')
const bookingController=require('../Controller/bookingController')
const express=require('express');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const router= new express.Router()
//register
router.post('/user/register',multerConfig.single('profileImage'),userController.register)

//login
router.post('/user/login',userController.login)

//add a property

router.post('/add/listing',jwtMiddleware,multerConfig.array("listingPhotos"),listngController.add)

//get all property
router.get('/view/properties',listngController.view)


//get a property details
router.get('/properties/:listingId',listngController.details)

//book a property
router.post('/booking',bookingController.booking)


//get trip details
router.get('/:customerId/Triplist',bookingController.trips)

//add listing to wishlist
router.patch('/:userId/:listingId',bookingController.wishlist)

//list all properties owned by user

router.get('/:userId/properties',listngController.properties)


//list all reservation of user

router.get('/:userId/reservations',bookingController.bookings)

//search

router.get('/properties/search/:search',listngController.search)


//make payment
router.post('/payment',bookingController.payment)

module.exports=router;