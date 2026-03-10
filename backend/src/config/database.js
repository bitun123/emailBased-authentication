const mongoose = require("mongoose");



const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to database");
    } catch (error) {
        console.error("error connecting to database", error);
    }
}


module.exports = connectDb;