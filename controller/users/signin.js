const { user } = require('../../models');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = {
  post: (req, res) => {   
    //요청 메세지에 포함된 메세지를 뽑아낸다
    const { email, password } = req.body;    
    // 데이터 베이스에 대조해서 일치하는 정보가 있는지 확인한다
    user
      .findOne({
        where: {
          email: email,
          password: password,
          type : 'normal'
        }
      })
      .then(data => {   
          
        //일치하는 정보가 없으면 오류 메세지를 전송한다     
        if (data === null) {              
          res.status(404).send('회원정보 혹은 비밀번호가 일치하지 않습니다.');          
        } else {       
        //일치하는 정보가 있다면 JWT토큰을 만들어서 전송한다.
         
          const result = {
            id:data.id,
            email:data.email,
            nickname: data.nickname
          }
          return result   
          
        }
      })
      .then(result => {
        const token = jwt.sign(result, process.env.TOKEN_SECRET,{expiresIn: '24h'})        
          res.status(200).json(token);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
