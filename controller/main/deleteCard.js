const { card,user,todolist } = require('../../models');


module.exports={
    post: async (req, res) => {
        const {cardId} = req.body 
        if(!cardId){
            res.status(404).send('요청하신 정보를 찾을 수 없습니다.')
        }
        const data = await card.destroy({
            where: {
              id: cardId
            }
          })
        
        res.status(200).send('성공적으로 카드를 제거했습니다')


    }
}