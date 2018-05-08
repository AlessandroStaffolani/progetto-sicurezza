const speakeasy = require('speakeasy');

exports.verify_totp = (opt) => {

    let options = opt || {};

    return speakeasy.totp.verify({
        secret: options.secret,
        encoding: options.encoding,
        token: options.token
    });

};

