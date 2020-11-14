const { user } = require('../../models');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

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
        nickname: data.data.login,          
        token: accessToken, 
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
    // req.session.userId = data[0].dataValues.id          
    // res.send({
    //   email:data[0].dataValues.email,
    //   nickname:data[0].dataValues.nickname
    // })
    
    res.redirect(`https://bbc7cc2e1237.ngrok.io/main?email=${data[0].dataValues.email}&nickname=${data[0].dataValues.nickname}`)
  }) 
  .catch(err => {
    console.log (err)
  })

}

}
