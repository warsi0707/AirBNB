const mongoose = require("mongoose")
const initdata = require("./data.js")
const Listing = require("../models/listingModel.js")


main()
    .then(() =>{
        console.log("Connected to Databse")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async () =>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "660ab2d23a5e02cba4e22170"}))
    await Listing.insertMany(initdata.data)
    console.log("Data was initialised")
}

initDB()