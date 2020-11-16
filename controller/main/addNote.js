const { card,user,todolist } = require('../../models');


module.exports={
    post: async (req, res) => {
        
        const {title} = req.body
        const{id} =req.user
        console.log(id)
        console.log(title)
   try{    const data = await card.create({
            type:'note',
            title: title,
            text:'',
            userId: id
        })        
       
       res.send({
           id: data.dataValues.id,
           title: data.dataValues.title,
           text: data.dataValues.text
       })
    }
    catch(error){
        console.log(error)
    }
    }
}
   

