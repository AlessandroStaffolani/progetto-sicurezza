

exports.index = (req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({title: 'Hello World'}));
};