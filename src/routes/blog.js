const express = require('express');
const { requireSignIn, adminMiddleware, uploads3 } = require('../common-middleware');
const { createBlog, getBlogs, deleteBlogs, deleteBlogById } = require('../controller/blog');
const router = express.Router();


router.post('/blog/create',requireSignIn,adminMiddleware,uploads3.single('blogImage'), createBlog);
router.get('/blog/getBlogs',getBlogs);
router.delete('/blog/deleteBlogById',requireSignIn,adminMiddleware, deleteBlogById);



module.exports = router;