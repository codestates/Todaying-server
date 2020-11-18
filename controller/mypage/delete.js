const { card,user,todolist } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: async (req, res) => {
    const {
      id
    } = req.user
    const {
      email,
      password
    } = req.body;

    try {
      if (!email || !password) {
        return res.status(422).send("이메일 혹은 비밀번호가 누락되었습니다.");
      }

      //먼저 노트부터 지워준다

      const noteDelete = await card.destroy({
        where: {
          userId: id,
          type: "note"
        }
      })

      //투두 리스트의 태스크부터 지워준다. 그 후에 투두 리스트 지워준다
      let tododel = await card.findAll({
        where: {
          userId: id
        }
      })

      tododel = tododel.map(el => el.get({
        plain: true
      }))

      for (let i = 0; i < tododel.length; i++) {
        const delTodo = await todolist.destroy({
          where: {
            cardId: tododel[i].id
          }
        })
      }

      const delCard = await card.destroy({
        where: {
          userId: id
        }

      })

      var shasum = crypto.createHmac('sha512', 'tommorow');
      shasum.update(password);
      let hashcurrentPassword = shasum.digest('hex');



      const delUser = user.destroy({
        where: {
          id: id,
          email: email,
          password: hashcurrentPassword
        }
      })


      if (!delUser) {
        res.status(403).send("failed");
      } else {
        res.status(200).json("success")
      }
    } catch (error) {
      console.error(error)
    }
  }
}