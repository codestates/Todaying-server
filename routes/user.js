const express = require('express');
const router = express.Router();
const { usersController } = require('../controller');



//post sign in 일반 로그인
router.post('/signin',usersController.signin.post);

//post sign up 일반 회원가입 

router.post('/signup',usersController.signup.post);

module.exports= router;