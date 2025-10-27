const mongoose = require('mongoose');
const { MONGO_URL } = require('../config');

const ConnectDB =async()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Database connected successfully");
    }catch(error){
        console.error("Database connection failed", error);
    }
}

module.exports = ConnectDB;