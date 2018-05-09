const speakeasy = require('speakeasy');
const secretConfig = require('../config/config').secondFactorSecret;

exports.generate_secret = (opt) => {

    let options = opt || {};

    if (isEmptyOptions(options)) {
        options.length = secretConfig.length;
        options.name = secretConfig.name;
        options.issuer = secretConfig.issuer;
    }

    if (options.length === undefined) {
        options.length = secretConfig.length
    }
    if (options.name === undefined) {
        options.name = secretConfig.name
    }
    if (options.issuer === undefined) {
        options.issuer = secretConfig.issuer
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