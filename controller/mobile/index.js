"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var captcha = require(app.config.root + '/helper/captcha');

//默认页面引用
var defaultCtrl = require('./index.controller');

/* GET home page. */
router.get('/', defaultCtrl.home)
      .get('/captcha', captcha.getCaptcha);


module.exports = router;