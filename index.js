const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

// const userRouter = require('./routes/user');
// const mainRouter = require('./routes/main');
// const myPageRouter = require('./routes/mypage');

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
  },
}));

// app.use('/user', userRouter);
// app.use('/main', mainRouter);
// app.use('/mypage', myPageRouter);



app.get('/', (req, res, next) => {
    res.send('hello world!');
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
    res.render('error');
  });
  
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });