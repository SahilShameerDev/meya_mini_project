const express = require('express'); // import express
const router = express.Router(); // create express router
const aiController = require('../controllers/ai.controller'); // import ai controller

router.post('/get-review',aiController.getReview); // create a route for the home page


module.exports = router; // export router