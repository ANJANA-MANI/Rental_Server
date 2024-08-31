const Listing = require('../Model/listingSchema');
exports.add=async(req,res)=>{
 
    const{
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,price,
    }=req.body;
  // console.log('ID FROM REQUEST',creator);
const Photos=req.files
//console.log(Photos);
const listingPhotos= Photos.map((file) => file.filename)
  try {
 
  if(!listingPhotos)
  {
  res.status(400).json("No photos uploaded yet..")
  }
  else{
 // console.log('creating new listing');
  const newList=new Listing({
    owner:creator,
    category,
    type,
    streetAddress,
    aptSuite,
    city,
    province,
    country,
    guestCount,
    bedroomCount,
    bedCount,
    bathroomCount,
    amenities,
    listingPhotos,
    title,
    description,
    highlight,
    highlightDesc,price,
  })
 // console.log('new list',newList);
  await newList.save()
  res.status(200).json(newList)
  }
  } catch (error) {
      res.status(401).json(`Request Failed,Error:${error}`)
  }
  }
exports.view=async(req,res)=>{

    const qCategory=req.query.category

    try {
        let listings
        if(qCategory){
            listings=await Listing.find({category:qCategory}).populate('owner')
        }
        else{
            listings=await Listing.find().populate('owner');

            
        }
res.status(200).json(listings)

    } catch (error) {
        res.status(409).json({message:"Failed to fetch listings",error:error.message})
    }
}
exports.details=async(req,res)=>{
    //console.log('inside details function');
try {     
const {listingId}=req.params
//console.log('id from controller',listingId);
const listing = await Listing.findById(listingId).populate("owner")
res.status(202).json(listing)
//console.log('found listing',listing);
} 
catch (error) 
{
console.log(error);
}
}
exports.properties=async(req,res)=>{

    console.log('getting properties');
   try {
    const {userId}=req.params
    const properties=await Listing.find({owner:userId}).populate("owner")
     res.status(200).json(properties)

} catch (error) {
    console.log(err);
    res.status(404).json({message:"can not find properties",error})
   }



}
//get listings by search

exports.search=async(req,res)=>{
//console.log('Searchinggg');
    const {search}=req.params
   // console.log('Searchinggg',search);
    try {
        let listings=[]
        if(search==="all"){
            listings=await Listing.find().populate('owner')
        }
        else{
            listings=await Listing.find({
                $or:[{category:{$regex:search,$options:"i"}},
                 {title:{$regex:search,$options:"i"}},]
            }).populate('owner');
        }
res.status(200).json(listings)

    } catch (error) {
        res.status(404).json({message:"Failed to fetch listings",error:error.message})
    }
}

exports.hosts=async(req,res)=>{
   // console.log('Getting hosts');
    try{
        const hosts=await Listing.find().populate('owner')
        res.status(200).json(hosts)
    }
  catch(err)
  {
    res.status(409).json({message:"Failed to fetch hosts",error:error.message})
  }
}
exports.hostProperties=async(req,res)=>{
    const {id}=req.params
    //console.log(req.params);
    //console.log('finding allllll......');
    try {
        const properties = await Listing.find({ owner: id });
        if (properties.length === 0) {
            return res.status(404).json({ message: "No properties found for this owner" });
        }
        res.status(200).json(properties);
    } catch (error) {
        //console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Error fetching properties", error });
    }
}

exports.checkout = async (req,res) => {
    try {
        //console.log('Inside cancel booking controller fun..');
        const Id = req.params.id;
        const deletedBooking = await Listing.findByIdAndUpdate(Id, { bookingstatus: true },
        { new: true } )
        return res.status(200).json({ message: 'checkedout successfully' });

    } catch (error) {
        res.status(400).json('Request Failed', error)
    }

}