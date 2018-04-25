"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');

//默认页面引用
var defaultCtrl = require('./product.controller');

/* GET home page. */
router.get('/list', defaultCtrl.list)
      .get('/cat', defaultCtrl.cat)
      .get('/cart', defaultCtrl.cart)
      .get('/info', defaultCtrl.info);

module.exports = router;







