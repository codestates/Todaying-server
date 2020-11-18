const { user } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    const {
      email,
      newPassword,
      currentPassword
    } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.status(422).send("이메일 혹은 비밀번호가 누락되었습니다.");
    }
    var shasum1 = crypto.createHmac('sha512', 'tommorow');
    var shasum2 = crypto.createHmac('sha512', 'tommorow');

    shasum1.update(newPassword);
    let hashNewPassword = shasum1.digest('hex');


    shasum2.update(currentPassword);
    let hashCurrentPassword = shasum2.digest('hex');



    user.update({
      password: hashNewPassword
    }, {
      where: {
        email: email,
        password: hashCurrentPassword
      }
    }).then(result => {
      if (result[0] === 0) {
        res.status(403).send('failed');

      } else {
        res.status(201).json("success");
      }
    }).catch(err => {
      console.error(err);
    });
  }
}