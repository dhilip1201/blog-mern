const express = require('express');
const { createComment, getComments } = require('../controller/comment');
const router = express.Router();


router.post('/comment/create', createComment);
router.get('/comment/getcomments', getComments);



module.exports = router;