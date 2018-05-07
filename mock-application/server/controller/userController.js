
const User = require('../model/User');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const cryptoPassword = require('../crypto/password');

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.status(200);
    res.json({title: 'User API'});
};

exports.get_user = (req, res, next) => {

    User.find({username: req.params.username})
        .then(data => {
            res.header('Content-Type', 'application/json');
            res.status(200);
            res.json({
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
            res.status(500);
            res.json({
                errors: errors.mapped()
            });

        } else {
            let userData = {
                username: req.body.username,
                password: req.body.password
            };

            cryptoPassword.hash_password(userData.password)
                .then(result => {
                    userData.password = result.digest;
                    userData.salt = result.salt;
                    userData.two_factor_secret = '';

                    User.save(userData)
                        .then(username => {
                            res.header('Content-Type', 'application/json');
                            res.status(200);
                            res.json({
                                user: {
                                    username: username
                                }
                            });
                        })
                        .catch(err => next(err));

                })
        }
    }
];