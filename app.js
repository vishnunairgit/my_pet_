var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cannectPetDB=require('./config/Db');
const cors = require('cors')
var app = express();




const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error
}
console.log(process.env.JWT_PASSWORD,"-----jwt password-----");

app.use(cors({ 
  // origin:['http://localhost:3000','https://bookmycourt-app-4yrm.onrender.com']
 }))
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/authRouter');

cannectPetDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  to remove cors issues 
  // 1 Using Default Options:
    // app.use(cors());
  // 2- Specifying Options in app.use(cors()):

      // const corsOptions ={
      //   origin:'http://localhost:3000', 
      //   credentials:true,            //access-control-allow-credentials:true
      //   optionSuccessStatus:200
      // }
      // app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
