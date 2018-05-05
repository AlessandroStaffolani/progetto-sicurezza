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

router.get('/get/:username', userController.get_user);

router.post('/create', userController.create);

module.exports = router;