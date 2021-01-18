const Blog = require("../../models/blog");


function createBlogs(blogs, parentId = null) {
  const blogsList = [];
  let blog;
  if (parentId == null) {
    blog = blogs.filter((cat) => cat.parentId == undefined);
  } else {
    blog = blogs.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of blog) {
    blogsList.push({
      _id: cate._id,
      blogCategory: cate.blogCategory,
      slug: cate.slug,
      blogTitle: cate.blogTitle,
      blogText: cate.blogText,
      blogImage: cate.blogImage,
      children: createBlogs(blogs, cate._id),
    });
  }
  return blogsList;
}


exports.getAllInitialData = async (req, res) => {
  // .populate({path:'category',select:'_id name'})
  const blogs = await Blog.find({}).sort({_id:-1})
    .select("_id blogCategory blogTitle blogText slug blogImage")
    .exec();

  res.status(200).json({
    blogs:createBlogs(blogs)
  });
};
