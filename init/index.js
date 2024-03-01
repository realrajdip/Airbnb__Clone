const mongoose = require('mongoose'); 
const initData = require('./data.js'); 

const Listing = require('../models/listing.js'); 

main()
.then(()=>{
    console.log('connected to DB')
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnbTest");
} 

const initDB = async () => {
    await Listing.deleteMany({}); 
    initData.data = initData.data.map((obj) => ({
      ...obj, 
      owner: "65dc6e323d6242657c520913"
    }));
    await Listing.insertMany(initData.data); 
    console.log('data was initialize'); 
}

initDB(); 
