const { user } = require('../../models');

module.exports = {
  post: (req, res) => {   
    const { email, password } = req.body;    
    user
      .findOne({
        where: {
          email: email,
          password: password,
          type : 'normal'
        }
      })
      .then(result => {
        if (result === null) {         
          res.status(404).send('회원정보 혹은 비밀번호가 일치하지 않습니다.');
        } else {
          req.session.userId = result.id;

          res.status(200).json("성공");
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
