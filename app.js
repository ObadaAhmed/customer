const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cors = require('cors');
const customerRouter = require('./routes/customerRouter');
const Config = require('./util/Config');
const app = express();
// here we put out db file to entry point
require('./util/db');
// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// here we set the cross origin resource sharing 
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers' , customerRouter);



app.listen(Config.PORT , ()=> console.log(`customer service running on port ${Config.PORT}`));


module.exports = app;
