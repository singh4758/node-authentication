const express = require('express');
const userController = require('../controllers/user_controller');
const router = express.Router();
const passport = require('passport');


router.get('/profile',passport.checkAuthentication,userController.profile);
router.post('/create_session',passport.authenticate('local',{failureRedirect : '/'}),userController.createSession);
router.post('/create',userController.create);
router.get('/logout',userController.destroySession);
router.post('/updatePassword/:email',userController.updatePassword);
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/'}),userController.createSession);

module.exports = router;