const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true
    },
    comments: {
        type:String,
        required:true,
        trim:true
    },
    blogId: {
        type:String,
        required:true,
        trim:true
    },
    
    updatedAt: Date
    
},{timestamps:true})


module.exports = mongoose.model('Comment',commentSchema);