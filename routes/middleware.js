const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.verifyToken = (req, res, next) => {
    // token (실제토큰정보)가 header의 authorization에 담겨서 와야 한다. 그걸 분해한다.
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    // 토큰이 없을 경우 오류 메세지 전송
    if(token === null){
        res.sendStatus(401).send('유효하지 않은 토큰입니다.')
    }
    //토큰이 있을 경우 verify 과정을 진행한다. 
    jwt.verify(token, process.env.TOKEN_SECRET,(err,user)=>{
        if(err){
            res.status(403).send('접근 권한이 없습니다')
        }        
        req.user = user
        next()
    })
    
  };