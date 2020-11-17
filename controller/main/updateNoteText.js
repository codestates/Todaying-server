const { card,user,todolist } = require('../../models');


module.exports={
    post: async (req, res) => {
        const {cardId,text} = req.body

        if(!cardId || !text){
            res.status(422).send("정보가 부족합니다")
        }         
        else{
            const result = await card.update({
                text: text
            },{ where: { id: cardId } })

            if(result === null){
                res.status(500).send('수정에 실패했습니다.')
            }
            else {res.status(200).send('성공적으로 수정했습니다')}
        
        }
        
    }
}