const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: String, 
    rating: {
        type: String, 
        min: 0, 
        max: 5
    }, 
    createdAt: {
        type: Date, 
        default: Date.now() //time when it is created
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
})


module.exports = mongoose.model("Review", reviewSchema); 