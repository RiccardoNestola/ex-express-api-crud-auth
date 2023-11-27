
module.exports = function (err, req, res, next) {
    console.log()
    return res.status(404).json({ message: err.message });

};