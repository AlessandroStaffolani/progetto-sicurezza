const speakeasy = require('speakeasy');
const secretConfig = require('../config/config').secondFactorSecret;

exports.generate_secret = (opt) => {

    let options = opt || {};

    if (isEmptyOptions(options)) {
        options.length = secretConfig.length;
        options.name = secretConfig.name;
        options.issuer = secretConfig.issuer;
    }

    return speakeasy.generateSecret(options);

};

const isEmptyOptions = (options) => {
    if (Object.keys(options).length === 0 && options.constructor === Object) {
        return true;
    } else {
        return false;
    }
};