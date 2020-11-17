const { card,user,todolist } = require('../../models');
const moment = require('moment');

module.exports={
    post: async (req, res) => {
        
        const {title,type} = req.body
        const {id} =req.user
        
    if(!id || !title){
        //입력 된 곳이 없을 경우 오류 메세지 
        res.status(422).send('부적절한 정보가 입력되었습니다.')
    }
   try{    
       
       const data = await card.create({
            type: type,
            title: title,
            text:'',
            userId: id,
            date: moment().format("MM/DD/YYYY")
        })
        
        let taskid = []
        if(data.dataValues.type === 'toDo'){
            for(let i = 1; i < 4; i++){
                const task = await todolist.create(
                    {
                      cardId : data.dataValues.id,
                      task: '',
                      isDone: false
                    })
                taskid.push(task.dataValues.id)
            }

        }
       
       res.status(200).send({
           cardId: data.dataValues.id,
           title: data.dataValues.title,
           type: data.dataValues.type,
           taskId: taskid
       })
    }
    catch(error){
        console.log(error)
    }
    }
}
   

