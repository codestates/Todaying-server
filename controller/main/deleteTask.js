const { card,user,todolist } = require('../../models');


module.exports = {
  post: async (req, res) => {
    const {
      taskId
    } = req.body
    try {
      if (!taskId) {
        res.status(404).send('요청하신 정보를 찾을 수 없습니다.')
      }
      const data = await todolist.destroy({
        where: {
          id: taskId
        }
      })

      res.status(200).send('success')
    } catch (error) {
      console.error(error)
    }

  }
}