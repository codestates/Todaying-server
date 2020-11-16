const { user } = require('../../models');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = {
  post: (req, res) => {
    
    const { email, password, nickname } = req.body;
    //부적절한 정보를 입력한 경우 사전 차단
    if (!email || !password || !nickname) {
        return res.status(422).send("부적절한 정보가 입력되었습니다");
      }
    // 데이터베이스에 정보를 저장 
    user
      .findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: password,
          nickname: nickname,
          type: 'normal'
        }
      })
      .then(async ([users, created]) => {
        //유저 정보가 이미 데이터 베이스에 존재하는지 판단
        if (!created) {
          return res.status(409).send('유저 정보가 이미 존재합니다');        
        }
        //존재하지 않는 경우 새로 추가가 되고, 필요한 정보를 token에 담아서 token을 전송한다.     
        const data = await users.get({ plain: true }); 
        
        const result = {
          id:data.id,
          email:data.email,
          nickname: data.nickname
        }
        const token = await jwt.sign(result, process.env.TOKEN_SECRET)
                            
        
        
      //  res.redirect('https://698291f62e4e.ngrok.io/main')
        res.status(200).json(token)       
      });

      
  }
};

