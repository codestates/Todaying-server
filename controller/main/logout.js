const { card,user,todolist } = require('../../models');



module.exports = {
    post: (req, res) => {
      try {      
        res.clearCookie('token')  
        res.redirect('https://todaying.cf/')
      } catch (error) {
        console.error(error)
      }
  
    }
  }