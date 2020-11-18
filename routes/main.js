const express = require('express');
const router = express.Router();
const { mainController } = require('../controller');
const {verifyToken} = require('./middleware')



router.post('/addCard',verifyToken,mainController.addCard.post);

router.post('/addTask',verifyToken,mainController.addTask.post)

router.post('/deleteCard',verifyToken,mainController.deleteCard.post)

router.post('/deleteTask',verifyToken,mainController.deleteTask.post)

router.post('/getAllCards',verifyToken,mainController.getAllCards.post)

router.post('/logout',verifyToken,mainController.logout.post)

router.post('/updateNoteText',verifyToken,mainController.updateNoteText.post)

router.post('/updateTask',verifyToken,mainController.updateTask.post)

router.post('/updateTitle',verifyToken, mainController.updateTitle.post)

module.exports = router