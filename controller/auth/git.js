const { user } = require('../../models');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = process.env.CLIENT_ID;
      const clientSecret = process.env.CLIENT_SECRET;
       let result = [];

  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  })
  .then((response) => {    
    accessToken = response.data.access_token;  
    refreshToken = response.data.refresh_token;    
    
    return axios({
      method: 'get',
      url: `https://api.github.com/user/emails`,
      headers: {
        Authorization: `token ${accessToken}`,
      }
    })
      
  })
  .then (data => {  
    result.push(data.data[0].email)      
    return axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: `token ${accessToken}`,
      }
    })    
  })
  .then(data =>{
    result.push(data.data.login)
    result.push(data.data.id)
    result.push(accessToken)    
    return user
    .findOrCreate({
      where: {
        email: result[0],
        nickname: result[1],
        uniqueId: result[2]        
      },
      defaults: {                
        type: 'github',
        token: result[3]
      }
    })       
  })
  .then(data => {    
    req.session.userId = data[0].dataValues.id
    req.session.token = accessToken        
    res.redirect('http://9a8c1c5766bc.ngrok.io')
  })
  .catch(err => {
    console.log (err)
  })

}

}
//res.redirect('https://fb5a58ff3ba5.ngrok.io');