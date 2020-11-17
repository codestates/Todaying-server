const { card,user,todolist } = require('../../models');
const moment = require('moment');



module.exports={
    post: async (req, res) => {
        // const {id} = req.user;        
        
        let data = await card.findAll({
            attributes: ['id','type','title','text',],
            where:{
                date: moment().format("DD/MM/YYYY"),                
            }
        })
        data = data.map(el => el.get({ plain: true }))
        if(!data){
            res.status(200).send({})
        }
       
        for(let i = 0; i < data.length; i++){
            if(data[i].type === 'toDo'){
                let todoData = await todolist.findAll({
                    attributes: ['id','task','isDone',],
                    where:{
                        cardId:data[i].id,                
                    }
                })
                todoData = todoData.map(el => el.get({ plain: true }))
                
                let temp ={};
                for(let i = 0; i < todoData.length; i++){
            
                  temp[todoData[i].id] = {
                        task: todoData[i].task,
                        isDone:todoData[i].isDone,   
                    }
                }
                
              data[i].content = temp            
              
            }
        }
                
        let cards = {}

        for(let i = 0; i < data.length; i++){
            if(data[i].type === 'note'){
                cards[data[i].id] = {
                    type: data[i].type,
                    title:data[i].title,
                    text: data[i].text,  
                }
            }
            
            if(data[i].type === 'toDo'){
                cards[data[i].id] = {
                    type: data[i].type,
                    title:data[i].title,
                    text: data[i].text,  
                    content: data[i].content
                }
            }
            

        }
      
        
        res.send({cards:cards})


    }
}