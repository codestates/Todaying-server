const { card,user,todolist } = require('../../models');


module.exports = {
  post: async (req, res) => {
    const {
      cardId,
      type
    } = req.body
    try {
      if (!cardId) {
        res.status(404).send('요청하신 정보를 찾을 수 없습니다.')
      }
      if (type === 'toDo') {
        const removetoDo = await todolist.destroy({
          where: {
            cardId: cardId
          }
        })
      }
      const data = await card.destroy({
        where: {
          id: cardId
        }
      })

      res.status(200).send('성공적으로 카드를 제거했습니다')
    } catch (error) {
      console.error(error)
    }

  }
}