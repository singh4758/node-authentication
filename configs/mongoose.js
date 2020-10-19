const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Authentication');
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connection'));

db.once('open',function(){
    console.log('Successfully connected with Mongo Database');
});

module.exports = db;