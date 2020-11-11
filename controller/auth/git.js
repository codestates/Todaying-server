const { user } = require('../../models');
const axios = require('axios')

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = 'e233e597ad3440084505';
      const clientSecret = '3acec097c0e57e3e5a4829e7626a9f1164120398';
       accessToken = '';

  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    accessToken = response.data.access_token;
    console.log(response.data)
    axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: `token ${accessToken}`,
      }
    }).then((data) => {
        const username = data.data.login;
        console.log(username);
        axios({
            method: 'get',
            url: `https://api.github.com/user/${username}`,
            headers: {
              Authorization: `token ${accessToken}`,
            }
          }).then((dat)=>{
            console.log(dat);
            res.redirect('https://fb5a58ff3ba5.ngrok.io');
        })
        
      })
    
  })

}

}
//res.redirect('https://fb5a58ff3ba5.ngrok.io');