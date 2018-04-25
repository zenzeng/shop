"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');

//默认页面引用
var defaultCtrl = require('./user.controller');

//allow custom header and CORS
router.all('*',function (req, res, next) {

    //这个就是express中解决跨域访问时候的办法
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

/* GET home page. */
router.post('/useradd', defaultCtrl.ajaxUserAdd)
      .post('/list', defaultCtrl.ajaxUserList)
      .post('/delete', defaultCtrl.ajaxUserDelete)
      .post('/edit', defaultCtrl.ajaxUserEdit)
      .post('/info', defaultCtrl.ajaxUserInfo);

module.exports = router;