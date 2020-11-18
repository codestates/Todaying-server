const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const myPageRouter = require('./routes/mypage');

const app = express();

app.set('port', 3005);


app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name:'sessiontest',
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  },
}));


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

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