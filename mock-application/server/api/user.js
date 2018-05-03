/**
 *Module dependencies
 */

const express = require('express');
const userController = require('../controller/userController');

//==============================================================================

/**
 *Create router instance
 */

const router = express.Router();

//==============================================================================

/**
 *Routes
 */

router.get('/', userController.index);

router.get('/get/all', userController.get_all);

router.post('/create', userController.create);

module.exports = router;