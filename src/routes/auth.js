const express = require('express');
const { authSignUp, authSignIn, requireSignIn } = require('../controller/auth');
const router = express.Router();


router.post('/signup',authSignUp);
router.post('/signin',authSignIn);


module.exports = router;