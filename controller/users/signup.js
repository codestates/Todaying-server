const { user } = require('../../models');

module.exports = {
  post: (req, res) => {
    
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname) {
        return res.status(422).send("부적절한 정보가 입력되었습니다");
      }

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
        if (!created) {
          return res.status(409).send('유저 정보가 이미 존재합니다');        
        }       
        const data = await users.get({ plain: true });               
        req.session.userId = data.id
        res.status(200).json({
          email: data.email,
          nickname: data.nickname
        });
      });

      
  }
};
