const { user } = require('../../models');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = process.env.GITHUB_ID;
      const clientSecret = process.env.GITHUB_SECRET;
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
    console.log(result)
    return user.findOrCreate({
      where: {
        email: result[0],
        type: 'github',     
        uniqueId: result[2]      
      },
      defaults: {   
        nickname: result[1],             
        uniqueId: result[2] ,
        token: result[3], 
        password:''       
      }
    })      
  }) 
  .then(data => {       
    req.session.userId = data[0].dataValues.id             
    res.redirect('13.125.255.14:3000/main')       
  }) 
  .catch(err => {
    console.log (err)
  })

}

}
