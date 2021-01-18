const express = require('express');
const {  getAllInitialData } = require('../../controller/admin/initialData');
const router = express.Router();


router.get('/initialdata', getAllInitialData);


module.exports = router;