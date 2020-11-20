const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const cookie = require('cookie')
//라우터에 따른 컨트롤러 처리 연결
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const myPageRouter = require('./routes/mypage');


const app = express();

app.set('port', 3005);


app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//서버에 빌드한 클라이언트 파일 연결
app.use(express.static(path.join(__dirname,'build')));



app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// url에 따른 라우트 설정
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/main', mainRouter);
app.use('/mypage', myPageRouter);


app.get('/', (req, res, next) => {
    res.send('여기는 루트 페이지입니다.');
});

//에러 처리 미들웨어

app.use((err,req,res,next)=> {
  console.error(err)
  res.status(404).send('에러가 발생했습니다')
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });