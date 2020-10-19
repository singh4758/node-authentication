const User = require('../models/users');

module.exports.profile = function(req,res){
    return res.render('profile');
}

module.exports.createSession = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
   }
   return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}


module.exports.create = function(req,res){
    if(req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('Error in Finding User`$(err)`');
            res.redirect('back');
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in Sign Up `$(user)` ');
                    return res.redirect('back');
                }
                return res.redirect('/'); 
            });
        }
        else{
            console.log('User are already exist');
            return res.redirect('/');
        }
    });
}