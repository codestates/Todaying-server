const { user } = require('../../models');
const axios = require('axios')
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  get: (req, res) => {
    const requestToken = req.query.code
    const clientID = process.env.GOOGLE_ID;
    const clientSecret = process.env.GOOGLE_SECRET;


    axios({
        method: 'post',
        url: `https://oauth2.googleapis.com/token?code=${requestToken}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=https://todaying.cf/auth/google`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      })
      .then(data => {
        const idToken = data.data.id_token;
        let result = jwt_decode(idToken);
        return result
      })
      .then(data => {
        return user
          .findOrCreate({
            where: {
              email: data.email,
              type: 'google'
            },
            defaults: {
              nickname: data.name,
              password: ''
            }
          })
      })
      .then(data => {
        //토큰에 필요한 내용을 담아서 전송한다.   
        console.log(data)
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
        res.redirect(`https://todaying.cf/main`)
      })
      .catch(err => {
        console.error(err)
      })
  }
}