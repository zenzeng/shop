//执行步骤第二步：引入app.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//引入通用config的express.js
require('./config/express')(app, express);

//引入通用的全局配置文件
app.config = require('./config/config');

//通用mongoose来连接mongodb
require('./config/database')(app.config.database.url, mongoose);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
