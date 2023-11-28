// express 불러오기
const express = require('express');
const http = require('http');
// const mysql = require('mysql');

const app = express();
const port = 3000;

let indexRouter = require('./app/routes/indexRoute');
let loginRouter = require('./app/routes/loginRoute');
let encrpytRouter = require('./app/routes/encryptRoute');
let decryptRouter = require('./app/routes/decryptRoute');
let healthcheckRouter = require('./app/routes/healthcheckRoute');

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

// X-Forwarded-For Setting
app.set('trust proxy', true);

app.use(express.static(__dirname + '/app/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/encrypt', encrpytRouter);
app.use('/decrypt', decryptRouter);
app.use('/healthcheck', healthcheckRouter);

// http 서버 실행
// app.listen(port,'0.0.0.0',() => {
//     console.log(`Running Server by Port ${port}`);
// });

app.listen(port,'0.0.0.0');