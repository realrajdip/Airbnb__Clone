const mongoose = require('mongoose'); 
const passportLocalMongoose = require('passport-local-mongoose'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    } 
    //username and password with hashing and salting will be added by plm
})

userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model("User", userSchema); 