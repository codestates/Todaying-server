const express = require('express');
const router = express.Router();
const { mypageController } = require('../controller');
const {verifyToken} = require('./middleware')


//post editnickname 닉네임 변경
router.post('/editnickname',verifyToken,mypageController.editnickname.post);

//post editpassword 비밀번호 변경

router.post('/editpassword',verifyToken,mypageController.editpassword.post);

//post delete 회원탈퇴 (회원정보 삭제)

router.post('/delete' ,verifyToken,mypageController.delete.post);

module.exports= router;