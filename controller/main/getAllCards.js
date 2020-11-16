const { card,user,todolist } = require('../../models');
const moment = require('moment');



module.exports={
    post: async (req, res) => {
        // const {id} = req.user;        
        
        let data = await card.findAll({
            where:{
                date: moment().format("DD/MM/YYYY")
            }
        })
        data = data.map(el => el.get({ plain: true }))
        console.log(data)


    }
}