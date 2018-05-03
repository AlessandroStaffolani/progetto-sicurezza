

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.json({title: 'Authentication API'});
};