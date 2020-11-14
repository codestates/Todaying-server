const { user } = require('../../models');
const axios = require('axios')
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = process.env.GOOGLE_ID;
      const clientSecret = process.env.GOOGLE_SECRET;      
          

      axios({
        method:'post',
        url: `https://oauth2.googleapis.com/token?code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=https://319c325eb21d.ngrok.io/auth/google`,        
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        withCredentials: true    
      })
      .then(data => {        
        
        const idToken= data.data.id_token;        
        let result = jwt_decode(idToken);             
        return result         
      })      
      .then(data =>{       
        return user
        .findOrCreate({
          where: {
            email: data.email,
            type: 'google'                   
          },
          defaults: {                
            nickname: data.name,            
            password:''   
          }
        })
      }) 
      .then(data => {        
        req.session.userId = data[0].dataValues.id          
        // res.send({
        //   email:data[0].dataValues.email,
        //   nickname:data[0].dataValues.nickname
        // })
        
        res.redirect(`https://bbc7cc2e1237.ngrok.io/main?email=${data[0].dataValues.email}&nickname=${data[0].dataValues.nickname}`)
      })  
      .catch(err => {console.log(err.message)})      
    } 
}
