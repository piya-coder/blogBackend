const { default: mongoose } = require("mongoose");

const dbName = "piuwebbb";
const dbPassword = "czmoi7sEemxWRFBcU"
const dbConnectionUrl = "mongodb+srv://piuwebbb:zmoi7sEemxWRFBcU@cluster0.axqzr.mongodb.net/Blogtwo"

const connectDb = async ()=>{
    try {
        const mongodbconnection = await mongoose.connect(dbConnectionUrl);
        console.log(`connection completed ${mongodbconnection.connection.host}`);
        
    } catch (error) {
        console.error(error)
    }
}
module.exports = {connectDb}


