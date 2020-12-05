
//configuraation to store password or authenticate user
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

const User = require('../models/users');

passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true
    },
    async function(req,email,password,done){

        const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret='Please fill your secret key' -gn&response=${req.body['g-recaptcha-response']}`,{
                method : "POST"
            })
            .then((res)=>res.json())


            if(!captchaVerified.success){
                console.log('Captcha is missing');
                req.flash('error','Please fill the captcha');
                return done();
            }
        


        User.findOne({email : email},function(err,user){
            if(err){
                console.log('Error in Finding User');
                return done(err);
            }
            
            if(!user || !bcrypt.compareSync(password,user.password) ){
                console.log('Invalids Username/Password');
                req.flash('error','Invalid UserId or Password');
                return done(err);
            }

            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User -- passport');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
