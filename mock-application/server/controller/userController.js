
const fileUtility = require('../utility/fileUtility');

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.json({title: 'User API'});
};

exports.get_all = (req, res, next) => {
    fileUtility.read()
        .then(data => {
            res.header('Content-Type', 'application/json');
            res.json({
                code: 200,
                user: data
            });
        })
        .catch(err => next(err));
};

exports.create = (req, res, next) => {
    let userData = req.body.user;

    fileUtility.save(userData)
        .then(data => {
            res.header('Content-Type', 'application/json');
            res.json({
                code: 200,
                user: data
            });
        })
        .catch(err => next(err));
};