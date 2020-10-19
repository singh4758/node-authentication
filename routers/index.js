const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');


router.use('/users',require('../routers/users'));
router.get('/',homeController.signIn);
router.get('/sign_up',homeController.signUp);

module.exports = router;