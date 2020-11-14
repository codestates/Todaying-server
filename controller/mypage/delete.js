const { user } = require('../../models');
const crypto = require('crypto');
module.exports = {
    post: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).send("이메일 혹은 비밀번호가 누락되었습니다.");
          }

          var shasum = crypto.createHmac('sha512', 'tommorow');
   

        shasum.update(password);
        let hashcurrentPassword = shasum.digest('hex');
        

        user.destroy({where: {email : email, password : hashcurrentPassword}
        }).then(result => {
          console.log(result);
        if(result === 0){
          res.status(403).send("failed");
        }
        else if(result === 1){
          res.status(200).json("success")
        }
        })
    }
}