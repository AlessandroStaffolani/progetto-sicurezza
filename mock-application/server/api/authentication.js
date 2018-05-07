/**
 *Module dependencies
 */

const express = require('express');
const authenticationController = require('../controller/authenticationController');

//==============================================================================

/**
 *Create router instance
 */

const router = express.Router();

//==============================================================================

/**
 *Routes
 */

router.get('/', authenticationController.index);

router.post('/authenticate/first', authenticationController.authenticate);

router.get('/get/config/second/:username', authenticationController.get_config_second);

router.post('/verify/second', authenticationController.verify_second);

module.exports = router;