const mongoose = require("mongoose")
const {Schema} = mongoose;
const BlogSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    authorName : {
        type : String,
        required : true,
    }
})

 module.exports = mongoose.model ("blog" , BlogSchema)