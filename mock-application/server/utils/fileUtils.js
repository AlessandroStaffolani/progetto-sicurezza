const fs = require('fs');
const path = require('path');
const config = require('../config/config');

const STORE_PATH = path.join(__dirname, '..', '..', 'storage/');

exports.save = (fileName, content, useAppend = true) => {

    let flag = 'w';
    if (useAppend) {
        flag = 'a';
    }

    let data = JSON.stringify(content);

    return new Promise((resolve, reject) => {

        fs.writeFile(path.join(STORE_PATH, fileName), data, {flag: flag}, (err) => {
            if (err) {
                reject(err);
            }
            resolve(data);
            console.log('File saved with success');
        })

    })
};

exports.read = (fileName) => {

    return new Promise((resolve, reject) => {

        fs.readFile(path.join(STORE_PATH, fileName), (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data));
        })

    })
};