
const { card,user,todolist } = require('../../models');
const users = require('../users');
module.exports={
    post: (req, res) => {
        const { id, email } = req.user;
        const { cardId } = req.body;
          todolist.create(
            {
              cardId : cardId,
              task: '할일을 적어주세요',
              isDone: true
            }).then((data)=>{
            console.log(data);
            res.status(200).send({taskId: data.id});
            res.body
            })
      }
}