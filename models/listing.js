const mongoose = require('mongoose');
const Review = require('./review.js'); 

const listingSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: true
    }, 
    description: String, 
    image:{
        url: String, 
        filename: String
    }, 
    price: Number, 
    location: String, 
    country: String, 
    reviews: [ //array of reviews 
        {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'Review'
        }
    ], 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//usecase: when a listing is deleted  all associated reviews should also be deleted
listingSchema.post('findOneAndDelete', async (listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}})
    }
})

const Listing = mongoose.model('Listing', listingSchema); 
module.exports = Listing; 