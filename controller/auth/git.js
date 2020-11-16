const { user } = require('../../models');
const axios = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = process.env.GITHUB_ID;
      const clientSecret = process.env.GITHUB_SECRET;     
      
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
    email = data.data[0].email       
    return axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: `token ${accessToken}`,
      }
    })    
  })
  .then(data =>{           
    
    return user.findOrCreate({
      where: {
        email: email,
        type: 'github',                 
      },
      defaults: {   
        nickname:data.data.login,        
        password:''       
      }
    })      
  }) 
  .then(data => {   
    
                 
    const result = {
      id: data[0].dataValues.id,
      email:data[0].dataValues.email,
      nickname:data[0].dataValues.nickname
    }
    
    const token = jwt.sign(result, process.env.TOKEN_SECRET)  
    res.redirect(`https://5708382dbb6d.ngrok.io/main?token=${token}`)
  }) 
  .catch(err => {
    console.log (err)
  })

}

}
