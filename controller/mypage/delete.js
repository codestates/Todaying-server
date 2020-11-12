const { user } = require('../../models');

module.exports = {
    post: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).send("이메일 혹은 비밀번호가 누락되었습니다.");
          }
        user.destroy({where: {email : email}
        }).then(result => {
        if(result!== null){
          res.status(500).send('탈퇴는 어림도 없습니다.');
        }
          res.status(200).json("성공")
        }).catch(err => {
        console.error(err);
        });
    }
}