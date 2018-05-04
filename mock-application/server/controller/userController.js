
const fileUtility = require('../utils/fileUtils');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const securityUtils = require('../utils/passwordUtils');

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.json({title: 'User API'});
};

exports.get_all = (req, res, next) => {
    fileUtility.read()
        .then(data => {
            res.header('Content-Type', 'application/json');
            res.json({
                code: 200,
                user: data
            });
        })
        .catch(err => next(err));
};

exports.create = [

    // Validate fields.
    body('username', 'Username must not be empty.').isLength({ min: 1 }).trim(),
    body('password', 'Password must be at least 4 characters.').isLength({ min: 4 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            res.header('Content-Type', 'application/json');
            res.json({
                code: 500,
                user: errors.mapped()
            });

        } else {
            let userData = {
                username: req.body.username,
                password: req.body.password
            };

            securityUtils.hash_password(userData.password)
                .then(result => {
                    userData.password = result.digest;
                    userData.salt = result.salt;

                    fileUtility.save(userData)
                        .then(data => {
                            res.header('Content-Type', 'application/json');
                            res.json({
                                code: 200,
                                user: data
                            });
                        })
                        .catch(err => next(err));

                })
        }
    }
];