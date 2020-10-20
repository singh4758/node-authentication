const User = require('../models/users');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const { checkAuthentication } = require('../configs/passport-local-strategy');

module.exports.profile = function(req,res){
    return res.render('profile');
}

module.exports.createSession = function(req,res){
    if(req.isAuthenticated()){
        console.log('successfull');
        req.flash('success','Successfully Login');
        return res.redirect('/users/profile');
    }
    req.flash('error','Invalid UserID/Password');
    return res.redirect('back');

}


module.exports.destroySession = function(req, res){
    req.flash('success','Logout Successfully');
    req.logout();
    return res.redirect('/');
}

module.exports.updatePassword = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log("password and confirm password are not same");
        req.flash('error','Password and Confirm Password are different');
        return res.redirect('back');
    }

    User.findOneAndUpdate({email : req.params.email},{password : bcrypt.hashSync(req.body.password,10)},function(err) {
        if(err){
            console.log("Error in Updating",err);
            return res.redirect('back');
        }
        console.log("Successfully Updated");
        req.flash('success','Update Successfully');
        return res.redirect('back');        
    });

}


module.exports.create = async function(req,res){
    const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6Lcx5NgZAAAAAGCyhG1d1QATzjEGpSz0NGEu7-gn&response=${req.body['g-recaptcha-response']}`,{
        method : "POST"
    })
    .then((res)=>res.json())


    if(!captchaVerified.success){
        console.log('Captcha is missing');
        req.flash('error','Please fill the captcha');
        return res.redirect('back');
    }

    if(req.body.password !== req.body.confirm_password){
        req.flash('error','Password and Confirm Password Mismatch');
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('Error in Finding User`$(err)`');
            res.redirect('back');
        }
        if(!user){
            req.body.password = bcrypt.hashSync(req.body.password,10);
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in Sign Up `$(user)` ');
                    return res.redirect('back');
                }
                req.flash('success','SignUp Successfully');
                return res.redirect('/'); 
            });
        }
        else{
            console.log('User Already exist');
            req.flash('error','User lready Exist');
            return res.redirect('/');
        }
    });
}