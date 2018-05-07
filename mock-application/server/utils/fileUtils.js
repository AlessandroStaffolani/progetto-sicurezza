const fs = require('fs');
const path = require('path');

const STORE_PATH = path.join(__dirname, '..', '..', 'storage/');

exports.save = (fileName, content, useAppend = true) => {

    const filePath = path.join(STORE_PATH, (fileName + '.json'));

    let flag = 'w';
    if (useAppend) {
        flag = 'a';
    }

    let data = JSON.stringify(content);


    return new Promise((resolve, reject) => {

        fs.writeFile(filePath, data, {flag: flag}, (err) => {
            if (err) {
                reject(err);
            }
            resolve(data);
            console.log('File saved with success');
        })

    })
};

exports.read = (fileName) => {

    const filePath = path.join(STORE_PATH, (fileName + '.json'));

    return new Promise((resolve, reject) => {

        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })

    })
};