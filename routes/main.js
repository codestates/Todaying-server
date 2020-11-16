const express = require('express');
const router = express.Router();
const { mainController } = require('../controller');
const {verifyToken} = require('./middleware')



router.post('/addNote',verifyToken,mainController.addNote.post);

router.post('/addTodo',verifyToken,mainController.addTodo.post)

router.post('/editTodoTitle',verifyToken,mainController.editTodoTitle.post)

router.post('/editNoteTitle',verifyToken,mainController.editNoteTitle.post)

router.post('/editTodoContent',verifyToken,mainController.editTodoContent.post)

router.post('/editNoteTitle',verifyToken,mainController.editNoteTitle.post)

router.post('/editNoteContent',verifyToken,mainController.editNoteContent.post)

router.post('/logout',verifyToken,mainController.addNote.post)

router.get('/',verifyToken, (req,res)=>{
    console.log(req.user)
})



module.exports= router;