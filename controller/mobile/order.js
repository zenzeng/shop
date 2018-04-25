"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');

//默认页面引用
var defaultCtrl = require('./order.controller');

/* GET home page. */
router.get('/myorder', defaultCtrl.myorder)
      .get('/myorderinfo', defaultCtrl.myorderinfo)
      .get('/ordersubmit', defaultCtrl.ordersubmit) ;

module.exports = router;