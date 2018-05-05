
const crypto = require('crypto');

const config = {
    // size of the generated hash
    hashBytes: 64,
    // size of the salt
    saltBytes: 16,
    // number of iteration
    iterations: 872791
};

exports.generate_salt = () => {

    return new Promise((resolve, reject) => {
        crypto.randomBytes(config.saltBytes, (err, salt) => {
            if (err) {
                reject(err);
            }

            resolve(salt.toString('hex'));
        })
    })

};

exports.hash_password = (password) => {

    let saltPromise = this.generate_salt();

    return new Promise((resolve, reject) => {

        saltPromise
            .then(salt => {

                crypto.pbkdf2(password, salt, config.iterations, config.hashBytes, 'sha512', (err, derivedKey) => {
                    if (err) {
                        reject(err);
                    }

                    resolve({
                        salt: salt,
                        digest: derivedKey.toString('hex')
                    })
                })

            })
            .catch(err => reject(err));

    })

};

exports.verify_password = (checkPassword, salt, password) => {

    return new Promise((resolve, reject) => {

        crypto.pbkdf2(checkPassword, salt, config.iterations, config.hashBytes, 'sha512', (err, verify) => {
            if (err) {
                reject(err);
            }
            
            if (verify.toString('hex') === password) {
                resolve(true);
            } else {
                resolve(false);
            }

        })

    })

};


/*
exports.sha = (message, digestSize = 256) => {

    return new Promise((resolve, reject) => {

        crypto.subtle.digest({
            name: 'SHA-' + digestSize
        }, str2ab(message))
            .then(hash => resolve(ab2str(hash)))
            .catch(err => reject(err));
    })

};

exports.pbkdf2 = (password, iterations=1e6) => {

    let pwUtf8 = utf8.encode(password); // encode pw as UTF-8
    let pwKeyPromise = crypto.subtle.importKey('raw', pwUtf8, 'PBKDF2', false, ['deriveBits']); // create pw key
    let saltUint8Promise = crypto.getRandomValues(new Uint8Array(16)); // get random salt

    return Promise.all([pwKeyPromise, saltUint8Promise])
        .then(results => {
            let pwKey = results[0];
            let saltUint8 = results[1];

            let params = { name: 'PBKDF2', hash: 'SHA-256', salt: saltUint8, iterations: iterations }; // pbkdf2 params

            crypto.subtle.deriveBits(params, pwKey, 256) // derive key
                .then(keyBuffer => {
                    let keyArray = Array.from(new Uint8Array(keyBuffer)); // key as byte array
                    let saltArray = Array.from(new Uint8Array(saltUint8)); // salt as byte array

                    let iterHex = ('000000'+iterations.toString(16)).slice(-6); // iter’n count as hex
                    let iterArray = iterHex.match(/.{2}/g).map(byte => parseInt(byte, 16)); // iter’ns as byte array

                    const compositeArray = [].concat(saltArray, iterArray, keyArray); // combined array
                    const compositeStr = compositeArray.map(byte => String.fromCharCode(byte)).join(''); // combined as string
                    const compositeBase64 = btoa('v01'+compositeStr); // encode as base64

                    return {
                        compositeBase64: compositeBase64,
                        pwKey: pwKey
                    };
                })
        });

};


ab2str = (buf) => {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
};

str2ab = (str) => {
    let buf = new ArrayBuffer(str.length); // 2 bytes for each char
    let bufView = new Uint8Array(buf);
    for (let i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};*/
