const { card,user,todolist } = require('../../models');

module.exports={
    post: async (req, res) => {
        const {id,title} = req.body

        const data = await card.find({
            where:{
                id: id    
            }
        })
        if(data === undefined){
            //오류 메세지 
            res.send('찾으시는 노트가 없습니다')
        }
        else{
            const result = await card.update({
                title: title
            },{ where: { id: id } })
        }
        
    }
}