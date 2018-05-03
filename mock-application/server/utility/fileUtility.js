const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const STORE_FILE_PATH = path.join(__dirname, '..', '..', 'storage/', config.storageFile);

exports.save = (content, useAppend = true) => {

    let flag = 'w';
    if (useAppend) {
        flag = 'a';
    }

    let data = JSON.stringify(content)

    return new Promise((resolve, reject) => {

        fs.writeFile(STORE_FILE_PATH, data, {flag: flag}, (err) => {
            if (err) {
                reject(err);
            }
            resolve(data);
            console.log('File saved with success');
        })

    })
};

exports.read = () => {

    return new Promise((resolve, reject) => {

        fs.readFile(STORE_FILE_PATH, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        })

    })
};