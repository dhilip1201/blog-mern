const express = require('express');
const { requireSignIn } = require('../../common-middleware');
const { adminSignUp, adminSignIn, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


router.post('/admin/signup',validateSignupRequest,isRequestValidated,adminSignUp);
router.post('/admin/signin',validateSigninRequest,isRequestValidated,adminSignIn);
router.post('/admin/signout',requireSignIn, signout);


module.exports = router;