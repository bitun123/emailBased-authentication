require("dotenv").config();


const server = require("./src/app");
const connectDb = require("./src/config/database");








connectDb();



server.listen(3000,()=>{
    console.log("server is running on port 3000");
})