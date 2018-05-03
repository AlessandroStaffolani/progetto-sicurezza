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

module.exports = router;