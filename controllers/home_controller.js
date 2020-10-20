
//this module help usto render sign page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in',{
        title : 'Sign In'
    });
}

//this module help us to render sign up pagw
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up',{
        title : 'Sign Up'
    });
}