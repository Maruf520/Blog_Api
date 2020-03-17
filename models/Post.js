const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postBody: {
        type: String,
        required: true,
        
    },
    postTitle:{
        type:String,
        required:true,
       
    },
    date: {
        type:Date,
        default: Date.now
    }, 
    userId: {
        type:String
    }
});
module.exports = mongoose.model("Post",postSchema);