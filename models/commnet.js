const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    commentBody: {
        type:String,
        required: true
    },
    postId: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);