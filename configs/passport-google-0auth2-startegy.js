const passport = require('passport');
const googleStategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/users');
const User = require('../models/users');
passport.use(new googleStategy({
    clientID : '1009636726970-t52e3en46fhpktukhv9iilbkraldrcdk.apps.googleusercontent.com',
    clientSecret : 'mp0cFUidYHHH1G6ZFFZ34SX7',
    callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email : profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google startegy passport ',err);
                return;
            }

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user google startegy-passport',err);
                        return;
                    }
                    return done(null,user);
                }
                );
            }
        });
    }
));
