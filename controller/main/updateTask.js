const { card,user,todolist } = require('../../models');

module.exports = {
    post: (req, res) => {
      const {
        id,
        email
      } = req.user;
      const {
        cardId,
        task,
        isDone,
        taskId
      } = req.body;
      // 제목과 유저아이디를 통해서 타켓 카드를 찾습니다.
      todolist.update({
        task: task,
        isDone: isDone
      }, {
        where: {
          id: taskId,
          cardId: cardId
        }
      }).then(result => {
        // 타켓카드의 아이디 번호를 통해서 타켓이 되는 투두리스트에 접근해서 각 태스크의 내용을 수정합니다.
        if (result === null) {
          res.status(500).send('수정에 실패했습니다.');
        } else {
          res.status(201).json("success");
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }