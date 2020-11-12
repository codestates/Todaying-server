const express = require('express');
const router = express.Router();
const { authController } = require('../controller');



//post sign in 깃허브 로그인
router.get('/git',authController.git.get);

router.get('/google',authController.google.get);



module.exports= router;