
const User = require('../model/User');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const cryptoPassword = require('../crypto/password');
const cryptoSecret = require('../crypto/secret');
const cryptoToken = require('../crypto/token');
const speakeasy = require('speakeasy');

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.json({title: 'Authentication API'});
};

exports.get_config_second = (req, res, next) => {

    const username = req.params.username;
    let responseObj = {
        data: {},
        errors: []
    };

    User.find({username: username})
        .then(user => {

            // genero il segreto temporaneo per l'utente
            const twoFactorSecret = cryptoSecret.generate_secret();
            user.two_factor_temp_secret = twoFactorSecret.hex;

            // salvo il segreto
            User.save(user)
                .then(response => {
                    responseObj.data = {
                        username: response,
                        twoFactorSecret: twoFactorSecret
                    };
                    res.header('Content-Type', 'application/json');
                    res.status(200);
                    res.json(responseObj);
                })
                .catch(err => next(err));


        })
        .catch(err => {
            res.header('Content-Type', 'application/json');
            res.status(200);
            responseObj.errors = [
                {
                    field: 'username',
                    message: 'This user doesn\'t exist'
                }
            ];
            res.json(responseObj);
        });

};

exports.authenticate = [

    // Validate fields.
    body('username', 'Username must not be empty.').isLength({ min: 1 }).trim(),
    body('password', 'Password must be at least 4 characters.').isLength({ min: 4 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {

        let responseObj = {
            data: {},
            errors: []
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            res.header('Content-Type', 'application/json');
            res.status(500);
            res.json({
                errors: errors.mapped()
            });

        } else {
            // controllo se esiste l'utente

            const requestedUser = {
                username: req.body.username,
                password: req.body.password
            };

            User.find({username: requestedUser.username})
                .then(user => {
                    // verifico se la password immessa corrisponde con quella salvata

                    cryptoPassword.verify_password(requestedUser.password, user.salt, user.password)
                        .then(response => {
                            res.header('Content-Type', 'application/json');
                            res.status(200);

                            if (response) {
                                responseObj.data = {
                                    authenticated: response
                                };
                            } else {
                                responseObj.errors = [
                                    {
                                        field: 'password',
                                        message: 'The password provided doesn\'t match'
                                    }
                                ];
                            }



                            res.json(responseObj);
                        })
                        .catch(err => next(err));

                })
                .catch(err => {
                    res.header('Content-Type', 'application/json');
                    res.status(200);
                    responseObj.errors = [
                        {
                            field: 'username',
                            message: 'This user doesn\'t exist'
                        }
                    ];
                    res.json(responseObj);
                });
        }

    },

];

exports.verify_second = [
    // Validate fields.
    body('username', 'Username must not be empty.').isLength({ min: 1 }).trim(),
    body('token', 'Token must be empty.').isLength({ min: 1 }).trim(),

    // Sanitize fields (using wildcard).
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {

        let responseObj = {
            data: {},
            errors: []
        };

        const userToken = req.body.token;
        const isConfig = req.body.isConfig;

        User.find({username: req.body.username})
            .then(user => {
                let storedSecret = isConfig ? user.two_factor_temp_secret : user.two_factor_secret;

                let verified = cryptoToken.verify_totp({
                    secret: storedSecret,
                    encoding: 'hex',
                    token: userToken
                });

                if (verified) {
                    responseObj.data = {
                        verified: true
                    };

                    if (isConfig) {

                        user.two_factor_secret = user.two_factor_temp_secret;
                        user.two_factor_temp_secret = '';

                        User.save(user)
                            .then(userSaved => {
                                res.header('Content-Type', 'application/json');
                                res.status(200);
                                res.json(responseObj);
                            })
                            .catch(err => next(err));

                    } else {
                        res.header('Content-Type', 'application/json');
                        res.status(200);
                        res.json(responseObj);
                    }

                } else {
                    responseObj.errors = [
                        {
                            field: 'token',
                            message: 'This token isn\'t correct'
                        }
                    ];
                    res.header('Content-Type', 'application/json');
                    res.status(200);
                    res.json(responseObj);
                }
            })
            .catch(err => {
                res.header('Content-Type', 'application/json');
                res.status(200);
                responseObj.errors = [
                    {
                        field: 'username',
                        message: 'This user doesn\'t exist'
                    }
                ];
                res.json(responseObj);
            });

    }
];