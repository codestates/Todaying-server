const express = require('express');
const router = express.Router();
const { mainController } = require('../controller');
const {verifyToken} = require('./middleware')

router.post('/addNote',verifyToken,mainController.addNote.post);

router.post('/addTodo',verifyToken,mainController.addTodo.post)

router.post('/addTodoTitle',verifyToken,mainController.addNote.post)

router.post('/addNote',verifyToken,mainController.addNote.post)

router.post('/addNote',verifyToken,mainController.addNote.post)

router.post('/addNote',verifyToken,mainController.addNote.post)

router.get('/',)



