const Blog = require("../models/blog")
const slugify = require('slugify');

 function createCategories(categories, parentId = null){
    const categoriesList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for(let cate of category){
        categoriesList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            type:cate.type,
            parentId: cate.parentId,
            categoryImage:cate.categoryImage,
            children:createCategories(categories, cate._id)
        })
    }
    return categoriesList;
}





exports.createBlog = (req,res)=>{
    const blogObj ={
        blogCategory: req.body.blogCategory,
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        slug:slugify(req.body.blogTitle)
    }
    if(req.file){
        blogObj.blogImage = req.file.location;
    }
    

        const cat = new Blog(blogObj)
        cat.save((error, blog) =>{
        if(error) return res.status(400).json({error});
        if(blog){
            return res.status(201).json({blog : blog})
        }
    })
        
   
    
    
}

exports.getBlogs=(req,res)=>{
    Blog.find({}).sort({_id:-1}).exec((error, blogs) => {
        if(error) return res.status(400).json({error});
        if(blogs){
            return res.status(200).json({blogs})
        }
    })
}

exports.updateCategories =async (req, res) =>{
    const {_id, name, parentId, type } =req.body;
    const updatedCategories = [];
    if(name instanceof Array){
        
        for(let i=0; i< name.length; i++){
            const category={
                name: name[i],
                slug:slugify(name[i]),
                type: type[i]
                
            }
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updateCategory= await Category.findOneAndUpdate({_id: _id[i]}, category, {new:true});
            updatedCategories.push(updateCategory);
        }
        return res.status(201).json({updatedCategories});
    }else{
        const category = {
            name,
            type,
            slug:slugify(name)
        }
        if(parentId !== ""){
            category.parentId = parentId
        }
        const updateCategory= await Category.findOneAndUpdate({_id}, category, {new:true});
        return res.status(201).json({ updateCategory});
    }
    
}

// exports.deleteBlogs= async(req,res)=>{
//     const {ids} = req.body.payload;
//     const deletedBlogs = [];
//     for(let i=0; i< ids.length; i++){
//         const deleteBlog = await Blog.findOneAndDelete({
//             _id: ids[i]._id
//         }).exec((error, blogs) => {
//             if(error) return res.status(400).json({error});
//             if(blogs){
//                 return res.status(200).json({blogs})
//             }
//         });
//         deletedBlogs.push(deleteBlog)
//     }
//     if(deletedBlogs.length == ids.length){
//         res.status(201).json({message: 'Blog Removed'});
//     }else{
//         res.status(400).json({message: 'Blog Not Removed'});
//     }
    
// }
exports.deleteBlogById = (req, res) => {
    const { blogId } = req.body.payload;
    if (blogId) {
        Blog.deleteOne({ _id: blogId }).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    } else {
      res.status(400).json({ error: "Params required" });
    }
  };