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

router.get('/add/second/:username', authenticationController.add_second);

module.exports = router;