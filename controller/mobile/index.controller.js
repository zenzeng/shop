var express = require('express');
var app = express();

var captchapng = require('captchapng');

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var UserModel = require(app.config.root + '/models/user');

//图片验证码
exports.captcha = function(req, res, next) {
    var code = parseInt(Math.random() * 9000 + 1000);
    req.session.checkcode = code;
    var p = new captchapng(100, 30, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

/* GET home page. */
exports.home = function(req, res) {

    /**
    //-----添加数据开始------
    var userEntity = new UserModel({
        username : 'maomao11112222',
        age : 19
    });

    userEntity.save(function (err, res) {
        if(err) console.log(err);
        else console.log(res);
    });
    //-----添加数据结束------

    //-----更新开始------
    var whereStr = {"username":"maomao"};
    var updateStr = {"age":40};

    UserModel.update(whereStr, updateStr, function (err, result) {
        console.log('--->>>>>>>>>>>>>------');
        console.log(result);
        console.log('---<<<<<<<<<<<<<------');
    });
    //-----更新结束------
    //-----查找开始------
    UserModel.find(function (err, res) {
        console.log(res);
    });
    //-----查找结束------
    */

    res.render('mobile/home', {pageTitle : '首页',  title : app.config.siteName});
}

