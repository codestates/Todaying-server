
const { card,user,todolist } = require('../../models');

module.exports={
    post: (req, res) => {
        const { id, email } = req.user;
        const { cardId } = req.body;
          todolist.create(
            {
              cardId : cardId,
              task: '할일을 적어주세요',
              isDone: false
            }).then((data)=>{
            
            res.status(200).send({taskId: data.id});
            
            })
      }
}