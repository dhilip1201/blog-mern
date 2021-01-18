const Comment = require("../models/comment")

exports.createComment = (req,res)=>{
    const commentObj ={
        email: req.body.email,
        comments: req.body.comments,
        blogId: req.body.blogId,
    }
    
        const cat = new Comment(commentObj)
        cat.save((error, comment) =>{
        if(error) return res.status(400).json({error});
        if(comment){
            return res.status(201).json({comment : comment})
        }
    })
        
   
    
    
}

exports.getComments=(req,res)=>{
    Comment.find({}).sort({_id:-1}).exec((error, comments) => {
        if(error) return res.status(400).json({error});
        if(comments){
            return res.status(200).json({comments})
        }
    })
}