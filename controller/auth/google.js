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
      const redirect_uri = process.env.REGOOGLE_URL;
      let token = [];      

      axios({
        method:'post',
        url: `https://oauth2.googleapis.com/token?code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&grant_type=authorization_code&redirect_uri=${redirect_uri}`,        
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    
      })
      .then(data => {
        token.push(data.data.access_token) 
        const idToken= data.data.id_token;
        console.log(idToken)
        let result = jwt_decode(idToken);    
        console.log(result)   
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
            token: token[0],
            nickname: data.name,
            uniqueId: data.sub,
            password:''   
          }
        })
      }) 
      .then(data => {
        req.session.userId = data[0].dataValues.id               
        res.redirect('ec2-13-125-255-14.ap-northeast-2.compute.amazonaws.com/main')
      })  
      .catch(err => {console.log(err.message)})      
    } 
}


