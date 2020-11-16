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

app.set('port', 3001);


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(session({
//   name:'sessiontest',
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'None'
//   },
// }));


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


app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
  });
  
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });