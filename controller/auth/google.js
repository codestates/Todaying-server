const { user } = require('../../models');
const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

module.exports={
    get: (req, res) => {
      const requestToken = req.query.code
      const clientID = process.env.GOOGLE_ID;
      const clientSecret = process.env.GOOGLE_SECRET;
       let result = [];
       

  axios({
    method: 'post',
    url: `https://oauth2.googleapis.com/auth?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&grant_type=authorization_code&redirect_uri=https://d32cf7e1d0f9.ngrok.io/auth/google`,
    headers: {
      accept: 'application/json'
    }
  })
  .then((response) => {    
      console.log(response.data); 
    res.redirect('https://d32cf7e1d0f9.ngrok.io');
    
  })
  .catch((err)=>{
      console.log(err)
  })
 }
}


