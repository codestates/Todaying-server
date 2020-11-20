const { user } = require('../../models');
const axios = require('axios')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  get: (req, res) => {
    const requestToken = req.query.code
    const clientID = process.env.GITHUB_ID;
    const clientSecret = process.env.GITHUB_SECRET;

    axios({
        method: 'get',
        url: `https://www.facebook.com/v9.0/dialog/oauth?client_id=802873173614540&redirect_uri=https://todaying.cf/auth/facebook&state=test`,
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
      .then(data => {
        email = data.data[0].email
        return axios({
          method: 'get',
          url: `https://api.github.com/user`,
          headers: {
            Authorization: `token ${accessToken}`,
          }
        })
      })
      .then(data => {

        return user.findOrCreate({
          where: {
            email: email,
            type: 'github',
          },
          defaults: {
            nickname: data.data.login,
            password: 'git'
          }
        })
      })
      .then(data => {


        const result = {
          id: data[0].dataValues.id,
          email: data[0].dataValues.email,
          nickname: data[0].dataValues.nickname
        }

        const token = jwt.sign(result, process.env.TOKEN_SECRET, {
          expiresIn: '24h'
        })
        res.cookie('token', token,{
          httpOnly: true,
          secure: true,
          sameSite: 'None'
        })
        
        res.redirect(`https://todaying.cf?token=${token}`)
      })
      .catch(err => {
        console.error(err)
      })

  }

}
