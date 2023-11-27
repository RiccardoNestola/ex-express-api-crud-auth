
module.exports = function ( err, req, res, next) {
    console.log()
    return res.status(500).json({message: err.message});

};