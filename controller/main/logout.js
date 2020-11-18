const { card,user,todolist } = require('../../models');



module.exports = {
    post: (req, res) => {
      try {      
        res.clearCookie('token')  
        res.send('ok')
      } catch (error) {
        console.error(error)
      }
  
    }
  }