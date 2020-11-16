const { card,user,todolist } = require('../../models');

module.exports={
    post: async (req, res) => {
        const {cardId,type,title} = req.body

        const data = await card.find({
            where:{
                id: cardId    
            }
        })
        if(data === undefined){
            //오류 메세지 
            res.status(404).send('찾으시는 노트가 없습니다')
        }
        else{
            const result = await card.update({
                title: title
            },{ where: { id: cardId } })
            res.status(200).send('성공적으로 수정했습니다')
        }
        
    }
}