
// this function help us to set success and error to flash
module.exports.setFlash = function (req,res,next) {
    res.locals.flash = {
        'success' : req.flash("success"),
        'error' : req.flash("error")
    }

    next();
}