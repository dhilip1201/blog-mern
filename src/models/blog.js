const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    blogCategory: {
        type:String,
        required:true,
        trim:true
    },
    blogTitle: {
        type:String,
        required:true,
        trim:true
    },
    blogText: {
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    blogImage:{
        type: String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    updatedAt: Date
    
},{timestamps:true})


module.exports = mongoose.model('Blog',blogSchema);