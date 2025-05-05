const mongoose = require("mongoose");
const Backend_URL = process.env.MONGODB_URL ;
function connectDb(){
    mongoose.connect(`${Backend_URL}ApartmentDB`,{
        useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected MongoDB");
    })
    .catch((err)=>{
        console.log("MongoDB connection error", err);
    })
}

module.exports = connectDb;