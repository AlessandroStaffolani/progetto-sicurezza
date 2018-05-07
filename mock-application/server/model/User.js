
const fileUtility = require('../utils/fileUtils');

exports.find = (queryObj) => {

    return new Promise((resolve, reject) => {

        fileUtility.read(queryObj.username)
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err));

    });

};

exports.save = (userData) => {

    return new Promise((resolve, reject) => {

        fileUtility.save(userData.username, userData, false)
            .then(data => {
                resolve(userData.username);
            })
            .catch(err => reject(err));

    });

};