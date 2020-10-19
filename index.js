const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./configs/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const passportGoogle = require('./configs/passport-google-0auth2-startegy');

app.use(cookieParser());
app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name : 'authentication',
    secret : 'blah something',
    resave : false,
    cookie : {
        maxAge : (100 * 60 * 100)
    },
    store : new MongoStore({
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect mongo db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routers'));

app.listen(port,function(err){
    if(err){
        console.log('Error is creating server');
        return;
    }
    console.log('Successfully Server Created');
});