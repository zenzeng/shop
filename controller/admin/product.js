"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');

//默认页面引用
var defaultCtrl = require('./product.controller');

//allow custom header and CORS
router.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", app.config.originHost);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By",' 3.2.1')

    if (req.method == 'OPTIONS') {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
});

router.post('/add', defaultCtrl.ajaxProductAdd)
      .post('/list', defaultCtrl.ajaxProductList)
      .post('/delete', defaultCtrl.ajaxProductDelete);

module.exports = router;